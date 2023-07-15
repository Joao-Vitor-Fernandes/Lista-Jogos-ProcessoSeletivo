// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4nCQ2rud5lUwBF0YtOfMWqPzh123ApmU",
  authDomain: "lista-de-jogos-appmasters.firebaseapp.com",
  projectId: "lista-de-jogos-appmasters",
  storageBucket: "lista-de-jogos-appmasters.appspot.com",
  messagingSenderId: "858151388903",
  appId: "1:858151388903:web:35e3da4d7083801c7dc442",
  measurementId: "G-EY3MYLJFGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);