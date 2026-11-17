import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsoSRP5AWzcqU92U9VjdYk6eog30Cg0N8",
  authDomain: "catalogo-cosmeticos-7f63a.firebaseapp.com",
  projectId: "catalogo-cosmeticos-7f63a",
  storageBucket: "catalogo-cosmeticos-7f63a.firebasestorage.app",
  messagingSenderId: "131542229902",
  appId: "1:131542229902:web:14a3937254028d329dbadf",
  measurementId: "G-4YY2ZVLN3J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
