
export type Chapter = {
  id: string;
  title: string;
  studyMaterial: string;
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
