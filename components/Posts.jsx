import React, { useEffect, useState } from 'react'
import PostStyles from '../css/Posts.module.css'
import { getPosts } from '../Scripts/firebasedb.ts'
import { addPosts } from '../Scripts/firebasedb'

const Posts = () => {

    let [postsHTML] = useState([])

    useEffect(() => {
        console.log('reloaded')
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
        addPosts()
    })

    return (
        <React.Fragment>
            <ul className={`collapsible posts-container ${PostStyles.posts_container}`}>
                {postsHTML}
            </ul>
        </React.Fragment>
    )
}

export default Posts

