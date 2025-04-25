// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcy7mNEuadGuVH90WDmLQERT3zZWJyMUU",
  authDomain: "frotaluzkabir.firebaseapp.com",
  projectId: "frotaluzkabir",
  storageBucket: "frotaluzkabir.appspot.com",
  messagingSenderId: "930755228396",
  appId: "1:930755228396:web:2d72b6215043d713352bc9",
  measurementId: "G-MGM6R7PJMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);