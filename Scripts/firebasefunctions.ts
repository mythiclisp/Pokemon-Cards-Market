import { functions } from './firebaseconfig'

const createStripeCheckout = functions.httpsCallable('createStripeCheckout')
export const stripe:any = Stripe('stripe secret key')

export function createCheckout() {

    createStripeCheckout().then((res:any) => {

        const sessionId = res.data.id
        console.log(res.data)
        stripe.redirectToCheckout({ sessionId: sessionId })
    }).catch(err => {
        console.log(err)
    })
}

export function createCheckoutWithData(data) {

    createStripeCheckout(data).then((res:any) => {

        const sessionId = res.data.id
        console.log(res.data)
        stripe.redirectToCheckout({ sessionId: sessionId })
    }).catch(err => {
        console.log(err)
    })
}