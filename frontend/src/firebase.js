// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
getAuth
import { getStorage } from "firebase/storage";
getStorage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-qvik.firebaseapp.com",
  projectId: "mern-qvik",
  storageBucket: "mern-qvik.appspot.com",
  messagingSenderId: "653379485032",
  appId: "1:653379485032:web:5ca42fe5e070f142c72add"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);