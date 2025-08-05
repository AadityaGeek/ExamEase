
"use client";

import { jsPDF } from "jspdf";
import type { GenerateQuestionsOutput } from "@/ai/flows/generate-questions";

export const generatePdf = (
    questionsData: GenerateQuestionsOutput, 
    title: string,
    subtitle: string,
    includeAnswers: boolean
) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(title, 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, 105, 30, { align: "center" });

  let yPos = 45;
  const margin = 15;
  const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const answerColor = "#334155"; // Using a readable dark gray/slate color
  const explanationColor = "#4b5563"; // A slightly lighter gray for explanations

  Object.entries(questionsData.questions).forEach(([type, questions]) => {
    if (questions.length === 0) return;
    
    if (yPos > 250) { // Add new page if content is too long
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(type, margin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    questions.forEach(({ question, answer, explanation }, index) => {
      const questionText = `${index + 1}. ${question}`;
      const splitQuestion = doc.splitTextToSize(questionText, maxWidth);
      const questionHeight = splitQuestion.length * 5;

      let answerHeight = 0;
      let explanationHeight = 0;
      
      if (includeAnswers) {
          const splitAnswer = doc.splitTextToSize(`Ans: ${answer}`, maxWidth - 5);
          answerHeight = (splitAnswer.length * 5) + 2;
          if (explanation) {
            const splitExplanation = doc.splitTextToSize(`Explanation: ${explanation}`, maxWidth - 5);
            explanationHeight = (splitExplanation.length * 5) + 2;
          }
      }

      if (yPos + questionHeight + answerHeight + explanationHeight > 280) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.text(splitQuestion, margin, yPos);
      yPos += questionHeight + 2;

      if (includeAnswers) {
        doc.setTextColor(answerColor);
        doc.setFont("helvetica", "italic");
        const answerText = `Ans: ${answer}`;
        const splitAnswer = doc.splitTextToSize(answerText, maxWidth - 5); // Indent answer slightly
        doc.text(splitAnswer, margin + 5, yPos);
        yPos += (splitAnswer.length * 5) + 2;
        doc.setTextColor("#000000"); // Reset color
        doc.setFont("helvetica", "normal");
        
        if (explanation) {
            doc.setTextColor(explanationColor);
            doc.setFont("helvetica", "italic");
            const explanationText = `Explanation: ${explanation}`;
            const splitExplanation = doc.splitTextToSize(explanationText, maxWidth-5);
            doc.text(splitExplanation, margin + 5, yPos);
            yPos += (splitExplanation.length * 5) + 2;
            doc.setTextColor("#000000"); // Reset color
            doc.setFont("helvetica", "normal");
        }
        yPos += 3;
      } else {
         yPos += 5;
      }
    });

    yPos += 5; // Extra space between question types
  });

  // New filename generation logic
  const parts = title.split(' - ');
  const subjectName = parts[0]?.replace(/\s+/g, '-') || "Subject";
  const className = parts[1]?.replace(/\s+/g, '-') || "Class";
  
  const nameSuffix = includeAnswers ? "With-Answers" : "Questions";
  
  const finalFilename = `${className}-${subjectName}-${nameSuffix}.pdf`;

  doc.save(finalFilename);
git };
