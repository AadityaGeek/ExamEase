
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-questions';
import { generateQuestions, type GenerateQuestionsInput } from '@/ai/flows/generate-questions';
import { questionFormSchema } from '@/lib/schemas';

// Temporary test function to verify the prompt
async function runPromptTest() {
  console.log("Starting AI prompt verification test...");

  const testInput: GenerateQuestionsInput = {
    class: "Class 10",
    subject: "Science",
    chapter: "Chemical Reactions and Equations",
    questionTypes: [
        { type: "MCQ", count: 1 },
        { type: "Short Answer", count: 1 }
    ],
  };

  try {
    const output = await generateQuestions(testInput);
    
    console.log("\n✅ AI Prompt Test Successful! ✅\n");
    console.log("=========================================");
    console.log("AI Generated Output:");
    console.log("=========================================");
    console.log(JSON.stringify(output, null, 2));
    console.log("=========================================\n");

  } catch (error) {
    console.error("\n❌ AI Prompt Test Failed! ❌\n");
    console.error("=========================================");
    console.error("An error occurred during the test:");
    console.error("=========================================");
    if (error instanceof Error) {
        console.error("Error Message:", error.message);
        if (error.stack) {
             console.error("Stack Trace:", error.stack);
        }
    } else {
        console.error("Unknown Error:", error);
    }
    console.error("=========================================\n");
    console.error("NOTE: If you see a '503 Service Unavailable' error, it means the AI service is temporarily overloaded. This is not an issue with the prompt itself. Please try running the test again in a few moments.");

  } finally {
     console.log("AI prompt verification test finished.");
     console.log("You can now stop the genkit:dev process if you are done testing.");
     // We will not exit the process to allow the dev server to continue running for the app.
     // process.exit(0); 
  }
}

// Automatically run the test when the dev server starts.
runPromptTest();
