
import { z } from "zod";

export const QUESTION_TYPES = [
    { id: 'mcq', name: 'MCQ' },
    { id: 'fill-in-the-blanks', name: 'Fill in the Blanks' },
    { id: 'short-answer', name: 'Short Answer' },
    { id: 'long-answer', name: 'Long Answer' },
    { id: 'true-false', name: 'True/False' },
] as const;


const questionTypeNames = QUESTION_TYPES.map(t => t.name);

export const QuestionTypeSchema = z.enum(questionTypeNames as [string, ...string[]]);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

const questionTypeCountSchema = z.object({
    id: z.string(),
    type: QuestionTypeSchema,
    count: z.coerce.number().min(1, "Must be at least 1."),
});

const chapterSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const questionFormSchema = z.object({
  classId: z.string({ required_error: "Please select a class." }).min(1, "Please select a class."),
  subjectId: z.string({ required_error: "Please select a subject." }).min(1, "Please select a subject."),
  chapters: z.array(chapterSchema).min(1, "Please select at least one chapter."),
  questionTypes: z.array(questionTypeCountSchema).min(1, "Please select at least one question type."),
});

export type QuestionFormSchema = z.infer<typeof questionFormSchema>;
