import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYibUrUuplIi2SzD8muaAgSjCLZ-2Uzok",
  authDomain: "whats-app-clone-bd3a0.firebaseapp.com",
  databaseURL: "https://whats-app-clone-bd3a0.firebaseio.com",
  projectId: "whats-app-clone-bd3a0",
  storageBucket: "whats-app-clone-bd3a0.appspot.com",
  messagingSenderId: "1043143620444",
  appId: "1:1043143620444:web:d2b8b23fa7141eb718f399",
  measurementId: "G-HZSXZQSZLC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
