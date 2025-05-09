import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    initializeAuth,
    getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

// const app = initializeApp({
//     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID + ".firebaseapp.com",
//     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID + ".firebasestorage.app",
//     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
// });

const app = initializeApp({
  apiKey: "AIzaSyDK1qkt7Oj4Nc8Vr2i09W1vRs0ACPX2cc4",
  authDomain: "app-crud-trabalho-m1.firebaseapp.com",
  projectId: "app-crud-trabalho-m1",
  storageBucket: "app-crud-trabalho-m1.firebasestorage.app",
  messagingSenderId: "929401475630",
  appId: "1:929401475630:web:f0960777ae32c30cf045bf"
});

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    db
};