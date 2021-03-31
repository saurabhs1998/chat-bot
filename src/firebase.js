import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCIJFuakOCL873QpUpfphg_5FvnkJPSRHU",
  authDomain: "chat-bot-db.firebaseapp.com",
  projectId: "chat-bot-db",
  storageBucket: "chat-bot-db.appspot.com",
  messagingSenderId: "661450083798",
  appId: "1:661450083798:web:c02535f490123997bf2877",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
