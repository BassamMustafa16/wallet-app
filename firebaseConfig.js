// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Dq5TexCLuRBokMbIRjmcqua0UrHxa9g",
  authDomain: "wallet-app-a0acb.firebaseapp.com",
  projectId: "wallet-app-a0acb",
  storageBucket: "wallet-app-a0acb.firebasestorage.app",
  messagingSenderId: "562563398317",
  appId: "1:562563398317:web:97209ed829dee7cca86424",
  measurementId: "G-XQWEDN78YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);