import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDH-wIZSQ51Gn51TcM8PeZeZ432XcTl87Q',
  authDomain: 'education-2255b.firebaseapp.com',
  projectId: 'education-2255b',
  storageBucket: 'education-2255b.firebasestorage.app',
  messagingSenderId: '1092811548494',
  appId: '1:1092811548494:web:eaa8d151302c4c8573a01f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);