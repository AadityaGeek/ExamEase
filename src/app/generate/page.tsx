
import { QuestionForm } from "@/components/question-form";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Rocket } from "lucide-react";
import Link from "next/link";

const features = [
  { text: "Select your class and subject." },
  { text: "Choose the chapters you want to focus on." },
  { text: "Pick the types and number of questions." },
  { text: "Generate your paper instantly!" },
];

export default function GeneratePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
       <div className="container mx-auto px-4 py-8">
        <main className="flex flex-col items-center justify-center space-y-12">
            <div className="flex flex-col items-center space-y-6 text-center max-w-2xl">
                 <Rocket className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight text-white">Unlock Your Potential</h1>
                <p className="text-lg text-muted-foreground">
                    Follow the simple steps below to create a customized question paper. Our AI will craft the perfect exam-oriented questions to help you master your syllabus.
                </p>
                <ul className="space-y-3 pt-4 text-left">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                            <span>{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full max-w-3xl">
                <QuestionForm />
            </div>
        </main>
       </div>
    </div>
  );
}
