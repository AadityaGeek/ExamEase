
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
          { id: 'ch-7', title: '7. Diversity in Living Organisms' },
          { id: 'ch-8', title: '8. Motion' },
          { id: 'ch-9', title: '9. Force and Laws of Motion' },
          { id: 'ch-10', title: '10. Gravitation' },
          { id: 'ch-11', title: '11. Work and Energy' },
          { id: 'ch-12', title: '12. Sound' },
          { id: 'ch-13', title: '13. Why Do We Fall Ill' },
          { id: 'ch-14', title: '14. Natural Resources' },
          { id: 'ch-15', title: '15. Improvement in Food Resources' },
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
            { id: 'hist-ch-1', title: 'The French Revolution' },
            { id: 'hist-ch-2', title: 'Socialism in Europe and the Russian Revolution' },
            { id: 'hist-ch-3', title: 'Nazism and the Rise of Hitler' },
            { id: 'hist-ch-4', title: 'Forest Society and Colonialism' },
            { id: 'hist-ch-5', title: 'Pastoralists in the Modern World' },
            { id: 'geo-ch-1', title: 'India - Size and Location' },
            { id: 'geo-ch-2', title: 'Physical Features of India' },
            { id: 'geo-ch-3', title: 'Drainage' },
            { id: 'geo-ch-4', title: 'Climate' },
            { id: 'geo-ch-5', title: 'Natural Vegetation and Wildlife' },
            { id: 'geo-ch-6', title: 'Population' },
            { id: 'civ-ch-1', title: 'What is Democracy? Why Democracy?' },
            { id: 'civ-ch-2', title: 'Constitutional Design' },
            { id: 'civ-ch-3', title: 'Electoral Politics' },
            { id: 'civ-ch-4', title: 'Working of Institutions' },
            { id: 'civ-ch-5', title: 'Democratic Rights' },
            { id: 'econ-ch-1', title: 'The Story of Village Palampur' },
            { id: 'econ-ch-2', title: 'People as Resource' },
            { id: 'econ-ch-3', title: 'Poverty as a Challenge' },
            { id: 'econ-ch-4', title: 'Food Security in India' },
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
            { id: 'ch-5', title: '5. Periodic Classification of Elements' },
            { id: 'ch-6', title: '6. Life Processes' },
            { id: 'ch-7', title: '7. Control and Coordination' },
            { id: 'ch-8', title: '8. How do Organisms Reproduce?' },
            { id: 'ch-9', title: '9. Heredity and Evolution' },
            { id: 'ch-10', title: '10. Light – Reflection and Refraction' },
            { id: 'ch-11', title: '11. The Human Eye and the Colourful World' },
            { id: 'ch-12', title: '12. Electricity' },
            { id: 'ch-13', title: '13. Magnetic Effects of Electric Current' },
            { id: 'ch-14', title: '14. Sources of Energy' },
            { id: 'ch-15', title: '15. Our Environment' },
            { id: 'ch-16', title: '16. Management of Natural Resources' },
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
            { id: 'hist-ch-1', title: 'The Rise of Nationalism in Europe' },
            { id: 'hist-ch-2', title: 'Nationalism in India' },
            { id: 'hist-ch-3', title: 'The Making of a Global World' },
            { id: 'hist-ch-4', title: 'The Age of Industrialisation' },
            { id: 'hist-ch-5', title: 'Print Culture and the Modern World' },
            { id: 'geo-ch-1', title: 'Resources and Development' },
            { id: 'geo-ch-2', title: 'Forest and Wildlife Resources' },
            { id: 'geo-ch-3', title: 'Water Resources' },
            { id: 'geo-ch-4', title: 'Agriculture' },
            { id: 'geo-ch-5', title: 'Minerals and Energy Resources' },
            { id: 'geo-ch-6', title: 'Manufacturing Industries' },
            { id: 'geo-ch-7', title: 'Lifelines of National Economy' },
            { id: 'civ-ch-1', title: 'Power Sharing' },
            { id: 'civ-ch-2', title: 'Federalism' },
            { id: 'civ-ch-3', title: 'Democracy and Diversity' },
            { id: 'civ-ch-4', title: 'Gender, Religion and Caste' },
            { id: 'civ-ch-5', title: 'Popular Struggles and Movements' },
            { id: 'civ-ch-6', title: 'Political Parties' },
            { id: 'civ-ch-7', title: 'Outcomes of Democracy' },
            { id: 'civ-ch-8', title: 'Challenges to Democracy' },
            { id: 'econ-ch-1', title: 'Development' },
            { id: 'econ-ch-2', title: 'Sectors of the Indian Economy' },
            { id: 'econ-ch-3', title: 'Money and Credit' },
            { id: 'econ-ch-4', title: 'Globalisation and the Indian Economy' },
            { id: 'econ-ch-5', title: 'Consumer Rights' },
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
