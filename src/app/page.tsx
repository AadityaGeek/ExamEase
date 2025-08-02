
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Bot, BookOpen, BrainCircuit, Cloud, Cpu, Rocket, ShieldCheck, Target, Zap } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI Integration",
      description: "Smart and relevant question generation powered by cutting-edge AI.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast & Easy",
      description: "Generate comprehensive question papers in just a few seconds.",
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "Custom Papers",
      description: "Tailor tests with specific topics, question types, and difficulty levels.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Cloud Powered",
      description: "Access your materials and generate questions from anywhere, anytime.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "Student-Friendly UI",
      description: "An intuitive, clean, and distraction-free interface for focused learning.",
    },
     {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Data-Driven Insights",
      description: "Identify knowledge gaps and track your preparation progress effectively.",
    },
  ];

  const aboutPoints = [
    { icon: <Target className="h-6 w-6 text-primary" />, text: "AI-driven question generation tailored to your course" },
    { icon: <BookOpen className="h-6 w-6 text-primary" />, text: "Support for multiple subjects and topics" },
    { icon: <BrainCircuit className="h-6 w-6 text-primary" />, text: "Adaptive and intelligent exam creation" },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: "Secure, fast, and cloud-based access" },
    { icon: <Rocket className="h-6 w-6 text-primary" />, text: "Helps you revise smarter, not harder" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white">
            <Image 
                src="https://placehold.co/1920x1080.png" 
                alt="Student interacting with a futuristic interface" 
                layout="fill"
                objectFit="cover"
                className="z-0"
                data-ai-hint="futuristic education interface"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
            <div className="relative z-20 container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Transform the Way You Prepare for Exams</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-white/90">AI-powered question generation tailored to your syllabus</p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link href="/generate" className={cn(buttonVariants({ size: "lg" }))}>
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link href="#" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent text-white border-white/80 hover:bg-white/10")}>
                        Watch Demo
                    </Link>
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">What is ExamEase?</h2>
                <p className="text-lg text-muted-foreground">
                  ExamEase is an intelligent platform designed to revolutionize exam preparation for students and educators. We leverage the power of AI to create relevant, high-quality questions from your study materials, saving you time and helping you focus on what truly matters: learning.
                </p>
                <ul className="space-y-3 pt-4">
                  {aboutPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {point.icon}
                      <span className="flex-1">{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Illustration of AI and education"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="abstract education technology"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Our Platform?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We provide powerful tools to streamline your study and assessment process.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-left bg-card hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Get Your Questions in 3 Simple Steps</h2>
            <div className="relative mt-12 max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-border hidden md:block"></div>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                {/* Step 1 */}
                <div className="relative p-6 bg-card rounded-lg shadow-md border">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold hidden md:flex">1</div>
                  <h3 className="text-xl font-semibold">Select Material</h3>
                  <p className="mt-2 text-muted-foreground">Choose your class, subject, and the chapters you want to focus on.</p>
                </div>
                 {/* Step 2 */}
                <div className="relative p-6 bg-card rounded-lg shadow-md border mt-8 md:mt-0">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold hidden md:flex">2</div>
                  <h3 className="text-xl font-semibold">Customize Questions</h3>
                  <p className="mt-2 text-muted-foreground">Pick question types (MCQ, Short Answer, etc.) and specify the quantity for each.</p>
                </div>
                 {/* Step 3 */}
                <div className="relative p-6 bg-card rounded-lg shadow-md border mt-8 md:mt-0">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold hidden md:flex">3</div>
                  <h3 className="text-xl font-semibold">Generate & Download</h3>
                  <p className="mt-2 text-muted-foreground">Our AI generates your paper, ready for download as a PDF or for online practice.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to ace your next exam?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Start generating intelligent questions now.</p>
            <div className="mt-8">
              <Link href="/generate" className={cn(buttonVariants({ size: "lg" }))}>
                Try ExamEase Now <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    