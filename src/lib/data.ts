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

const mockData: Class[] = [
  {
    id: "10",
    name: "Class 10",
    subjects: [
      {
        id: "science",
        name: "Science",
        chapters: [
          { id: "ch1", title: "Chapter 1: Chemical Reactions and Equations", studyMaterial: "A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another. Classically, chemical reactions encompass changes that only involve the positions of electrons in the forming and breaking of chemical bonds between atoms, with no change to the nuclei (no change to the elements present), and can often be described by a chemical equation. Balancing chemical equations is a fundamental skill. Key reaction types include combination, decomposition, displacement, and double displacement reactions. Redox reactions involve both oxidation and reduction." },
          { id: "ch2", title: "Chapter 2: Acids, Bases and Salts", studyMaterial: "Acids are sour, turn blue litmus red, and have a pH less than 7. Bases are bitter, feel soapy, turn red litmus blue, and have a pH greater than 7. Salts are formed from the reaction of an acid and a base. The pH scale measures acidity or alkalinity. Indicators like litmus, phenolphthalein, and methyl orange are used to test for acids and bases. Strong acids and bases ionize completely in water, while weak ones do not." },
          { id: "ch6", title: "Chapter 6: Life Processes", studyMaterial: "Life processes are the basic functions performed by living organisms to maintain their life on earth. These include nutrition, respiration, transportation, and excretion. In autotrophic nutrition, organisms produce their own food, like in photosynthesis. Heterotrophic nutrition involves taking in ready-made food. Respiration is the process of releasing energy from food. Transportation in humans is carried out by the circulatory system, and in plants by xylem and phloem. Excretion is the removal of metabolic waste products." },
        ],
      },
      {
        id: "math",
        name: "Mathematics",
        chapters: [
            { id: "ch1", title: "Chapter 1: Real Numbers", studyMaterial: "Euclid's division lemma states that for any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 <= r < b. The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of primes, and this factorization is unique. We can use these to find the HCF and LCM of numbers. Rational numbers can be expressed as p/q, while irrational numbers cannot. The decimal expansion of a rational number is either terminating or non-terminating repeating." },
            { id: "ch3", title: "Chapter 3: Pair of Linear Equations in Two Variables", studyMaterial: "A pair of linear equations in two variables can be represented graphically. The lines may intersect at one point (unique solution), be parallel (no solution), or be coincident (infinitely many solutions). Algebraically, solutions can be found using the substitution method, elimination method, and cross-multiplication method. Equations can be reduced to a pair of linear equations and then solved." },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "Class 9",
    subjects: [
        {
            id: "science",
            name: "Science",
            chapters: [
                { id: "ch5", title: "Chapter 5: The Fundamental Unit of Life", studyMaterial: "The cell is the fundamental structural and functional unit of all living organisms. It was discovered by Robert Hooke in 1665. Organisms can be unicellular or multicellular. A typical cell consists of a cell membrane, cytoplasm, and a nucleus. Plant cells have a cell wall outside the cell membrane. Organelles like mitochondria, ribosomes, Golgi apparatus, and endoplasmic reticulum perform specific functions within the cell." },
                { id: "ch8", title: "Chapter 8: Motion", studyMaterial: "Motion is the change in position of an object over time. We describe motion using terms like distance, displacement, speed, velocity, and acceleration. Motion can be uniform or non-uniform. The three equations of motion for an object moving with uniform acceleration are v = u + at, s = ut + 1/2 at^2, and 2as = v^2 - u^2. Graphical representation of motion, such as distance-time and velocity-time graphs, are useful for studying motion." },
            ],
        }
    ]
  }
];

export const getClasses = (): Promise<Pick<Class, 'id' | 'name'>[]> => {
  return Promise.resolve(mockData.map(c => ({ id: c.id, name: c.name })));
};

export const getSubjects = (classId: string): Promise<Pick<Subject, 'id' | 'name'>[]> => {
  const classData = mockData.find(c => c.id === classId);
  if (!classData) return Promise.resolve([]);
  return Promise.resolve(classData.subjects.map(s => ({ id: s.id, name: s.name })));
};

export const getChapters = (classId: string, subjectId: string): Promise<Pick<Chapter, 'id' | 'title'>[]> => {
  const classData = mockData.find(c => c.id === classId);
  if (!classData) return Promise.resolve([]);
  const subjectData = classData.subjects.find(s => s.id === subjectId);
  if (!subjectData) return Promise.resolve([]);
  return Promise.resolve(subjectData.chapters.map(ch => ({ id: ch.id, title: ch.title })));
};

export const getChapterDetails = (classId: string, subjectId: string, chapterId: string): Promise<Chapter | null> => {
    const classData = mockData.find(c => c.id === classId);
    if (!classData) return Promise.resolve(null);
    const subjectData = classData.subjects.find(s => s.id === subjectId);
    if (!subjectData) return Promise.resolve(null);
    const chapterData = subjectData.chapters.find(ch => ch.id === chapterId);
    return Promise.resolve(chapterData || null);
}

export const getClassAndSubjectDetails = (classId: string, subjectId: string): Promise<{className: string, subjectName: string} | null> => {
    const classData = mockData.find(c => c.id === classId);
    if (!classData) return Promise.resolve(null);
    const subjectData = classData.subjects.find(s => s.id === subjectId);
    if (!subjectData) return Promise.resolve(null);
    return Promise.resolve({className: classData.name, subjectName: subjectData.name});
}
