// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYQJ_4JmBy7ObYEjEuogEYCIqbngziQQY",
  authDomain: "smart-review-ef990.firebaseapp.com",
  projectId: "smart-review-ef990",
  storageBucket: "smart-review-ef990.firebasestorage.app",
  messagingSenderId: "12215569956",
  appId: "1:12215569956:web:c635c8c3a78f330ae092b1",
  measurementId: "G-C0DDN9XKTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
