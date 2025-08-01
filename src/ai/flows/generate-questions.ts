
// src/ai/flows/generate-questions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating exam-style questions by searching for content online.
 *
 * The flow takes class, subject, chapter, and question types/counts as input.
 * It then uses a language model to find relevant information and generate questions tailored to the CBSE pattern.
 *
 * @param {GenerateQuestionsInput} input - The input for the question generation flow.
 * @returns {Promise<GenerateQuestionsOutput>} - A promise that resolves to the generated questions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionRequestSchema = z.object({
  type: z.enum(['MCQ', 'Fill in the Blanks', 'Short Answer', 'Long Answer', 'True/False']),
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

// Define the output schema for the generateQuestions flow
const GenerateQuestionsOutputSchema = z.object({
  questions: z.record(
    z.array(z.string())
  ).describe('Generated questions, grouped by question type. The keys of this record should be the question types from the input.'),
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
  prompt: `You are an expert educator who creates exam-style questions for the Indian CBSE curriculum.
Your task is to generate questions based on the provided class, subject, and chapter. You will use your own knowledge and search online for the most relevant and accurate information for the topics.

Class: {{{class}}}
Subject: {{{subject}}}
Chapter(s): {{{chapter}}}

Please generate questions for the following types and counts:
{{#each questionTypes}}
- Generate exactly {{this.count}} questions for the type: "{{this.type}}"
{{/each}}

Ensure the questions are strictly exam-oriented, concept-based, and directly relevant to the topics covered in the specified chapter(s) for the given class and subject under the CBSE board.

SPECIAL INSTRUCTIONS:
- For 'MCQ' (Multiple Choice Questions), the question should be on the first line, and each option (e.g., A, B, C, D) must be on a new line with indentation. Use newline characters and spaces to format it.
Example: "Which of the following is a noble gas?\\n\\t\\t  A. Oxygen\\n\\t\\t  B. Nitrogen\\n\\t\\t  C. Argon\\n\\t\\t  D. Carbon Dioxide"

VERY IMPORTANT: Your response MUST be a single, valid JSON object formatted as a string. Do not include any text or formatting before or after the JSON object.
The JSON object must have a single key called "questions". The value of "questions" should be an object where each key is a question type (e.g., "MCQ", "Short Answer") and the value is an array of strings, where each string is a generated question.

For each type, you MUST generate the exact number of questions specified. Do not generate more or fewer.
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

