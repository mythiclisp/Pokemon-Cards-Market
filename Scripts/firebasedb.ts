import { forEach, indexOf } from 'lodash'
import {db} from './firebaseconfig'
import { handleErrs } from './firebaseauth'

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
}
