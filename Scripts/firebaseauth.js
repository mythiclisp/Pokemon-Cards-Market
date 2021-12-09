import { auth } from './firebaseconfig.js'

export function signUp(e) {

    // Sign up form
    const signUpForm = e.target.parentNode
    console.log(signUpForm)

    //When submitted
    signUpForm.addEventListener('submit',e => {

        //Prevent page reload
        e.preventDefault()

        //Get credentials in form
        //Get credential values from form
        const email = signUpForm['signup-email'].value;
        const password = signUpForm['signup-password'].value;

        auth.createUserWithEmailAndPassword(email,password).then(response => {

            //Close the form and reset it's values
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
        }).catch(err => {
            alert(err)
        })

    })
}

auth.onAuthStateChanged(user => {
    console.log(user ? `User detected: ${user.email}` : 'User not detected')
})

export function logIn(e) {

    // Log in form 
    const logInForm = e.target.parentNode

    //When submitted
    logInForm.addEventListener('submit',e => {
        e.preventDefault()

        //Get credential values from form
        const email = logInForm['login-email'].value
        const password = logInForm['login-password'].value

        //Log the user in with email and password
        auth.signInWithEmailAndPassword(email, password).then(cred => {
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            logInForm.reset();
        });
    })
}


export function signOut() {

    //Log user out
    auth.signOut()
}