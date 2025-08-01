
import { CURRICULUM_DATA } from './curriculum-data';
import type { Chapter, Class, Subject } from './types';

export const getClasses = async (): Promise<Pick<Class, 'id' | 'name'>[]> => {
  const classList = CURRICULUM_DATA.map(c => ({ id: c.id, name: c.name }));
  return classList.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

export const getSubjects = async (classId: string): Promise<Pick<Subject, 'id' | 'name'>[]> => {
    if (!classId) return [];
    const classData = CURRICULUM_DATA.find(c => c.id === classId);
    if (!classData) return [];
    const subjectList = classData.subjects.map(s => ({ id: s.id, name: s.name }));
    return subjectList.sort((a,b) => a.name.localeCompare(b.name));
};

export const getChapters = async (classId: string, subjectId: string): Promise<Chapter[]> => {
    if (!classId || !subjectId) return [];
    const classData = CURRICULUM_DATA.find(c => c.id === classId);
    if (!classData) return [];
    const subjectData = classData.subjects.find(s => s.id === subjectId);
    if (!subjectData) return [];
    // The data is already in book sequence in the source file, so we just return it.
    // If sorting is needed, it can be done here.
    return subjectData.chapters.sort((a,b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
};

export const getClassAndSubjectDetails = async (classId: string, subjectId: string): Promise<{className: string, subjectName: string} | null> => {
    if (!classId || !subjectId) return null;
    const classData = CURRICULUM_DATA.find(c => c.id === classId);
    const subjectData = classData?.subjects.find(s => s.id === subjectId);

    if (!classData || !subjectData) {
        return null;
    }
    return {
        className: classData.name,
        subjectName: subjectData.name,
    };
}
