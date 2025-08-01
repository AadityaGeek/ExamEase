
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

    questions.forEach(({ question, answer }, index) => {
      const questionText = `${index + 1}. ${question}`;
      const splitQuestion = doc.splitTextToSize(questionText, maxWidth);
      
      const questionHeight = splitQuestion.length * 5;
      const answerHeight = includeAnswers ? (doc.splitTextToSize(`Ans: ${answer}`, maxWidth - 5).length * 5) + 2 : 0;
      
      if (yPos + questionHeight + answerHeight > 280) {
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
        yPos += (splitAnswer.length * 5) + 5;
        doc.setTextColor("#000000"); // Reset color
        doc.setFont("helvetica", "normal");
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
};
