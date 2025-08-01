
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
      { 
        id: 'maths', 
        name: 'Maths', 
        chapters: [
            { id: 'ch-1', title: '1. Number Systems' },
            { id: 'ch-2', title: '2. Polynomials' },
            { id: 'ch-3', title: '3. Coordinate Geometry' },
            { id: 'ch-4', title: '4. Linear Equations in Two Variables' },
            { id: 'ch-5', title: '5. Introduction to Euclid\'s Geometry' },
            { id: 'ch-6', title: '6. Lines and Angles' },
            { id: 'ch-7', title: '7. Triangles' },
            { id: 'ch-8', title: '8. Quadrilaterals' },
            { id: 'ch-9', title: '9. Areas of Parallelograms and Triangles' },
            { id: 'ch-10', title: '10. Circles' },
            { id: 'ch-11', title: '11. Constructions' },
            { id: 'ch-12', title: '12. Heron\'s Formula' },
            { id: 'ch-13', title: '13. Surface Areas and Volumes' },
            { id: 'ch-14', title: '14. Statistics' },
            { id: 'ch-15', title: '15. Probability' },
        ] 
      },
      {
        id: 'social-science',
        name: 'Social Science',
        chapters: [
            { id: 'hist-ch-1', title: 'History: 1. The French Revolution' },
            { id: 'hist-ch-2', title: 'History: 2. Socialism in Europe and the Russian Revolution' },
            { id: 'hist-ch-3', title: 'History: 3. Nazism and the Rise of Hitler' },
            { id: 'geo-ch-1', title: 'Geography: 1. India - Size and Location' },
            { id: 'geo-ch-2', title: 'Geography: 2. Physical Features of India' },
            { id: 'geo-ch-3', title: 'Geography: 3. Drainage' },
            { id: 'civ-ch-1', title: 'Civics: 1. What is Democracy? Why Democracy?' },
            { id: 'civ-ch-2', title: 'Civics: 2. Constitutional Design' },
            { id: 'econ-ch-1', title: 'Economics: 1. The Story of Village Palampur' },
        ]
      }
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
        chapters: [
            { id: 'ch-1', title: '1. Real Numbers' },
            { id: 'ch-2', title: '2. Polynomials' },
            { id: 'ch-3', title: '3. Pair of Linear Equations in Two Variables' },
            { id: 'ch-4', title: '4. Quadratic Equations' },
            { id: 'ch-5', title: '5. Arithmetic Progressions' },
            { id: 'ch-6', title: '6. Triangles' },
            { id: 'ch-7', title: '7. Coordinate Geometry' },
            { id: 'ch-8', title: '8. Introduction to Trigonometry' },
            { id: 'ch-9', title: '9. Some Applications of Trigonometry' },
            { id: 'ch-10', title: '10. Circles' },
            { id: 'ch-11', title: '11. Constructions' },
            { id: 'ch-12', title: '12. Areas Related to Circles' },
            { id: 'ch-13', title: '13. Surface Areas and Volumes' },
            { id: 'ch-14', title: '14. Statistics' },
            { id: 'ch-15', title: '15. Probability' },
        ]
      },
      {
        id: 'social-science',
        name: 'Social Science',
        chapters: [
            { id: 'hist-ch-1', title: 'History: 1. The Rise of Nationalism in Europe' },
            { id: 'hist-ch-2', title: 'History: 2. Nationalism in India' },
            { id: 'hist-ch-3', title: 'History: 3. The Making of a Global World' },
            { id: 'geo-ch-1', title: 'Geography: 1. Resources and Development' },
            { id: 'geo-ch-2', title: 'Geography: 2. Forest and Wildlife Resources' },
            { id: 'geo-ch-3', title: 'Geography: 3. Water Resources' },
            { id: 'civ-ch-1', title: 'Civics: 1. Power Sharing' },
            { id: 'civ-ch-2', title: 'Civics: 2. Federalism' },
            { id: 'econ-ch-1', title: 'Economics: 1. Development' },
            { id: 'econ-ch-2', title: 'Economics: 2. Sectors of the Indian Economy' },
        ]
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
