import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);
    const addComment = usePostStore((state) => state.addComment);

    const handlePostComment = async (postId, comment) => {
        if (isLoading) return;
        if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
        setIsLoading(true);
        const newComment = {
            comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId,
        };
        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment),
            });
            addComment(postId, newComment);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handlePostComment };
};

export default usePostComment;