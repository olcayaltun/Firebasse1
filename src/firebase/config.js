// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAC7hesnyZpO7S7uG187uzhg-umrYLhFyw",
  authDomain: "chat-c0cb9.firebaseapp.com",
  projectId: "chat-c0cb9",
  storageBucket: "chat-c0cb9.appspot.com",
  messagingSenderId: "103029503086",
  appId: "1:103029503086:web:3ba57d725bab2bc21e627f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider1 = new GoogleAuthProvider();

export const db = getFirestore(app);
