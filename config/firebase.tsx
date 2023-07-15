// firebase.tsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA4nCQ2rud5lUwBF0YtOfMWqPzh123ApmU",
    authDomain: "lista-de-jogos-appmasters.firebaseapp.com",
    projectId: "lista-de-jogos-appmasters",
    storageBucket: "lista-de-jogos-appmasters.appspot.com",
    messagingSenderId: "858151388903",
    appId: "1:858151388903:web:35e3da4d7083801c7dc442",
    measurementId: "G-EY3MYLJFGT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

