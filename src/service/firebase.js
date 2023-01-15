import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { initializeApp } from "firebase/app";
import {getDatabase,ref} from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyANX3kRoPTahulaXYe1XuG77BgIXrtxUhY",
  authDomain: "react9v3.firebaseapp.com",
  projectId: "react9v3",
  storageBucket: "react9v3.appspot.com",
  messagingSenderId: "1086177053602",
  appId: "1:1086177053602:web:830a3d4e6cc7fb4b46c0fb",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

export const signUp = async (email, password) => 
  await createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signIn = async (email, password) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

  export const logOut = async () => 
await signOut(firebaseAuth);

const db = getDatabase(app)

export const userRef =ref(db, 'user')
export const messagesRef = ref(db, "messages");

export const getChatById=(chatId)=>ref(db, `messages/${chatId}`)

export const getMessageListById=(chatId)=>ref(db, `messages/${chatId}/messagesList`)