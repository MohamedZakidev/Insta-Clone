import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import userProfileStore from '../store/userProfileStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

function useFollowUser(targedtedUserId) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)

    const { userProfile, setUserProfile } = userProfileStore((state) => state)
    const showToast = useShowToast()

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(targedtedUserId)
            setIsFollowing(isFollowing)
        }
    }, [authUser, targedtedUserId])

    async function handleFollowUSer() {
        setIsUpdating(true)
        try {
            // Updating firebase documents
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const targetedUserRef = doc(firestore, "users", targedtedUserId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(targedtedUserId) : arrayUnion(targedtedUserId)
            })

            await updateDoc(targetedUserRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            // update userInterface by updating user and userProfile
            if (isFollowing) {
                //unFollow
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== targedtedUserId)
                })
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                    })
                }
                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== targedtedUserId)
                }))
                setIsFollowing(false)
            } else {
                // Follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, targedtedUserId]
                })
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    })
                }
                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, targedtedUserId]
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
