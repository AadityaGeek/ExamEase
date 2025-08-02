
import { QuestionForm } from "@/components/question-form";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function GeneratePage() {
  return (
    <div className="flex flex-col min-h-screen items-center p-4 md:p-8">
       <div className="w-full max-w-3xl flex justify-end mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      <main className="w-full max-w-3xl">
        <QuestionForm />
      </main>
    </div>
  );
}
