import { auth } from './firebaseconfig.js'


//Sign up form
const signUpForm = document.querySelector('#signup-form')

//When submitted
signUpForm.addEventListener('submit',e => {

    //Prevent page reload
    e.preventDefault()

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

auth.onAuthStateChanged(user => {
    if (user) { return  console.log(user.email)}
    console.log('No user')
}) 

//Log out button
const logOutBtn = document.querySelector('.logout-btn')

//When clicked
logOutBtn.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut()
})
