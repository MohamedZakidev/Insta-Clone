import { useEffect, useState } from "react"
import usePostStore from "../store/postStore"
import userProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { firestore } from "../firebase/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

function useGetUserPosts() {
    const [isLoading, setIsLoading] = useState(false)
    const { posts, setPosts } = usePostStore()
    const userProfile = userProfileStore((state) => state.userProfile)
    const showToast = useShowToast()

    useEffect(() => {
        async function getPosts() {
            if (!userProfile) return

            setIsLoading(true)
            try {
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid))
                const querySnapshot = await getDocs(q);

                const posts = []
                querySnapshot.forEach(doc => {
                    posts.push({ ...doc.data(), id: doc.id })
                })
                posts.sort((a, b) => b.createdBy - a.createdBy)
                setPosts(posts)

            } catch (error) {
                showToast("Error", error.message, "error")
                setPosts([])
            } finally {
                setIsLoading(false)
            }
        }
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setPosts, userProfile])
    return { isLoading, posts }
}

export default useGetUserPosts
