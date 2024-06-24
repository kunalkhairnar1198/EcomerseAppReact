// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAjfWB_cDCSuv9dRf8FcJ-NEJfnBdE27U",
  authDomain: "e-comersereact.firebaseapp.com",
  projectId: "e-comersereact",
  storageBucket: "e-comersereact.appspot.com",
  messagingSenderId: "673291775069",
  appId: "1:673291775069:web:4003e557107351b28fb1b4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

// console.log(auth)

export {fireDB, auth}