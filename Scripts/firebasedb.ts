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
                data.posts = ''
                db.collection('Users').doc(doc.id).set(data)
            }
        })
    })
}

export async function deletePost(postId, userId) {

    db.collection('Users').doc(userId).get().then(res => {

        let data = res.data()
        data.posts = data.posts.replace(`,${postId}`, '')
        db.collection('Users').doc(userId).set(data)
    })
    db.collection('Posts').doc(postId).delete()
}

auth.onAuthStateChanged(user => {
   
})

async function addTemplatePosts(user) {

    let data = {
        date: getDate(),
        description: 'Post body',
        header: 'Post header',
        image: 'https://firebasestorage.googleapis.com/v0/b/pokemon-cards-market.appspot.com/o/wp2356164-gym-workout-wallpapers.jpg?alt=media&token=d466efaf-65f3-4b0f-a75f-27aa7d608f80',
        price: '1000',
        user: user.uid
    }
    addPost(data).then((res) => {

        const postId = res
        let userData

        db.collection('Users').doc(auth.currentUser.uid).get().then(data => {

            userData = data.data()
            userData.posts += `,${postId}`
            db.collection('Users').doc(auth.currentUser.uid).set(userData)
        })
    })
}