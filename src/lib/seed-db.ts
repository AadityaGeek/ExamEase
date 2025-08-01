
import { db } from './firebase';
import { collection, doc, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';

// Data for Classes, Subjects, and Chapters
const MOCK_CLASSES: any[] = [
  {
    id: 'class-10',
    name: 'Class 10',
    subjects: [
      {
        id: 'science-10',
        name: 'Science',
        chapters: [
          { id: 'ch-1', title: 'Chemical Reactions and Equations', studyMaterial: 'A chemical reaction is a process that leads to the chemical transformation of one set of chemical substances to another. Classically, chemical reactions encompass changes that only involve the positions of electrons in the forming and breaking of chemical bonds between atoms, with no change to the nuclei (no change to the elements present), and can often be described by a chemical equation.' },
          { id: 'ch-2', title: 'Acids, Bases and Salts', studyMaterial: 'An acid is a molecule or ion capable of donating a proton (hydrogen ion H+), or, alternatively, capable of forming a covalent bond with an electron pair (a Lewis acid). A base is a chemical species that donates electrons, accepts protons, or releases hydroxide (OH-) ions in aqueous solution. Salts are ionic compounds that result from the neutralization reaction of an acid and a base.' },
          { id: 'ch-3', title: 'Metals and Non-metals', studyMaterial: 'Metals are materials that, when freshly prepared, polished, or fractured, show a lustrous appearance, and conduct electricity and heat relatively well. Non-metals are chemical elements that mostly lack the characteristics of a metal. Physically, non-metals tend to be highly volatile (easily vaporized), have low elasticity, and are good insulators of heat and electricity.' },
          { id: 'ch-4', title: 'Carbon and its Compounds', studyMaterial: 'Carbon is a chemical element with the symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds. The properties of carbon that give rise to the very large number of carbon compounds are catenation and isomerism.' },
          { id: 'ch-5', title: 'Life Processes', studyMaterial: 'The processes that are necessary for an organism to stay alive. For example, nutrition, respiration, circulation, excretion, etc. are life processes. In unicellular organisms, all these processes are carried out by a single cell. In multicellular organisms, well-developed systems are present to carry out the processes.' },
          { id: 'ch-6', title: 'Control and Coordination', studyMaterial: 'Control and coordination are the functions of the nervous system and hormones in our bodies. The nervous system and endocrine system are the two systems responsible for control and coordination in multicellular organisms.' },
          { id: 'ch-7', title: 'How do Organisms Reproduce?', studyMaterial: 'Reproduction is the biological process by which new individual organisms – "offspring" – are produced from their "parents". Reproduction is a fundamental feature of all known life; each individual organism exists as the result of reproduction. There are two forms of reproduction: asexual and sexual.' },
          { id: 'ch-8', title: 'Heredity and Evolution', studyMaterial: 'Heredity is the passing on of traits from parents to their offspring. Evolution is the change in the characteristics of a species over several generations and relies on the process of natural selection.' },
          { id: 'ch-9', title: 'Light – Reflection and Refraction', studyMaterial: 'Reflection is the bouncing back of light rays from a polished surface. Refraction is the bending of light when it passes from one medium to another. These phenomena are governed by the laws of reflection and refraction respectively.' },
          { id: 'ch-10', title: 'The Human Eye and the Colourful World', studyMaterial: 'The human eye is a sense organ that reacts to light and allows vision. Rod and cone cells in the retina are photoreceptive cells which are able to detect visible light and convey this information to the brain. The eye allows us to perceive colors, depth, and dimensions of the world.' },
          { id: 'ch-11', title: 'Electricity', studyMaterial: 'Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge. Electricity is related to magnetism, both being part of the phenomenon of electromagnetism, as described by Maxwell\'s equations.' },
          { id: 'ch-12', title: 'Magnetic Effects of Electric Current', studyMaterial: 'An electric current flowing in a wire produces a magnetic field. The magnetic field exerts a force on a magnetic compass placed near the wire. This is called the magnetic effect of the current.' },
          { id: 'ch-13', title: 'Our Environment', studyMaterial: 'The environment is everything that is around us. It can be living or non-living things. It includes physical, chemical and other natural forces. The environment contains different types of ecosystems, such as terrestrial and aquatic ecosystems.' },
        ]
      },
      {
        id: 'maths-10',
        name: 'Maths',
        chapters: []
      }
    ]
  },
  {
    id: 'class-9',
    name: 'Class 9',
    subjects: [
        { 
          id: 'science-9', 
          name: 'Science', 
          chapters: [
            { id: 'ch-1', title: 'Matter in Our Surroundings', studyMaterial: 'Matter is made up of particles. The particles of matter are very, very small, have space between them, are continuously moving, and attract each other. The states of matter are inter-convertible.' },
            { id: 'ch-2', title: 'Is Matter Around Us Pure', studyMaterial: 'A pure substance consists of a single type of particle. A mixture consists of more than one type of pure substance. Mixtures can be separated into pure substances using appropriate separation techniques.' },
            { id: 'ch-3', title: 'Atoms and Molecules', studyMaterial: 'An atom is the smallest particle of an element that can take part in a chemical reaction. A molecule is the smallest particle of an element or a compound that is capable of an independent existence.' },
            { id: 'ch-4', title: 'Structure of the Atom', studyMaterial: 'Atoms are made of three subatomic particles: protons, neutrons, and electrons. The nucleus at the center contains protons and neutrons, and electrons revolve around the nucleus in definite energy shells.' },
            { id: 'ch-5', title: 'The Fundamental Unit of Life', studyMaterial: 'The cell is the fundamental structural and functional unit of all living organisms. It is the basic unit of life. Organisms can be unicellular or multicellular.' },
            { id: 'ch-6', title: 'Tissues', studyMaterial: 'A tissue is a group of cells having a similar origin, structure, and function. Plant tissues are of two types: meristematic and permanent. Animal tissues include epithelial, connective, muscular, and nervous tissue.' },
            { id: 'ch-7', title: 'Motion', studyMaterial: 'Motion is the change of position of an object with time. Motion can be described in terms of distance, displacement, speed, velocity, and acceleration. The three equations of motion describe the relationship between these quantities.' },
            { id: 'ch-8', title: 'Force and Laws of Motion', studyMaterial: 'Force is a push or a pull on an object. Newton\'s laws of motion describe the relationship between the motion of an object and the forces acting on it.' },
            { id: 'ch-9', title: 'Gravitation', studyMaterial: 'Gravitation is the force of attraction between any two bodies in the universe. The universal law of gravitation states that every object in the universe attracts every other object with a force.' },
            { id: 'ch-10', title: 'Work and Energy', studyMaterial: 'Work is done when a force produces motion. Energy is the capacity to do work. The various forms of energy are interconvertible. The law of conservation of energy states that energy can neither be created nor destroyed.' },
            { id: 'ch-11', title: 'Sound', studyMaterial: 'Sound is a form of energy that produces a sensation of hearing in our ears. It is produced due to the vibration of objects. It travels in the form of waves.' },
            { id: 'ch-12', title: 'Why Do We Fall Ill', studyMaterial: 'Health is a state of being well enough to function well physically, mentally, and socially. Diseases are conditions that impair the normal functioning of the body.' },
            { id: 'ch-13', title: 'Natural Resources', studyMaterial: 'The resources available on the Earth and the energy from the Sun are necessary to meet the basic requirements of all life forms on the Earth. These are air, water, and land.' },
            { id: 'ch-14', title: 'Improvement in Food Resources', studyMaterial: 'This chapter deals with the need for improvement in food resources, the Green Revolution, and the White Revolution, and discusses how to increase the yield of crops and livestock.' },
          ] 
        },
        { id: 'maths-9', name: 'Maths', chapters: [] }
    ]
  }
];


async function seedDatabase() {
  console.log('Clearing existing data...');
  const classesCollection = collection(db, 'classes');
  const classesSnapshot = await getDocs(classesCollection);
  
  // This is a more robust way to delete collections and their subcollections.
  for (const classDoc of classesSnapshot.docs) {
    const subjectsCollection = collection(db, 'classes', classDoc.id, 'subjects');
    const subjectsSnapshot = await getDocs(subjectsCollection);
    for (const subjectDoc of subjectsSnapshot.docs) {
        const chaptersCollection = collection(db, 'classes', classDoc.id, 'subjects', subjectDoc.id, 'chapters');
        const chaptersSnapshot = await getDocs(chaptersCollection);
        const chapterDeleteBatch = writeBatch(db);
        chaptersSnapshot.forEach(doc => {
            chapterDeleteBatch.delete(doc.ref);
        });
        await chapterDeleteBatch.commit();
        await deleteDoc(subjectDoc.ref);
    }
    await deleteDoc(classDoc.ref);
  }
  console.log('Existing data cleared.');


  // Start seeding new data
  console.log('Seeding new data...');
  const seedBatch = writeBatch(db);

  MOCK_CLASSES.forEach(classData => {
    const classRef = doc(db, 'classes', classData.id);
    seedBatch.set(classRef, { name: classData.name });

    classData.subjects.forEach(subjectData => {
      const subjectRef = doc(collection(classRef, 'subjects'), subjectData.id);
      seedBatch.set(subjectRef, { name: subjectData.name });

      subjectData.chapters.forEach(chapterData => {
        const chapterRef = doc(collection(subjectRef, 'chapters'), chapterData.id);
        seedBatch.set(chapterRef, { 
            title: chapterData.title,
            studyMaterial: chapterData.studyMaterial
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

// Check if the script is being run directly
if (require.main === module) {
  seedDatabase();
}
