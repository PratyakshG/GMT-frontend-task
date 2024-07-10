// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxVYwe8JnPmBkYAHLBFFkNJTcdhj4lKlg",
  authDomain: "gmt-frontend-task.firebaseapp.com",
  projectId: "gmt-frontend-task",
  storageBucket: "gmt-frontend-task.appspot.com",
  messagingSenderId: "947323793627",
  appId: "1:947323793627:web:193f3a3d219988e6369cfe",
  measurementId: "G-2EMQ3GE5Q4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
// export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
