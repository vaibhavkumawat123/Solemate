// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAJcH_YG8nlT9AsbDp07EosXfNIuObpwI",
  authDomain: "solemate-30ffb.firebaseapp.com",
  projectId: "solemate-30ffb",
  storageBucket: "solemate-30ffb.firebasestorage.app",
  messagingSenderId: "106836547408",
  appId: "1:106836547408:web:1500976f1ffe4d6f9dbe55",
  measurementId: "G-6F7F1W533Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();