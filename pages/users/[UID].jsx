import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { db } from "../../Scripts/firebaseconfig";

export default function userPage() {
    const { query } = useRouter();
    const { UID } = query;
    let [userInfo, setUserInfo] = useState(null)
    async function getData(UID) {

        const userRef = db.collection('Users').doc(UID)
        const doc = await userRef.get()
        if (doc.data()) {
            const email = doc.data().email
            const displayName = doc.data().displayName
            const currency = doc.data().currency
            return `Email: ${email}, username: ${displayName}, currency ${currency}`
        }
        return `User ID ${UID} could not be found`
    }
    useEffect(() => {
        if (UID) {
            getData(UID).then(response => {
                setUserInfo(response)
            })
        }
    })

    return (
        <h4>
            {userInfo}
        </h4>
    )
}