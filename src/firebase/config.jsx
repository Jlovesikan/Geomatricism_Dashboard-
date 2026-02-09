import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCa5j7ccZHxQSQIVcZ4Cp-JCyDDxq93-NQ",
  authDomain: "geomatricim.firebaseapp.com",
  projectId: "geomatricim",
  storageBucket: "geomatricim.firebasestorage.app",
  messagingSenderId: "123284971975",
  appId: "1:123284971975:web:3b76468b5f3760c39379e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);