import React, { useEffect, useState } from 'react'
import PostStyles from '../css/Posts.module.css'
import { returnPostsHTML } from '../Scripts/firebasedb.tsx'
import { useRoutes } from 'react-router'

const Posts = () => {

    let [postsHTML, setPostsHTML] = useState([])

    function startInterval() {
        setInterval(() => {

            console.log('Hi')
        
            setPostsHTML(postsHTML = '')
        },1000)
    }

    startInterval()

    useEffect(() => {
        console.log('reloaded')
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
        addPosts()
    })

    function addPosts() {


        returnPostsHTML.then(response => {

            document.querySelector('.posts-container').innerHTML = ''
    
            response.forEach(post => {
                
                document.querySelector('.posts-container').innerHTML += `
                <li>
                    <div class="collapsible-header">${post.data().header}</div>
                    <div class="collapsible-body">${post.data().description}</div>
                </li>
                `
            });
    
        })
    }

    return (
        <React.Fragment>
            <ul className="collapsible posts-container">
                {postsHTML}
            </ul>
        </React.Fragment>
    )
}

export default Posts

