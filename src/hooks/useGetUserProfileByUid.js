import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

function useGetUserProfileById(uid) {
    const [isLoading, setIsLoading] = useState(true)
    const [userProfile, setUserProfile] = useState({})

    const showToast = useShowToast()

    useEffect(() => {
        async function getUserProfile() {
            setIsLoading(true)
            try {
                const userRef = await getDoc(doc(firestore, "users", uid))
                if (userRef.exists()) {
                    setUserProfile(userRef.data())
                }
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }
        }
        getUserProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid])

    return { isLoading, userProfile, setUserProfile }
}

export default useGetUserProfileById
