// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpSzTxBink2S4pi3nj-glYPNsOCzreWyw",
  authDomain: "chat-app-999db.firebaseapp.com",
  projectId: "chat-app-999db",
  storageBucket: "chat-app-999db.appspot.com",
  messagingSenderId: "563668402130",
  appId: "1:563668402130:web:feed7a5de97cd35f9f120b",
  measurementId: "G-C66LXZVCXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);