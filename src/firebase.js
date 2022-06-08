import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAN_Vg47foifJURdbaAVwFCAqW5Xp--pxM",
    authDomain: "test-db-2d66d.firebaseapp.com",
    projectId: "test-db-2d66d",
    storageBucket: "test-db-2d66d.appspot.com",
    messagingSenderId: "326088127378",
    appId: "1:326088127378:web:c8adfc6ffbfebaeee8474b",
    measurementId: "G-F32SD3Y4Y7"
  };


// const firebaseConfig = {
//     apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOMAIN,
//     projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.MESSAGINSENDERID,
//     appId: process.env.APPID,
//     measurementId: process.env.MEASUREMENTID
// };

const app = initializeApp(firebaseConfig);

// for 인증
export const auth = getAuth();
// for db
export const db = getFirestore(app);
// for images 
export const storage = getStorage();
export default app;