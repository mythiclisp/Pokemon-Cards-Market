import { auth, db, functions, storage } from './firebaseconfig'
import { returnRates } from './currency'
import * as _ from 'lodash'
import getDate from './dates'
const Filter = require('bad-words')
const filter = new Filter()

export async function addPost(post) {
    const { id } = await db.collection("Posts").add(post)
    return id
}
let errStop = false

export function handleErrs(err: Object) {

    //Stops errors from accumulating
    errStop = true

    //Checks the type of error

    //Sign in Errors
    if (err.toLocaleString().includes('auth/email-already-in-use')) return 'Email is already in use'
    if (err.toLocaleString().includes('auth/invalid-email')) return 'Email adress is not valid'
    if (err.toLocaleString().includes('auth/operation-not-allowed')) return 'Server under maitenance currently'
    if (err.toLocaleString().includes('auth/weak-password')) return 'Password is not strong enough'

    //Log in Errors
    if (err.toLocaleString().includes('auth/invalid-email')) return 'Email adress is not valid'
    if (err.toLocaleString().includes('auth/user-disabled')) return 'This account has been disabled'
    if (err.toLocaleString().includes('auth/user-not-found')) return 'No user is registered under this email'
    if (err.toLocaleString().includes('auth/wrong-password')) return 'Password is incorrect'

    //Signout errors
    if (err.toLocaleString().includes('auth/invalid-user-token')) return 'User token is invalid'
    if (err.toLocaleString().includes('auth/user-token-expired')) return 'User token expired'
    if (err.toLocaleString().includes('auth/null-user')) return 'User is null'
    if (err.toLocaleString().includes('auth/tenant-id-mismatch')) return 'Tenant ID does not match'

    //Password reset email errors
    if (err.toLocaleString().includes('auth/invalid-email')) return 'Email adress is not valid'
    if (err.toLocaleString().includes('auth/missing-continue-uri')) return 'No continue URI was provided in the request'
    if (err.toLocaleString().includes('auth/invalid-continue-uri')) return 'URL in request is invalid'
    if (err.toLocaleString().includes('auth/unauthorized-continue-uri')) return 'The domain of the URL is not valid'
    if (err.toLocaleString().includes('auth/user-not-found')) return 'No user with corrosponding email adress'

    //General errors
    if (err.toLocaleString().includes('auth/too-many-requests')) return 'All requests blocked due to unusual activity detected from device'

    //If error is not recognizable
    else return 'Unknown error'
}

export function signUp(e: any) {

    if (errStop === true) return

    // Sign up form
    const signUpForm = e.target.parentNode

    //When submitted
    signUpForm.addEventListener('submit',(e: any) => {

        //Prevent page reload
        e.preventDefault()

        //Get credential values from form
        const displayName: string = signUpForm['signup-displayname'].value
        const email: string = signUpForm['signup-email'].value;
        const password: string = signUpForm['signup-password'].value;
        const currency: string = signUpForm['currency'].value.substring(0,3)

        //Upload PFP to firebase storage bucket
        const postImage = e.target.parentNode.children[2].children[3].children[0].files[0]
        const storageRef = storage.ref()
        const fileRef = storageRef.child(postImage.name)
        fileRef.put(postImage)
        let fileURL
        fileRef.getDownloadURL().then(res => {

            //Define file URL
            fileURL = res

            //Create user
            auth.createUserWithEmailAndPassword(email, password).then(response => {

                //Close the form and reset it's values
                const modal: HTMLElement = document.querySelector('#modal-signup');
                M.Modal.getInstance(modal).close();
                signUpForm.reset()

                db.collection('Users').doc(auth.currentUser.uid).set({
                    email: email,
                    password: password,
                    displayName: displayName,
                    currency: currency,
                    cart: [],
                    orders: [],
                    imageURL: fileURL
                })
                //Set the display name and PFP
                return response.user.updateProfile({

                    displayName: displayName,
                    photoURL: fileURL
                })
            }).catch(err => {

                M.toast({html: handleErrs(err)})
            })
        })
    })
}

export function logIn(e: any) {

    // Log in form
    const logInForm = e.target.parentNode

    //When submitted
    logInForm.addEventListener('submit',(e: any) => {
        e.preventDefault()

        //Get credential values from form
        const email: string = logInForm['login-email'].value
        const password: string = logInForm['login-password'].value

        //Log the user in with email and password
        auth.signInWithEmailAndPassword(email, password).then(() => {

            //Close the form and reset it's values
            const modal: HTMLElement = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            logInForm.reset();
        }).catch(err => {

            M.toast({html: handleErrs(err)})
        })
    })
}

//Create post
export const createPost = async (e: any) => {

    //Putting post image in storage bucket
    const postImage = e.target.parentNode['post-image'].files[0]
    const storageRef = storage.ref()
    const fileRef = storageRef.child(postImage.name)
    await fileRef.put(postImage)
    const fileURL = await fileRef.getDownloadURL()


    returnRates(auth.currentUser).then((response: any) => {

        const postHeader = e.target.parentNode['post-header'].value
        const postBody = e.target.parentNode['post-body'].value
        const postPrice = parseInt(e.target.parentNode['post-price'].value) / response.rate
        const condition = e.target.parentNode['condition'].value
        let postId

        let isProfane = false
        if (filter.isProfane(postHeader)) isProfane = true
        if (filter.isProfane(postBody)) isProfane = true
        if (filter.isProfane(condition)) isProfane = true

        if (isProfane === false) {

            addPost({
                description: postBody,
                header: postHeader,
                image: fileURL,
                price: postPrice,
                user: auth.currentUser.uid,
                userDisplayName: auth.currentUser.displayName,
                date: getDate(),
                createdAt: new Date(),
                condition: condition
            }).then((res) => {

                postId = res
                let userData

                const modal = document.querySelector('#modal-createpost');
                M.Modal.getInstance(modal).close();

                M.toast({html: 'Post succesfully created'})
            }).catch(() => {

                M.toast({html: 'Post could not be created'})
            })
        } else {
            M.toast({html:'Innapropriate language detected in post, please revise text'})
        }


    })
}

//Send password reset email
export const sendPasswordReset = (e: any) => {

    //Get the email
    const email = e.target.parentNode.children[0].children[0].value

    //Send password reset email
    auth.sendPasswordResetEmail(email).then(() => {

        M.toast({html: 'Email sent sucessfully'})
    }).catch(err => {
        M.toast({html: handleErrs(err)})
    })
}

//Change display name
export const changeDisplayName = (e: any) => {

    //Get proposed display name
    const proposedDisplayName = e.target.parentNode.children[1].value

    //Update display name
    auth.currentUser.updateProfile({

        displayName: proposedDisplayName
    }).then(() => {

        M.toast({html: 'Display name sucessfully changed'})
    }).catch(err => {
        M.toast({html: 'Error occured while changing display name'})
    })
}

//Change currency
export const changeCurrency = async (e: any) => {

    //Get proposed currency
    let proposedCurrency = e.target.parentNode.children[0].value
    if (proposedCurrency === undefined) proposedCurrency = e.target.parentNode.children[0].children[0].value
    proposedCurrency = proposedCurrency.substring(0,3)

    db.collection('Users').doc(auth.currentUser.uid).get().then(res => {

        let data = res.data()
        data.currency = proposedCurrency
        db.collection('Users').doc(auth.currentUser.uid).set(data)
    })

    M.toast({html: `Successfully changed currency to ${proposedCurrency}`})
}

export const addToCart = (postId) => {

    console.log(postId)

    postId = postId.replace('undefined','')

    db.collection('Users').doc(auth.currentUser.uid).get().then(doc => {

        const data = doc.data()

        if (data.cart.includes(postId)===false) {

            data.cart.push(postId)
            db.collection('Users').doc(auth.currentUser.uid).set(data)
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {

    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    var elems = document.querySelectorAll('.modal-elem');
    M.Modal.init(elems);

    M.AutoInit()
})

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('Users').doc(auth.currentUser.uid).get().then(data => {
            data = data.data()
            data.email = auth.currentUser.email
            data.displayName = auth.currentUser.displayName,
            data.currency = JSON.parse(window.localStorage.getItem(auth.currentUser.email)).currency
            data.imageURL = auth.currentUser.photoURL
            db.collection('Users').doc(auth.currentUser.uid).set(data)
        })
    }
})

export async function addImageToStorage(file) {

    //Putting post image in storage bucket
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    const fileURL = await fileRef.getDownloadURL()

    return fileURL
}

db.collection('Orders').get().then((res:object[]) => {

    res.forEach((order:any) => {

    })
})

export function reloadOrders() {


    db.collection("Orders").get().then(response => {

        response.forEach(order => {


            db.collection("Users").doc(order.data().userId).get().then(resolve2 => {

                let data = resolve2.data()

                if (data.orders.includes(order.id)===false) {

                    data.orders.push(order.id)
                }
            })
        })
    })
}