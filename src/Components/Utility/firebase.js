import firebase from "firebase/compat/app";
//auth
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmErviRi0WATds2kSP2FfoC6QqWcWaUv8",
  authDomain: "fir-2c2f1.firebaseapp.com",
  projectId: "fir-2c2f1",
  storageBucket: "fir-2c2f1.appspot.com",
  messagingSenderId: "108990923268",
  appId: "1:108990923268:web:65988b4641855378c0ab51",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db = app.firestore();