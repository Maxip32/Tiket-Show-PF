import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore"; // Importa "getFirestore" desde firebase/firestore

const firebaseConfig = {
  apiKey: "AIzaSyBm2dwvSlacwlls_cQS7fLrwqnn4t0VB20",
  authDomain: "newproyect-e1d0d.firebaseapp.com",
  projectId: "newproyect-e1d0d",
  storageBucket: "newproyect-e1d0d.appspot.com",
  messagingSenderId: "220270807051",
  appId: "1:220270807051:web:e28d5aa0d92c7b207e9f0e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app); // Configura Firestore

export { auth, database, firestore  };







 