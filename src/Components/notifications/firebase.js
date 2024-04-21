// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcVZwRwhcV50n0MozxYRyCHuzXBMtisCg",
  authDomain: "creddit-by-ss-ltd.firebaseapp.com",
  projectId: "creddit-by-ss-ltd",
  storageBucket: "creddit-by-ss-ltd.appspot.com",
  messagingSenderId: "737898149215",
  appId: "1:737898149215:web:71912c46eac7dd78d5f2ea",
  measurementId: "G-Z500NQX36P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize messaging
const messaging = getMessaging(app);

export default messaging;
