import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Posts from "../../components/Posts"
import { db } from "../../Scripts/firebaseconfig"
const stringSimilarity = require('string-similarity')

export default function Home() {

    const { query }:any = useRouter()
    const [posts, setPosts] = useState(null)

    async function getPosts() {

        const postsRef = await db.collection("Posts").get()
        const postHeaders:any = postsRef.docs.map(post =>
            ({
                data: [Object.assign(post.data(), {id: post.id})],
                similarity: stringSimilarity.compareTwoStrings(post.data().header.toLowerCase(), query.query.replace("%20", " ").toLowerCase()) + (post.data().header.length / 1000)
            })
        )


        return postHeaders.filter(post => post.similarity > .2).sort(function(a, b) {return a.similarity - b.similarity}).map(data => data.data[0]).reverse();
    }

    useEffect(() => {

        if (query.query) {

            getPosts().then(setPosts)
        }
    })

    return (
        <>
            <h1>{`Search results for "${query.query ? query.query.replace("%20", " ") : '...'}"`}</h1>
            {posts ? <Posts limit={40} search={true} searchData={posts}></Posts> : null}
        </>
    )
}