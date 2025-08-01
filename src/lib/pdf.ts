"use client";

import { jsPDF } from "jspdf";
import type { GenerateQuestionsOutput } from "@/ai/flows/generate-questions";

export const generatePdf = (
    questionsData: GenerateQuestionsOutput, 
    title: string,
    subtitle: string
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

  Object.entries(questionsData.questions).forEach(([type, questions]) => {
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

    questions.forEach((question, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const questionText = `${index + 1}. ${question}`;
      const splitText = doc.splitTextToSize(questionText, maxWidth);
      doc.text(splitText, margin, yPos);
      yPos += (splitText.length * 5) + 5; // Adjust spacing based on lines
    });

    yPos += 5; // Extra space between question types
  });

  doc.save(`${title.replace(/\s+/g, '_')}_questions.pdf`);
};
