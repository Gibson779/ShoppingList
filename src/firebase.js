import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB__2rA8Hsl4M9ORycpkD8S_ovfUTDyP1E",
  authDomain: "shopping-list-95e28.firebaseapp.com",
  projectId: "shopping-list-95e28",
  storageBucket: "shopping-list-95e28.firebasestorage.app",
  messagingSenderId: "524625938982",
  appId: "1:524625938982:web:7fcb8d37bd5135d944b4e7",
  measurementId: "G-BCN4KW1BBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);