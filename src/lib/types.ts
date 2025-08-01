
export type Chapter = {
  id: string;
  title: string;
  // pdfPath is no longer needed
};

export type Subject = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type Class = {
  id: string;
  name: string;
  subjects: Subject[];
};
