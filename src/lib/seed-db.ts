
import { db } from './firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';

// Data for Classes, Subjects, and Chapters
const MOCK_CLASSES: any[] = [
  // This data has already been seeded into your Firestore database.
  // You can modify your data directly in the Firebase Console.
];


async function seedDatabase() {
  if (MOCK_CLASSES.length === 0) {
    console.log('No data to seed. The database has likely already been seeded.');
    return;
  }
  
  const batch = writeBatch(db);

  MOCK_CLASSES.forEach(classData => {
    // Create a document reference for the class
    const classRef = doc(db, 'classes', classData.id);
    batch.set(classRef, { name: classData.name });

    classData.subjects.forEach(subjectData => {
      // Create a document reference for the subject within the class
      const subjectRef = doc(collection(classRef, 'subjects'), subjectData.id);
      batch.set(subjectRef, { name: subjectData.name });

      subjectData.chapters.forEach(chapterData => {
        // Create a document reference for the chapter within the subject
        const chapterRef = doc(collection(subjectRef, 'chapters'), chapterData.id);
        batch.set(chapterRef, { 
            title: chapterData.title,
            studyMaterial: chapterData.studyMaterial
        });
      });
    });
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database: ', error);
  }
}

// Check if the script is being run directly
if (require.main === module) {
  seedDatabase();
}
