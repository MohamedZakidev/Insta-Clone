import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useParams } from "react-router-dom"
import useUserProfileStore from "../store/userProfileStore"

function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(true)
    const showToast = useShowToast()
    const { userProfile, setUserProfile } = useUserProfileStore()

    useEffect(() => {
        async function getUserProfile() {
            setIsLoading(true)
            try {
                const q = query(collection(firestore, "users"), where("username", "==", username))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.empty) {
                    setUserProfile(null)
                    return
                }
                let userDoc
                querySnapshot.forEach(doc => {
                    userDoc = doc.data();
                })
                setUserProfile(userDoc)

            } catch (error) {
                showToast("Error", error.message, "error")
            }
        }
        getUserProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { isLoading, userProfile }
}

export default useGetUserProfileByUsername
