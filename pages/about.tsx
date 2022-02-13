import { useCollectionData } from "react-firebase-hooks/firestore";
import Posts from "../components/Posts";
import { db } from "../Scripts/firebaseconfig";


export default function Home() {

  return (
    <>
      <h1>Popular</h1>
      <Posts limit={12} sort='views' asc={true} popular={true}></Posts>
      <h1>Trending</h1>
      <Posts limit={12} asc={true} trending={true}></Posts>
    </>
  )
}