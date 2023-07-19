// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2pIiZ7_KacFopiy4jmag_Hh9tYyXvZn0",
  authDomain: "filterpixel-image-gallery.firebaseapp.com",
  projectId: "filterpixel-image-gallery",
  storageBucket: "filterpixel-image-gallery.appspot.com",
  messagingSenderId: "914819044444",
  appId: "1:914819044444:web:60fcd34d855bce40c3c299",
  measurementId: "G-B3YV5303GT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
