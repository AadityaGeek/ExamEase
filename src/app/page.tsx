import { QuizForm } from "@/components/quiz-form";
import { Bot } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-4">
          <Bot className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          QuizCraft AI
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          Your personal AI-powered question paper generator. Turn your study materials into exam-style questions in seconds.
        </p>
      </header>
      <main>
        <QuizForm />
      </main>
      <footer className="text-center mt-12 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} QuizCraft AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
