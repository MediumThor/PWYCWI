import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBSEz2YuEdqZCaef9Oknc150dRl5qkpZME",
    authDomain: "pwyc-628af.firebaseapp.com",
    projectId: "pwyc-628af",
    storageBucket: "pwyc-628af.appspot.com",
    messagingSenderId: "82885299164",
    appId: "1:82885299164:web:b7ab4bb8110474839add19",
    measurementId: "G-V3R5EK01NC"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Existing exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// New: Firebase Functions
export const functions = firebase.functions();

// New: Google Auth Provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// New: Firestore FieldValue
export const FieldValue = firebase.firestore.FieldValue;
// Initialize Storage
const storage = firebase.storage();

export { storage, firebase as default };

