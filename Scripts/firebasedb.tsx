import { forEach } from 'lodash'
import {db} from './firebaseconfig'

export const returnPostsHTML = new Promise((resolve,reject) => {
    const postsList = []

    db.collection('Posts').get().then(posts => {
        
        posts.forEach(post => {

            if (post.id != 'Initial') postsList.push(post)
        })

        resolve(postsList)
    }) 
})


