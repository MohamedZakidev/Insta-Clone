import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { auth, firestore, storage } from "../firebase/firebase"
import userProfileStore from "../store/userProfileStore"

function useEditProfile() {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const setUserProfile = userProfileStore((state) => state.setUserProfile)

    const showToast = useShowToast()

    async function editProfile(formData, selectedFile) {
        if (isUpdating || !authUser) return
        setIsUpdating(true)

        const storageRef = ref(storage, `profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore, "users", authUser.uid)

        let URL = ""
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url")
                URL = await getDownloadURL(storageRef)
            }

            const updatedUser = {
                ...authUser,
                fullName: formData.fullName || authUser.fullName,
                username: formData.username || authUser.username,
                bio: formData.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDocRef, updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))
            setAuthUser(updatedUser)
            setUserProfile(updatedUser)
            showToast("Success", "Profile updated Successfully", "success")

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return { isUpdating, editProfile }
}

export default useEditProfile
