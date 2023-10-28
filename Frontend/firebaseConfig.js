import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// GoogleSignin.configure({
//     webClientId: '797668500397-j6u9050o3ahviks4kkbl983ej201rn6o.apps.googleusercontent.com',
//     offlineAccess: true,
// })

export const signInWithGoogle = () => (
    createUserWithEmailAndPassword(auth, "bob@gmail.com", "urmommmmmm")
        .then((userCredential) => {
          // Signed up
          console.log("user created!")
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          // ..
    }));

    // signInWithPopup(auth, provider)
    //     .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //     })
    // );

export default firebase;