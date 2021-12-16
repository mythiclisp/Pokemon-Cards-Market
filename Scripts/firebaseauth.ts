import { auth, db } from './firebaseconfig'
import * as _ from 'lodash'

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

        auth.createUserWithEmailAndPassword(email, password).then(response => {

            //Close the form and reset it's values
            const modal: HTMLElement = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset()

            //Set the display name
            return response.user.updateProfile({

                displayName: displayName
            })
        }).catch(err => {

            M.toast({html: handleErrs(err)})
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
export const createPost = (e: any) => {
    const postHeader = e.target.parentNode['post-header'].value
    const postBody = e.target.parentNode['post-body'].value
    const postPrice = e.target.parentNode['post-price'].value

    db.collection('Posts').add({
        description: postBody,
        header: postHeader,
        image: 'image url',
        price: postPrice,
        user: 'mythiclisp'
    }).then(() => {

        const modal = document.querySelector('#modal-createpost');
        M.Modal.getInstance(modal).close();

        M.toast({html: 'Post succesfully created'})
    }).catch(() => {

        M.toast({html: 'Post could not be created'})
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

document.addEventListener('DOMContentLoaded', () => {

    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    M.AutoInit()

    //Onclick for signout button
    document.querySelector('.logout-btn').addEventListener('click', () => {
        
        auth.signOut().then(() => {

        }).catch(err => {
            handleErrs(err)
        })
    })
})

