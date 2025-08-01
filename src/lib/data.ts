
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import type { Chapter, Class, Subject } from './types';

export const getClasses = async (): Promise<Pick<Class, 'id' | 'name'>[]> => {
  const classesCol = collection(db, 'classes');
  const classSnapshot = await getDocs(classesCol);
  const classList = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pick<Class, 'id' | 'name'>));
  return classList.sort((a, b) => a.name.localeCompare(b.name));
};

export const getSubjects = async (classId: string): Promise<Pick<Subject, 'id' | 'name'>[]> => {
    if (!classId) return [];
    const subjectsCol = collection(db, 'classes', classId, 'subjects');
    const subjectSnapshot = await getDocs(subjectsCol);
    const subjectList = subjectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pick<Subject, 'id' | 'name'>));
    return subjectList.sort((a,b) => a.name.localeCompare(b.name));
};

export const getChapters = async (classId: string, subjectId: string): Promise<Pick<Chapter, 'id' | 'title'>[]> => {
    if (!classId || !subjectId) return [];
    const chaptersCol = collection(db, `classes/${classId}/subjects/${subjectId}/chapters`);
    const chapterSnapshot = await getDocs(chaptersCol);
    const chapterList = chapterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pick<Chapter, 'id' | 'title'>));
    return chapterList.sort((a,b) => a.title.localeCompare(b.title));
};

export const getChapterDetails = async (classId: string, subjectId: string, chapterId: string): Promise<Chapter | null> => {
    if (!classId || !subjectId || !chapterId) return null;
    const chapterRef = doc(db, `classes/${classId}/subjects/${subjectId}/chapters`, chapterId);
    const chapterSnap = await getDoc(chapterRef);
    if (!chapterSnap.exists()) {
        return null;
    }
    return { id: chapterSnap.id, ...chapterSnap.data() } as Chapter;
}

export const createChapter = async (classId: string, subjectId: string, chapterData: { title: string; studyMaterial: string }): Promise<void> => {
    if (!classId || !subjectId) {
        throw new Error("Class ID and Subject ID are required to create a chapter.");
    }
    const chaptersCol = collection(db, `classes/${classId}/subjects/${subjectId}/chapters`);
    await addDoc(chaptersCol, chapterData);
};

export const getClassAndSubjectDetails = async (classId: string, subjectId: string): Promise<{className: string, subjectName: string} | null> => {
    if (!classId || !subjectId) return null;
    const classRef = doc(db, 'classes', classId);
    const subjectRef = doc(db, `classes/${classId}/subjects`, subjectId);

    const classSnap = await getDoc(classRef);
    const subjectSnap = await getDoc(subjectRef);

    if (!classSnap.exists() || !subjectSnap.exists()) {
        return null;
    }
    return {
        className: classSnap.data().name,
        subjectName: subjectSnap.data().name,
    };
}