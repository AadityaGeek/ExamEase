
import { QuestionForm } from "@/components/question-form";

export default function GeneratePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-3xl">
        <QuestionForm />
      </main>
    </div>
  );
}
