import { useState } from 'react'
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/postStore';

function useLikePost(post) {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const [isLiked, setIsLiked] = useState(post?.likes.includes(authUser?.uid)) // reminder to delete ? after post
    const [likesCount, setLikesCount] = useState(post?.likes.length) // reminder to delete ? after post
    const showToast = useShowToast();

    const addLike = usePostStore(state => state.addLike)
    const removeLike = usePostStore(state => state.removeLike)

    async function handleLikePost() {
        if (isUpdating) return
        if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
        setIsUpdating(true)
        try {
            const postRef = doc(firestore, "posts", post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });

            if (isLiked) {
                removeLike(post.id, authUser.uid)
                setIsLiked(false)
            } else {
                addLike(post.id, authUser.uid);
                setIsLiked(true)
            }
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
