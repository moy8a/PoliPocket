import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "polipocket-66e35.firebaseapp.com",
  projectId: "polipocket-66e35",
  storageBucket: "polipocket-66e35.firebasestorage.app",
  messagingSenderId: "1095082591054",
  appId: "1:1095082591054:web:52b1d05e04bc60f3d0541f",
  measurementId: "G-F6PCC5VQG5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);