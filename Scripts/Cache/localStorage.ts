import { auth, db } from "../firebaseconfig";

export default async function setLocalStorage(e: any) {

    const currentUser = await auth.currentUser.uid

    const userCurrencyCreds = {
        currency: ""
    }

    //Get Database values
    const userRef = db.collection('Users').doc(currentUser);
    const doc = await userRef.get();

    //Set values of JSON and return
    userCurrencyCreds.currency = await doc.data().currency

    const JSONData =  userCurrencyCreds

    //Set localStorage to db values
    window.localStorage.setItem(auth.currentUser.email, JSON.stringify(JSONData))

}
