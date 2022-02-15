import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/functions'
import 'firebase/compat/storage'

firebase.initializeApp({
  apiKey: "AIzaSyA2t0HMueSTrkF3KYcRcJoZVQsdqYwVwDE",
  authDomain: "pokemon-cards-market.firebaseapp.com",
  projectId: "pokemon-cards-market",
  storageBucket: "pokemon-cards-market.appspot.com",
  messagingSenderId: "35885252296",
  appId: "1:35885252296:web:9e488e3cbfa77780c42ffd",
  measurementId: "G-KP98M0KWZB"
})

interface docReturn {

  data(): any,
  id: string,
  exists: boolean,
}

interface collectionReturn {

  docs: object,
  exists: boolean,
  metadata: string,
  query: string,
  size: number,
  forEach(index),
}

interface firebaseDb {
  collection(collectionPath: string): {

    doc(docPath: string): {

      get():Promise<docReturn>,
      set(data),
      delete(),
    },

    get():Promise<collectionReturn>
    add(data),
    where(arg1:any, operand:string, arg2:any),
    orderBy(arg1:string, order:string)
  }
}



export const auth: any = firebase.auth()
// @ts-ignore
export const db: firebaseDb = firebase.firestore()
db.collection('Posts').get().then(res => {

  console.log(res)
})
export const functions: any = firebase.functions()
export const storage: any = firebase.storage()


functions.useEmulator("localhost", 5001);
