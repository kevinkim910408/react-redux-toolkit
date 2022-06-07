import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAiRbdImZOcrAdbxG80rd2BzYDs2qS7CXI",
    authDomain: "potatogram-b14d3.firebaseapp.com",
    projectId: "potatogram-b14d3",
    storageBucket: "potatogram-b14d3.appspot.com",
    messagingSenderId: "433554661019",
    appId: "1:433554661019:web:9c137007e717cbff56b03e",
    measurementId: "G-84HZYYFLK0"
};

const app = initializeApp(firebaseConfig);

// for 인증
export const auth = getAuth();
// for db
export const db = getFirestore(app);
// for images 
export const storage = getStorage();
export default app;