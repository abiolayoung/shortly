import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyDofJCA0NQY6424VH6VDak0EIOEUwaZbN0",
  authDomain: "linkzip-bddb1.firebaseapp.com",
  projectId: "linkzip-bddb1",
  storageBucket: "linkzip-bddb1.appspot.com",
  messagingSenderId: "236030609520",
  appId: "1:236030609520:web:43a9a88eb5280bd2b30cb5",
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

if (process.env.NODE_ENV === "development"){
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
}


export { app, firestore, auth };
