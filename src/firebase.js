import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// IMPORTANT: DO NOT hardcode Firebase credentials in this file!
// Use environment variables instead to keep them secure.
// Add them in a `.env` file and make sure `.env` is in your `.gitignore` file.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Stored securely in .env
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore for database operations
export const db = getFirestore(app);

// Auth for user authentication
export const auth = getAuth(app);

export default app;

// REMEMBER: Never push your .env file to GitHub!
// Your API keys should always be kept private.
