import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6-98eo6vTkfAUscrIl73z-ggadqeBj2k",
  authDomain: "origin-store-e81b6.firebaseapp.com",
  projectId: "origin-store-e81b6",
  storageBucket: "origin-store-e81b6.firebasestorage.app",
  messagingSenderId: "949065050325",
  appId: "1:949065050325:web:ea9392ec7fbfb117925a5c",
  measurementId: "G-FJJQK1YM21",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

console.log("Firebase Connected");