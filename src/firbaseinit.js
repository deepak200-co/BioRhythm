import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBNY2zoZXX7qwRcOf2LDhZvow39lRmYUfY",
  authDomain: "biorhythm-25794.firebaseapp.com",
  projectId: "biorhythm-25794",
  storageBucket: "biorhythm-25794.appspot.com",
  messagingSenderId: "1018434840923",
  appId: "1:1018434840923:web:b18b5cb219f9cc4e22d27e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;