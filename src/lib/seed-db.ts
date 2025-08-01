
import { db } from './firebase';
import { collection, doc, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';

const MOCK_CLASSES: any[] = [
    {
    id: 'class-9',
    name: 'Class 9',
    subjects: [
      {
        id: 'science',
        name: 'Science',
        chapters: [
          { id: 'ch-1', title: '1. Matter in Our Surroundings' },
          { id: 'ch-2', title: '2. Is Matter Around Us Pure' },
          { id: 'ch-3', title: '3. Atoms and Molecules' },
          { id: 'ch-4', title: '4. Structure of the Atom' },
          { id: 'ch-5', title: '5. The Fundamental Unit of Life' },
          { id: 'ch-6', title: '6. Tissues' },
          { id: 'ch-7', title: '7. Motion' },
          { id: 'ch-8', title: '8. Force and Laws of Motion' },
          { id: 'ch-9', title: '9. Gravitation' },
          { id: 'ch-10', title: '10. Work and Energy' },
          { id: 'ch-11', title: '11. Sound' },
          { id: 'ch-12', title: '12. Improvement in Food Resources' },
        ]
      },
      { id: 'maths', name: 'Maths', chapters: [] }
    ]
  },
  {
    id: 'class-10',
    name: 'Class 10',
    subjects: [
      {
        id: 'science',
        name: 'Science',
        chapters: [
            { id: 'ch-1', title: '1. Chemical Reactions and Equations' },
            { id: 'ch-2', title: '2. Acids, Bases and Salts' },
            { id: 'ch-3', title: '3. Metals and Non-metals' },
            { id: 'ch-4', title: '4. Carbon and its Compounds' },
            { id: 'ch-5', title: '5. Life Processes' },
            { id: 'ch-6', title: '6. Control and Coordination' },
            { id: 'ch-7', title: '7. How do Organisms Reproduce?' },
            { id: 'ch-8', title: '8. Heredity and Evolution' },
            { id: 'ch-9', title: '9. Light – Reflection and Refraction' },
            { id: 'ch-10', title: '10. The Human Eye and the Colourful World' },
            { id: 'ch-11', title: '11. Electricity' },
            { id: 'ch-12', title: '12. Magnetic Effects of Electric Current' },
            { id: 'ch-13', title: '13. Our Environment' },
        ]
      },
      {
        id: 'maths',
        name: 'Maths',
        chapters: []
      }
    ]
  }
];

async function seedDatabase() {
  console.log('Clearing existing data...');
  const classesCollection = collection(db, 'classes');
  const classesSnapshot = await getDocs(classesCollection);
  
  const deletePromises: Promise<any>[] = [];

  classesSnapshot.forEach(classDoc => {
    const subjectsCollection = collection(db, 'classes', classDoc.id, 'subjects');
    const subjectsSnapshotPromise = getDocs(subjectsCollection);
    
    const deletePromise = subjectsSnapshotPromise.then(async subjectsSnapshot => {
      for (const subjectDoc of subjectsSnapshot.docs) {
        const chaptersCollection = collection(db, 'classes', classDoc.id, 'subjects', subjectDoc.id, 'chapters');
        const chaptersSnapshot = await getDocs(chaptersCollection);
        if (!chaptersSnapshot.empty) {
          const chapterDeleteBatch = writeBatch(db);
          chaptersSnapshot.forEach(doc => chapterDeleteBatch.delete(doc.ref));
          await chapterDeleteBatch.commit();
        }
        await deleteDoc(subjectDoc.ref);
      }
      await deleteDoc(classDoc.ref);
    });

    deletePromises.push(deletePromise);
  });

  await Promise.all(deletePromises);
  console.log('Existing data cleared.');

  console.log('Seeding new data...');
  const seedBatch = writeBatch(db);

  MOCK_CLASSES.forEach(classData => {
    const classRef = doc(db, 'classes', classData.id);
    seedBatch.set(classRef, { name: classData.name });

    classData.subjects.forEach(subjectData => {
      const subjectRef = doc(collection(classRef, 'subjects'), subjectData.id);
      seedBatch.set(subjectRef, { name: subjectData.name });

      subjectData.chapters.forEach((chapterData: any) => {
        const chapterRef = doc(collection(subjectRef, 'chapters'), chapterData.id);
        // We no longer need to store pdfPath
        seedBatch.set(chapterRef, {
          title: chapterData.title,
        });
      });
    });
  });

  try {
    await seedBatch.commit();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database: ', error);
  }
}

if (require.main === module) {
  seedDatabase();
}
