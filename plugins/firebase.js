// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2hHRl4ca3KBS_HjuQA-8IKRgvV0cnIZQ",
  authDomain: "test2-c116e.firebaseapp.com",
  projectId: "test2-c116e",
  storageBucket: "test2-c116e.appspot.com",
  messagingSenderId: "189615046917",
  appId: "1:189615046917:web:f3d40769e44db689e9b76c",
  measurementId: "G-X2LJPX797D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);