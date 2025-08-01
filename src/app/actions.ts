"use server";

import { generateQuestions, type GenerateQuestionsInput, type GenerateQuestionsOutput } from "@/ai/flows/generate-questions";
import { getChapterDetails, getClassAndSubjectDetails } from "@/lib/data";
import { quizFormSchema, type QuizFormSchema, type QuestionType } from "@/lib/schemas";

type ActionState = {
  success: boolean;
  data: (GenerateQuestionsOutput & { title: string; subtitle: string }) | null;
  error: string | null;
};

export async function createQuiz(
  formData: QuizFormSchema
): Promise<ActionState> {
  const validatedFields = quizFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      data: null,
      error: "Invalid form data. Please check your selections.",
    };
  }

  const { classId, subjectId, chapterIds, questionTypes: questionsToGenerate } = validatedFields.data;

  try {
    const classSubjectDetails = await getClassAndSubjectDetails(classId, subjectId);
    if (!classSubjectDetails) {
        throw new Error("Could not find class or subject details.");
    }
    const { className, subjectName } = classSubjectDetails;
    
    const chapters = await Promise.all(
        chapterIds.map(id => getChapterDetails(classId, subjectId, id))
    );

    const validChapters = chapters.filter(Boolean);
    if (validChapters.length === 0) {
        throw new Error("Could not find chapter details.");
    }

    const studyMaterial = validChapters.map(c => c!.studyMaterial).join("\n\n---\n\n");
    const chapterTitles = validChapters.map(c => c!.title).join(", ");

    const numQuestions = Math.max(...questionsToGenerate.map(q => q.count));
    const requestedQuestionTypes = questionsToGenerate.map(q => q.type);

    const aiInput: GenerateQuestionsInput = {
      class: className,
      subject: subjectName,
      chapter: chapterTitles,
      studyMaterial: studyMaterial,
      numQuestions: numQuestions,
      questionTypes: requestedQuestionTypes,
    };

    const aiOutput = await generateQuestions(aiInput);

    // Trim the questions to the requested count for each type
    const trimmedQuestions: Record<string, string[]> = {};
    for (const qType of questionsToGenerate) {
        if (aiOutput.questions[qType.type]) {
            trimmedQuestions[qType.type] = aiOutput.questions[qType.type].slice(0, qType.count);
        }
    }
    aiOutput.questions = trimmedQuestions;

    return {
      success: true,
      data: {
        ...aiOutput,
        title: `${subjectName} - ${className}`,
        subtitle: `Questions for: ${chapterTitles}`,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error generating quiz:", error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "An unknown error occurred while generating questions.",
    };
  }
}
