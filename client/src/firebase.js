// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-40d1c.firebaseapp.com",
  projectId: "mern-estate-40d1c",
  storageBucket: "mern-estate-40d1c.firebasestorage.app",
  messagingSenderId: "117395518029",
  appId: "1:117395518029:web:ac41f4405e00d09176a204"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);