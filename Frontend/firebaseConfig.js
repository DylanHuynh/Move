import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword, } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh4uPg5eytjSoihqQcmrq_oA0XCnKGkDs",
  authDomain: "movecalhacks.firebaseapp.com",
  projectId: "movecalhacks",
  storageBucket: "movecalhacks.appspot.com",
  messagingSenderId: "797668500397",
  appId: "1:797668500397:web:8333dd768e7b094c84b724",
  measurementId: "G-J4S0YEC2M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth();
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' });

export default firebase;