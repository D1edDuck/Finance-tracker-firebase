import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-CSc2q3LBsFmfIUFmhoxLp3GXc4k_pME",
  authDomain: "follow-finance.firebaseapp.com",
  projectId: "follow-finance",
  storageBucket: "follow-finance.firebasestorage.app",
  messagingSenderId: "1061562923227",
  appId: "1:1061562923227:web:802698e4be8e53911db4fe",
  measurementId: "G-8C7ZL0BRSE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.error("Error Google:", error);
      throw error;
    });
};

export { app, analytics, db, auth };
