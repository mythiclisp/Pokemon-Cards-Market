import { forEach, indexOf } from 'lodash'
import {db,auth} from './firebaseconfig'
import { handleErrs, addPost } from './firebaseauth'
import getDate from './dates'

export const getPosts = (resolve: Function, reject: Function) => {
    const postsList = []

    db.collection('Posts').get().then(posts => {

        posts.forEach(post => {

            if (post.id != 'Initial') postsList.push(post)
        })

        resolve(postsList)
    })
}

export async function deletePosts() {

    db.collection('Posts').get().then(posts => {

        posts.forEach(post => {

            if (post.id != 'Initial') {

                db.collection('Posts').doc(post.id).delete()
            }

            M.toast({html: 'Deleted all posts'})

        })

    }).catch(err => {
        M.toast({html: handleErrs(err)})
    })


    db.collection('Users').get().then(docs => {

        docs.forEach(doc => {

            if(doc.id != 'initial') {
                let data = doc.data()
                data.cart = []
                db.collection('Users').doc(doc.id).set(data)
            }
        })
    })
}

export async function deletePost(postId, userId) {

    //Delete post from posts collection
    db.collection('Posts').doc(postId).delete()

    //Refrence to user collection
    let usersRef = db.collection('Users')

    //Query results to delete from cart
    let cartQuery = usersRef.where('cart', 'array-contains-any', [postId])
    cartQuery.get().then(users => {
        users.forEach(user => {
            let data = user.data()
            data.cart.splice(data.cart.indexOf(postId), 1)
            db.collection('Users').doc(user.id).set(data)
        })
    })

}

auth.onAuthStateChanged(user => {

})

export async function addTemplatePosts(user) {

    let data = [
        {
            createdAt: new Date(),
            date: getDate(),
            description: 'Insert body',
            header: 'Charizard from 1999, mint condition and good price',
            image: 'https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/charizard_cropped.jpg?alt=media&token=63e69398-e13b-4fa2-96ae-11dee91f2827',
            price: '250',
            user: user.uid,
            userDisplayName: user.displayName,
            condition: 'Mint condition'
        }, {
            createdAt: new Date(),
            date: getDate(),
            description: 'Insert body',
            header: 'Blastoise GX - 35/214 - Near Mint - Pokemon Unbroken Bonds - Ultra Rare.',
            image: 'https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/1485323.jpeg?alt=media&token=8420ef94-e458-4a45-aad0-95c0bb949baf',
            price: '11250',
            user: user.uid,
            userDisplayName: user.displayName,
            condition: 'Near mint'
        }, {
            createdAt: new Date(),
            date: getDate(),
            description: 'Insert body',
            header: 'Venusaur 15/102 PSA 9 Base Set Holo Pokemon Card. Condition is "Used". Shipped with USPS First Class.',
            image: 'https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/SWSH35_EN_1.png?alt=media&token=a86ae1d3-014b-42f9-8150-a5e42fd541bb',
            price: '3250',
            user: user.uid,
            userDisplayName: user.displayName,
            condition: 'Used'
        }, {
            createdAt: new Date(),
            date: getDate(),
            description: 'Insert body',
            header: 'Rayquaza GX - 160/168 - Pokemon - Full Art - Ultra Rare - Sun & Moon - LP.',
            image: 'https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/SM7_EN_177.png?alt=media&token=ace6da96-69e7-4421-9e67-c4d916d701a9',
            price: '1250',
            user: user.uid,
            userDisplayName: user.displayName,
            condition: 'Used'
        },
    ]
    for (let i=0;i<4;i++) {
        addPost(data[i]).then((res) => {

            const postId = res
            let userData

            db.collection('Users').doc(auth.currentUser.uid).get().then(data => {

                userData = data.data()
                userData.posts += `,${postId}`
                db.collection('Users').doc(auth.currentUser.uid).set(userData)
            })
        })

    }
}

export function getCart(user) {

    return new Promise ((resolve, rej) => {

        let postsList = []
        let postDataList = []

        //Get user firestore document
        db.collection('Users').doc(user.uid).get().then(res => {

            //For each item in cart
            res.data().cart.forEach(cartItem => {

                postsList.push(cartItem)
            })

            //Loop through
            for (let i=0;i<postsList.length;i++) {

                let postId = res.data().cart[i]

                db.collection('Posts').doc(postId).get().then(res => {

                    if (res.exists) {

                        let data = res.data()
                        Object.assign(data, {id: res.id});
                        postDataList.push(data)

                        if(i+1===postsList.length) {

                            resolve(postDataList)
                        }
                    } else {

                        deleteCartItem(i, user)
                    }
                })
            }
        })
    })
}

export function getOrders(uid) {

    return new Promise((resolve, reject) => {

        let ordersList = []
        let postsList = [[],[[],[]]]

        db.collection("Users").doc(uid).get().then(res => {

            res.data().orders.forEach(order => {

                ordersList.push(order)
            })

            for (let x=0;x<ordersList.length;x++) {

                postsList[0].push([])

                let order = ordersList[x]

                db.collection("Orders").doc(order).get().then(res => {

                    let postIdsList = res.data().posts
                     postsList[1][0].push(res.data().status)

                    for (let i=0;i<postIdsList.length;i++) {

                        let postId = postIdsList[i]

                        db.collection("Posts").doc(postId ? postId : 'akJyoW0U9TwAIrIAJLza').get().then(res => {

                            console.log(postId)

                            let data = res.data() ? res.data() :
                            {
                                bought: false,
                                condition: "Deleted",
                                description: "Deleted",
                                header: "Deleted",
                                id: "oBSGvtOWAk19hpfwPLX0",
                                image: "https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/Untitled.png?alt=media&token=96124d0a-83c0-4923-b714-6900ab1faebd",
                                price: 0,
                                user: "gC3BRlhPeCYTLP04C1MSoepVENj2",
                                userDisplayName: "Pristine 10",
                            }
                            data.id = postId
                            postsList[0][x].push(data)

                            if (i>=postIdsList.length-1 && x>=ordersList.length-1) {

                                for (let i=0;i<postsList[0].length;i++) {

                                    let orderPrice = 0

                                    for (let x=0;x<postsList[0][i].length;x++) {

                                        orderPrice += postsList[0][i][x].price
                                    }

                                    postsList[1][1].push(orderPrice)
                                }

                                postsList[0] = postsList[0].reverse()
                                resolve(postsList)
                            }
                        })
                    }
                })
            }
        })
    })
}

export function deleteCartItem(index, user) {

    db.collection('Users').doc(user.uid).get().then(res => {

        let data = res.data()
        data.cart.splice(index, 1)

        db.collection('Users').doc(user.uid).set(data)
    })
}

db.collection("Posts").get().then(res => {

    res.forEach(post => {

        let data = post.data()
        Object.assign(data, {bought: false})

        db.collection("Posts").doc(post.id).set(data)
    })
})

db.collection("Posts").get().then(res => {

    res.forEach(post => {

        const data = post.data()
        Object.assign(data, {views: 0})

        db.collection("Posts").doc(post.id).set(data)
    })
})