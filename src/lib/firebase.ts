import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  projectId: "quizcraft-ai-5eed9",
  appId: "1:1005953144574:web:1b49be1ef517aa871fb7af",
  storageBucket: "quizcraft-ai-5eed9.firebasestorage.app",
  apiKey: "AIzaSyAuQ942foT3ip7ZdFLy3nw-wsvOA0BAWqA",
  authDomain: "quizcraft-ai-5eed9.firebaseapp.com",
  messagingSenderId: "1005953144574"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
