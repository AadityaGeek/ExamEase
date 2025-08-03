
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QuestionDisplay } from "@/components/question-display";
import type { GenerateQuestionsOutput } from "@/ai/flows/generate-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, PlusCircle } from "lucide-react";
import Link from "next/link";

type QuestionPaperData = GenerateQuestionsOutput & { title: string; subtitle: string };

export default function QuestionsPage() {
  const router = useRouter();
  const [questionPaperData, setQuestionPaperData] = React.useState<QuestionPaperData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("questionPaperData");
      if (storedData) {
        setQuestionPaperData(JSON.parse(storedData));
      } else {
        setError("No question paper data found. Please generate a new paper.");
      }
    } catch (e) {
      setError("Failed to load question paper data. Please try again.");
      console.error(e);
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push("/generate")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a New Paper
            </Button>
             <Button asChild variant="outline">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!questionPaperData) {
    // You can add a loader here if you want
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-4">
             <Button asChild variant="outline">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                </Link>
            </Button>
            <Button onClick={() => router.push('/generate')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Paper
            </Button>
        </div>
      <QuestionDisplay 
        questionsData={questionPaperData} 
        title={questionPaperData.title} 
        subtitle={questionPaperData.subtitle}
      />
    </div>
  );
}
