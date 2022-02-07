import { functions } from './firebaseconfig'

const createStripeCheckout = functions.httpsCallable('createStripeCheckout')
export const stripe:any = Stripe('pk_test_51K6oGfCM9K7H85bbJHqS1P2kMNlNhf76hfYw7MHc1MKkia0iv71WkFlPedoqJ5zCfDxTAYHvWz2urGYHmLMGihxl004wbXKgRp')

export function createCheckout() {

    createStripeCheckout().then((res:any) => {

        const sessionId = res.data.id
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