import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import { firestore } from '../firebase/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import usePostStore from '../store/postStore'

function usePostComment() {
    const [isLoading, setIsLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const addComment = usePostStore(state => state.addComment)

    const showToast = useShowToast()

    async function handlePostComment(postId, comment) {
        setIsLoading(true)
        if (isLoading) return
        if (!authUser) {
            return showToast("Info", "you must be logged in first", "info")
        }
        setIsLoading(true)
        const newComment = {
            postId,
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid
        }
        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment)
            })
            addComment(postId, newComment)
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }
    return { isLoading, handlePostComment }
}

export default usePostComment
