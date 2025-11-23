import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB563DEO_7dg4Y7slujoL0YyEvBwn26m44",
  authDomain: "text-image-editor-app.firebaseapp.com",
  projectId: "text-image-editor-app",
  storageBucket: "text-image-editor-app.firebasestorage.app",
  messagingSenderId: "528977114166",
  appId: "1:528977114166:web:22f15b3b70128fe26a1497",
  measurementId: "G-PE2D2ZYL1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
