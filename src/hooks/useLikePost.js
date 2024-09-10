import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

function useLikePost(post) {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const [isLiked, setIsLiked] = useState(post?.likes.includes(authUser?.uid))
    const [likesCount, setLikesCount] = useState(post?.likes.length)
    const showToast = useShowToast();

    async function handleLikePost() {
        if (isUpdating) return
        if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
        setIsUpdating(true)
        try {
            const postRef = doc(firestore, "posts", post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });

            setIsLiked(!isLiked)
            isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1)

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }

    return { isUpdating, isLiked, likesCount, handleLikePost }
}

export default useLikePost
