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

export async function addPosts() {

    new Promise((resolve, reject) => {

        getPosts(resolve, reject)

    }).then((response: any) => {

        document.querySelectorAll('.posts-container').forEach(postContainer => {

            postContainer.innerHTML = ''
        })


        response.forEach((post: any) => {

            const postContainers: NodeListOf<Element> = document.querySelectorAll('.posts-container')
            postContainers.forEach((postContainer: HTMLElement) => {
                
                loadHTML(postContainer, post)
            })
        });

    })
}

function loadHTML(postContainer: any, post: any) {

    postContainer.innerHTML += `
    <li class='collapsible-item'>
        <div class="collapsible-header">${post.data().header}</div>
        <div class="collapsible-body">${post.data().description}</div>
    </li>
    `
}

export async function deletePosts() {

    db.collection('Posts').get().then(posts => {

        posts.forEach(post => {

            if (post.id != 'Initial') {

                db.collection('Posts').doc(post.id).delete()
            }

            M.toast({html: 'Deleted all posts'})

            addPosts()
        })

    }).catch(err => {
        M.toast({html: handleErrs(err)})
    })
}
