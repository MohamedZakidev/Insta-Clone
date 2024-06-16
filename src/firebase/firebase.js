import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDTPtof_gLMRs8vCMH8177qlJ0XjjKQRl0",
    authDomain: "instagram-clone-dd5cc.firebaseapp.com",
    projectId: "instagram-clone-dd5cc",
    storageBucket: "instagram-clone-dd5cc.appspot.com",
    messagingSenderId: "326275073712",
    appId: "1:326275073712:web:45b809c116f83773045d75"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, auth, firestore, storage }