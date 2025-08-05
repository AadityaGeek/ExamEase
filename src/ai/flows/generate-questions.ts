
// src/ai/flows/generate-questions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating exam-style questions with answers by searching for content online.
 *
 * The flow takes class, subject, chapter, and question types/counts as input.
 * It then uses a language model to find relevant information and generate questions and answers tailored to the CBSE pattern.
 *
 * @param {GenerateQuestionsInput} input - The input for the question generation flow.
 * @returns {Promise<GenerateQuestionsOutput>} - A promise that resolves to the generated questions and answers.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const QuestionRequestSchema = z.object({
  type: z.enum(['MCQ', 'Fill in the Blanks', 'Short Answer', 'Long Answer', 'True/False', 'Very Short Answer']),
  count: z.number(),
});

// Define the input schema for the generateQuestions flow
const GenerateQuestionsInputSchema = z.object({
  class: z.string().describe('The class for which to generate questions (e.g., 10, 11, 12).'),
  subject: z.string().describe('The subject for which to generate questions (e.g., Science, Math).'),
  chapter: z.string().describe('The chapter(s) for which to generate questions.'),
  questionTypes: z
    .array(QuestionRequestSchema)
    .describe('The types of questions to generate and the count for each type.'),
});

export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

// Define the schema for a single question with its answer and an optional explanation
const QuestionWithAnswerSchema = z.object({
  question: z.string(),
  answer: z.string(),
  explanation: z.string().optional(),
});
export type QuestionWithAnswer = z.infer<typeof QuestionWithAnswerSchema>;

// Define the output schema for the generateQuestions flow
const GenerateQuestionsOutputSchema = z.object({
  questions: z.record(
    z.array(QuestionWithAnswerSchema)
  ).describe('Generated questions and answers, grouped by question type. The keys of this record should be the question types from the input.'),
});

export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;


// Define the generateQuestions function
export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

// Define the prompt for generating questions
const generateQuestionsPrompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  prompt: process.env.GENERATE_QUESTIONS_PROMPT || '',
});

// Define the Genkit flow for generating questions
const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async input => {
    if (!process.env.GENERATE_QUESTIONS_PROMPT) {
        throw new Error("CRITICAL: The GENERATE_QUESTIONS_PROMPT environment variable is not set.");
    }

    const response = await generateQuestionsPrompt(input);
    const textResponse = response.text;

    try {
      // The AI might sometimes wrap the JSON in ```json ... ``` or add other text.
      // This regex looks for the first '{' and the last '}' to extract the JSON object.
      const jsonMatch = textResponse.match(/{[\s\S]*}/);
      
      if (!jsonMatch) {
        throw new Error("No valid JSON object found in the AI's response.");
      }

      const jsonString = jsonMatch[0];
      const parsedJson = JSON.parse(jsonString);
      
      // Validate the parsed JSON against our Zod schema
      const validationResult = GenerateQuestionsOutputSchema.safeParse(parsedJson);
      
      if (!validationResult.success) {
        console.error("AI output failed Zod validation:", validationResult.error);
        throw new Error("The AI returned data in an unexpected format. Please try again.");
      }
      
      return validationResult.data;
    } catch (error) {
      console.error("Failed to parse JSON response from AI:", error);
      console.error("Raw AI response was:", textResponse);
      throw new Error("There was an issue processing the AI's response. Please try again.");
    }
  }
);
