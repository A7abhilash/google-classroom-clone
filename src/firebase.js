import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();
export const database = {
  folders: (userId) =>
    firestore.collection("gd").doc(userId).collection("folders"),
  files: (userId) => firestore.collection("gd").doc(userId).collection("files"),
  classrooms: () => firestore.collection("gc-classrooms"),
  materials: () => firestore.collection("gc-materials"),
  assignments: () => firestore.collection("gc-assignments"),
  formatDocument: (doc) => ({ id: doc.id, ...doc.data() }),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const auth = app.auth();
export const storage = app.storage();
export default app;
