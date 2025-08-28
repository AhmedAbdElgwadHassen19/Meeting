// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeting-38477.firebaseapp.com",
  projectId: "meeting-38477",
  storageBucket: "meeting-38477.firebasestorage.app",
  messagingSenderId: "729616779382",
  appId: "1:729616779382:web:be22ac3c114a354262b757",
  measurementId: "G-21E4WCV1GE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);