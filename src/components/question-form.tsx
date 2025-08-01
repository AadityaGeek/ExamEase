
"use client";

import * as React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { createQuestionPaper } from "@/app/actions";
import { type Chapter, type Class, type Subject, getClasses, getSubjects, getChapters } from "@/lib/data";
import { QUESTION_TYPES, questionFormSchema, type QuestionFormSchema } from "@/lib/schemas";
import { Loader2 } from "lucide-react";

export function QuestionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const [classes, setClasses] = React.useState<Pick<Class, "id" | "name">[]>([]);
  const [subjects, setSubjects] = React.useState<Pick<Subject, "id" | "name">[]>([]);
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  
  const form = useForm<QuestionFormSchema>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      classId: "",
      subjectId: "",
      chapters: [],
      questionTypes: [],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questionTypes",
  });

  const watchedClassId = form.watch("classId");
  const watchedSubjectId = form.watch("subjectId");
  const watchedChapters = form.watch("chapters");
  const watchedQuestionTypes = form.watch("questionTypes");

  const isFormSubmittable =
    !!watchedClassId &&
    !!watchedSubjectId &&
    watchedChapters?.length > 0 &&
    watchedQuestionTypes?.length > 0 &&
    watchedQuestionTypes.every(q => q.count > 0);

  const fetchChapters = React.useCallback(async () => {
    if (watchedClassId && watchedSubjectId) {
      getChapters(watchedClassId, watchedSubjectId).then(setChapters);
    }
  }, [watchedClassId, watchedSubjectId]);

  React.useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  React.useEffect(() => {
    if (watchedClassId) {
      form.setValue("subjectId", "");
      form.setValue("chapters", []);
      setSubjects([]);
      setChapters([]);
      getSubjects(watchedClassId).then(setSubjects);
    }
  }, [watchedClassId, form]);

  React.useEffect(() => {
    if (watchedClassId && watchedSubjectId) {
      form.setValue("chapters", []);
      setChapters([]);
      fetchChapters();
    }
  }, [watchedClassId, watchedSubjectId, form, fetchChapters]);

  const onSubmit = (data: QuestionFormSchema) => {
    startTransition(async () => {
      const result = await createQuestionPaper(data);
      if (result.success && result.data) {
        sessionStorage.setItem("questionPaperData", JSON.stringify(result.data));
        toast({ title: "Success!", description: "Your questions have been generated." });
        router.push("/questions");
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    });
  };

  const socialScienceChapters = React.useMemo(() => {
    if (watchedSubjectId !== 'social-science') {
      return null;
    }
    const grouped: Record<string, Chapter[]> = {
      "History": [],
      "Geography": [],
      "Political Science (Civics)": [],
      "Economics": [],
    };
    chapters.forEach(chapter => {
      if (chapter.id.startsWith('hist-')) {
        grouped["History"].push(chapter);
      } else if (chapter.id.startsWith('geo-')) {
        grouped["Geography"].push(chapter);
      } else if (chapter.id.startsWith('civ-')) {
        grouped["Political Science (Civics)"].push(chapter);
      } else if (chapter.id.startsWith('econ-')) {
        grouped["Economics"].push(chapter);
      }
    });
    return grouped;
  }, [chapters, watchedSubjectId]);


  return (
    <>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Create Your Question Paper</CardTitle>
          <CardDescription>Fill out the details below to generate your questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a class" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!watchedClassId}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AnimatePresence>
                {chapters.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Separator />
                    <FormField
                      control={form.control}
                      name="chapters"
                      render={() => (
                        <FormItem className="mt-8">
                          <div className="mb-4">
                            <FormLabel className="text-base">Chapters</FormLabel>
                            <FormDescription>Select one or more chapters to include.</FormDescription>
                          </div>
                          <div className="space-y-3">
                           {socialScienceChapters ? (
                              Object.entries(socialScienceChapters).map(([group, chapters]) => (
                                chapters.length > 0 && (
                                <div key={group} className="space-y-3">
                                  <h3 className="text-lg font-semibold mt-4 pt-2">{group}</h3>
                                  {chapters.map((chapter) => (
                                     <FormField
                                        key={chapter.id}
                                        control={form.control}
                                        name="chapters"
                                        render={({ field }) => (
                                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.some(c => c.id === chapter.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...(field.value || []), chapter])
                                                    : field.onChange(field.value?.filter((value) => value.id !== chapter.id));
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">{chapter.title}</FormLabel>
                                          </FormItem>
                                        )}
                                      />
                                  ))}
                                </div>
                                )
                              ))
                           ) : (
                            chapters.map((chapter) => (
                              <FormField
                                key={chapter.id}
                                control={form.control}
                                name="chapters"
                                render={({ field }) => {
                                  return (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.some(c => c.id === chapter.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), chapter])
                                            : field.onChange(field.value?.filter((value) => value.id !== chapter.id));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{chapter.title}</FormLabel>
                                  </FormItem>
                                )}}
                              />
                            ))
                           )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Separator />
              
              <FormItem className="mt-8">
                <div className="mb-4">
                    <FormLabel className="text-base">Question Types</FormLabel>
                    <FormDescription>Choose question types and specify how many of each you need.</FormDescription>
                </div>
                <div className="space-y-4">
                    {QUESTION_TYPES.map((type) => {
                        const fieldIndex = fields.findIndex(f => f.type === type);
                        const isSelected = fieldIndex !== -1;
                        
                        return (
                            <motion.div key={type} layout className="flex flex-col space-y-2 p-3 bg-secondary/50 rounded-lg">
                               <div className="flex items-center justify-between">
                                  <FormLabel className="font-normal flex items-center space-x-2">
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                append({ type, count: 10 });
                                            } else {
                                                const idxToRemove = fields.findIndex(f => f.type === type);
                                                if (idxToRemove !== -1) remove(idxToRemove);
                                            }
                                        }}
                                    />
                                    <span>{type}</span>
                                  </FormLabel>
                                  
                                  <AnimatePresence>
                                  {isSelected && (
                                    <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }}>
                                      <Controller
                                          control={form.control}
                                          name={`questionTypes.${fieldIndex}.count`}
                                          render={({ field, fieldState }) => (
                                              <div className="w-32">
                                                  <Input type="number" {...field} className="h-8" />
                                                  {fieldState.error && <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>}
                                              </div>
                                          )}
                                      />
                                    </motion.div>
                                  )}
                                  </AnimatePresence>
                               </div>
                            </motion.div>
                        );
                    })}
                </div>
                <Controller name="questionTypes" control={form.control} render={({ fieldState }) => (
                     fieldState.error && <p className="text-sm font-medium text-destructive mt-2">{fieldState.error.message}</p>
                )} />
              </FormItem>

              <CardFooter className="px-0 pt-8">
                <Button type="submit" disabled={isPending || !isFormSubmittable} className="w-full md:w-auto">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isPending ? "Generating..." : "Generate Questions"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

    