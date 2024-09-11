import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import userProfileStore from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function useGetFeedPosts() {
    const [isLoading, setIsLoading] = useState(true);

    const { posts, setPosts } = usePostStore()
    const { setUserProfile } = userProfileStore()

    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        async function getFeedPosts() {
            setIsLoading(true);
            if (authUser.following.length === 0) {
                setIsLoading(false)
                setPosts([])
                return
            }

            try {
                const feedPosts = []
                const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser.following))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => feedPosts.push({ id: doc.id, ...doc.data() }))
                feedPosts.sort((a, b) => a.createdAt - b.createdAt)
                setPosts(feedPosts)
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getFeedPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser, setPosts]);
    return { isLoading, posts }
}

export default useGetFeedPosts
