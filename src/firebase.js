import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPbbsHLT8ORFxZUDxyiCYXqnDIqCH1Km4",
  authDomain: "gamificacao-unicesumar.firebaseapp.com",
  projectId: "gamificacao-unicesumar",
  storageBucket: "gamificacao-unicesumar.appspot.com",
  messagingSenderId: "45527318799",
  appId: "1:45527318799:web:663da0b89dc41ba5bd7e7a",
  measurementId: "G-DZLZ5QZ5MX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)