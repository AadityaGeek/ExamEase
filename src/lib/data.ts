
import { MOCK_CLASSES } from './mock-data';
import type { Class, Subject, Chapter } from './types';

// Simulate async data fetching
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getClasses = async (): Promise<Pick<Class, 'id' | 'name'>[]> => {
  await sleep(100);
  return MOCK_CLASSES.map((c) => ({ id: c.id, name: c.name })).sort((a, b) => a.name.localeCompare(b.name));
};

export const getSubjects = async (classId: string): Promise<Pick<Subject, 'id' | 'name'>[]> => {
  await sleep(100);
  const selectedClass = MOCK_CLASSES.find((c) => c.id === classId);
  if (!selectedClass) return [];
  return selectedClass.subjects.map((s) => ({ id: s.id, name: s.name })).sort((a,b) => a.name.localeCompare(b.name));
};

export const getChapters = async (classId: string, subjectId: string): Promise<Pick<Chapter, 'id' | 'title'>[]> => {
  await sleep(100);
  const selectedClass = MOCK_CLASSES.find((c) => c.id === classId);
  const selectedSubject = selectedClass?.subjects.find((s) => s.id === subjectId);
  if (!selectedSubject) return [];
  return selectedSubject.chapters.map((c) => ({ id: c.id, title: c.title })).sort((a,b) => a.title.localeCompare(b.title));
};

export const getChapterDetails = async (classId: string, subjectId: string, chapterId: string): Promise<Chapter | null> => {
  await sleep(100);
  const selectedClass = MOCK_CLASSES.find(c => c.id === classId);
  const selectedSubject = selectedClass?.subjects.find(s => s.id === subjectId);
  const chapter = selectedSubject?.chapters.find(c => c.id === chapterId);
  return chapter || null;
}

export const getClassAndSubjectDetails = async (classId: string, subjectId: string): Promise<{className: string, subjectName: string} | null> => {
    await sleep(100);
    const selectedClass = MOCK_CLASSES.find(c => c.id === classId);
    const selectedSubject = selectedClass?.subjects.find(s => s.id === subjectId);
    if (!selectedClass || !selectedSubject) {
        return null;
    }
    return {
        className: selectedClass.name,
        subjectName: selectedSubject.name,
    };
}
