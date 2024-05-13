// Import the functions needed from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQWBD8AzoyaTgxLxG76LEZySALaVePCpo',
  authDomain: 'js-quiz-fiap.firebaseapp.com',
  projectId: 'js-quiz-fiap',
  storageBucket: 'js-quiz-fiap.appspot.com',
  messagingSenderId: '982866706469',
  appId: '1:982866706469:web:3ae7aa183a58a23ca4bfcc',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
