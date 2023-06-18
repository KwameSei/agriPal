// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl1PF-2x09uls7o1lqavEv6lLsrerxPSI",
  authDomain: "whatsapp-ghana.firebaseapp.com",
  projectId: "whatsapp-ghana",
  storageBucket: "whatsapp-ghana.appspot.com",
  messagingSenderId: "22814854775",
  appId: "1:22814854775:web:a04f09e87e7e7c6cdd8072",
  measurementId: "G-D16TNKHFKW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const storage = getStorage();
