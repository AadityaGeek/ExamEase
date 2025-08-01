import { z } from "zod";

export const QUESTION_TYPES = ['MCQ', 'Fill in the Blanks', 'Short Answer', 'Long Answer', 'True/False'] as const;
export const QuestionTypeSchema = z.enum(QUESTION_TYPES);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

const questionTypeCountSchema = z.object({
    type: QuestionTypeSchema,
    count: z.coerce.number().min(1, "Must be at least 1.").max(10, "Cannot generate more than 10 questions."),
});

export const quizFormSchema = z.object({
  classId: z.string({ required_error: "Please select a class." }).min(1, "Please select a class."),
  subjectId: z.string({ required_error: "Please select a subject." }).min(1, "Please select a subject."),
  chapterIds: z.array(z.string()).min(1, "Please select at least one chapter."),
  questionTypes: z.array(questionTypeCountSchema).min(1, "Please select at least one question type."),
});

export type QuizFormSchema = z.infer<typeof quizFormSchema>;
