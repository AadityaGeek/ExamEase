
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QuestionDisplay } from "@/components/question-display";
import type { GenerateQuestionsOutput } from "@/ai/flows/generate-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home } from "lucide-react";

type QuizData = GenerateQuestionsOutput & { title: string; subtitle: string };

export default function QuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = React.useState<QuizData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("quizData");
      if (storedData) {
        setQuizData(JSON.parse(storedData));
      } else {
        setError("No quiz data found. Please generate a new quiz.");
      }
    } catch (e) {
      setError("Failed to load quiz data. Please try again.");
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
          <CardContent>
            <Button onClick={() => router.push("/")}>
                <Home className="mr-2 h-4 w-4" />
                Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quizData) {
    // You can add a loader here if you want
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-8 flex justify-end">
            <Button onClick={() => router.push('/')} variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Create New Quiz
            </Button>
        </div>
      <QuestionDisplay 
        questionsData={quizData} 
        title={quizData.title} 
        subtitle={quizData.subtitle}
      />
    </div>
  );
}
