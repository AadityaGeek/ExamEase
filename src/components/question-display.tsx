"use client";

import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePdf } from "@/lib/pdf";
import type { GenerateQuestionsOutput } from "@/ai/flows/generate-questions";
import { Download, ListChecks, Baseline, PencilLine, FileText, Binary } from "lucide-react";

interface QuestionDisplayProps {
  questionsData: GenerateQuestionsOutput;
  title: string;
  subtitle: string;
}

const iconMap: Record<string, React.ElementType> = {
  MCQ: ListChecks,
  "Fill in the Blanks": Baseline,
  "Short Answer": PencilLine,
  "Long Answer": FileText,
  "True/False": Binary,
};

export function QuestionDisplay({ questionsData, title, subtitle }: QuestionDisplayProps) {
  const handleDownload = () => {
    generatePdf(questionsData, title, subtitle);
  };

  const questionTypesWithContent = Object.keys(questionsData.questions).filter(
    (type) => questionsData.questions[type] && questionsData.questions[type].length > 0
  );

  if (questionTypesWithContent.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">No Questions Generated</CardTitle>
          <CardDescription>
            The AI could not generate questions based on the provided material and selections. Please try again with different options.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </div>
            <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={questionTypesWithContent} className="w-full">
          {questionTypesWithContent.map((type) => {
            const Icon = iconMap[type] || PencilLine;
            return (
              <AccordionItem value={type} key={type}>
                <AccordionTrigger className="text-lg hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{type} ({questionsData.questions[type].length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-4 pl-4 text-base">
                    {questionsData.questions[type].map((question, index) => (
                      <li key={index} className="leading-relaxed">{question}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
