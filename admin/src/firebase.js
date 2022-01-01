// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDZs3o1KgOfC0tgZCkbsH8vtO1e0Xu0yUE',
    authDomain: 'movieapp-67f5f.firebaseapp.com',
    projectId: 'movieapp-67f5f',
    storageBucket: 'movieapp-67f5f.appspot.com',
    messagingSenderId: '359304303748',
    appId: '1:359304303748:web:53958e1c3c907bbb811ed1',
    measurementId: 'G-GQGVNJ6Y73',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
