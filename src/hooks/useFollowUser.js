import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import userProfileStore from '../store/userProfileStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

function useFollowUser(userId) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const { user, setUser } = useAuthStore((state) => state)
    const { userProfile, setUserProfile } = userProfileStore((state) => state)
    const showToast = useShowToast()

    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    }, [user, userId])

    ////////////////////////////////////
    async function handleFollowUSer() {
        setIsUpdating(true)
        try {
            // Updating firebase documents
            const currentUserRef = doc(firestore, "users", user.uid)
            const targetedUserRef = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(targetedUserRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            // update userInterface by updating user and userProfile
            if (isFollowing) {
                //unFollow
                setUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                })
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== user.uid)
                })
                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false)
            } else {
                // Follow
                setUser({
                    ...user,
                    following: [...user.following, userId]
                })
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })
                localStorage.setItem("user-info", JSON.stringify({
                    ...user,
                    following: [...user.following, userId]
                }))
                setIsFollowing(true)
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsUpdating(false)
        }
    }
    return { isUpdating, isFollowing, handleFollowUSer }
}

export default useFollowUser
