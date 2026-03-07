"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
import { GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '@/firebase.json'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);


export const storage = getStorage(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const gmailProvider = new GoogleAuthProvider();
export default app