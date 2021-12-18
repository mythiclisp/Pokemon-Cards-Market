import * as currenciesJSON from './currencies.json'
import { auth } from './firebaseconfig'

export default async function getRates(currency:string) {

    if (currency === 'USD') return {
        rate: 1,
        symbol: '$'
    }

    const req = new XMLHttpRequest()
    req.open('GET', 'http://www.floatrates.com/daily/usd.json')

    return new Promise ((resolve, reject) => {
        req.send()

        req.onload = function() {


            const data = JSON.parse(req.responseText)
            const rate = data[currency.toString().toLowerCase()].rate
            const symbol = currenciesJSON[currency].symbol
            const symbolData = {
                rate: rate,
                symbol: symbol
            }
            resolve(symbolData)
        }
    })
}
export async function returnRates() {

    return new Promise ((resolve, reject) => {
        const currentCurency = JSON.parse(window.localStorage.getItem(auth.currentUser.email)).currency
        getRates(currentCurency).then(JSON => {
            resolve(JSON)
        })
    })
}
