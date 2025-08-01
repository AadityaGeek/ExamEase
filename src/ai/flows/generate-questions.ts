// src/ai/flows/generate-questions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating exam-style questions from study material.
 *
 * The flow takes class, subject, chapter, question types, and the number of questions as input.
 * It then uses a language model to generate questions tailored to the CBSE pattern.
 *
 * @param {GenerateQuestionsInput} input - The input for the question generation flow.
 * @returns {Promise<GenerateQuestionsOutput>} - A promise that resolves to the generated questions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the generateQuestions flow
const GenerateQuestionsInputSchema = z.object({
  class: z.string().describe('The class for which to generate questions (e.g., 10, 11, 12).'),
  subject: z.string().describe('The subject for which to generate questions (e.g., Science, Math).'),
  chapter: z.string().describe('The chapter from which to generate questions.'),
  questionTypes: z
    .array(
      z.enum(['MCQ', 'Fill in the Blanks', 'Short Answer', 'Long Answer', 'True/False'])
    )
    .describe('The types of questions to generate.'),
  numQuestions: z.number().describe('The number of questions to generate for each type.'),
  studyMaterial: z.string().describe('The extracted text content from the study material PDF.'),
});

export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

// Define the output schema for the generateQuestions flow
const GenerateQuestionsOutputSchema = z.object({
  questions: z.record(
    z.array(z.string())
  ).describe('Generated questions, grouped by question type.'),
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
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are an experienced educator specializing in creating exam-style questions for the CBSE curriculum. Generate questions based on the provided study material, tailored to the specified class, subject, and chapter.

Class: {{{class}}}
Subject: {{{subject}}}
Chapter: {{{chapter}}}
Study Material: {{{studyMaterial}}}

Generate {{{numQuestions}}} questions for each of the following question types:
{{#each questionTypes}}
- {{{this}}}
{{/each}}

Ensure the questions are exam-oriented, concept-based, and relevant to the study material. Structure the output as a JSON object where the keys are the question types and the values are arrays of the generated questions for each type.

Output format should be a JSON object of the form:
{
  "MCQ": ["MCQ 1", "MCQ 2", ...],
  "Fill in the Blanks": ["Fill in the Blank 1", "Fill in the Blank 2", ...],
  ...
}
`, 
});

// Define the Genkit flow for generating questions
const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateQuestionsPrompt(input);
    return output!;
  }
);
