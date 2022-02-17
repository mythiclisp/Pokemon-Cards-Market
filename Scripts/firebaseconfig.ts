import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
import { firebaseAuth } from './Types/auth'
import { firebaseDb } from './Types/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyA2t0HMueSTrkF3KYcRcJoZVQsdqYwVwDE",
  authDomain: "pokemon-cards-market.firebaseapp.com",
  projectId: "pokemon-cards-market",
  storageBucket: "pokemon-cards-market.appspot.com",
  messagingSenderId: "35885252296",
  appId: "1:35885252296:web:9e488e3cbfa77780c42ffd",
  measurementId: "G-KP98M0KWZB"
})

export const auth:firebaseAuth = firebase.auth()
// @ts-ignore
export const db: firebaseDb = firebase.firestore()
export const functions: any = firebase.functions()
export const storage: any = firebase.storage()
