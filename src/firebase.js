import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClSnebvF4z7bs0SPm7HGm_MaqVfvVetAQ",
  authDomain: "stockwizardlast.firebaseapp.com",
  projectId: "stockwizardlast",
  storageBucket: "stockwizardlast.firebasestorage.app",
  messagingSenderId: "699105853763",
  appId: "1:699105853763:web:f92f4287c07264721a6ff6",
  measurementId: "G-H18K0Y86EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 