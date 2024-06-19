import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";

function useSignUpWithEmailAndPassword() {
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast()

    async function handleSignUp(formData) {
        const { email, password, username, fullName } = formData

        if (!email || !password || !username || !fullName) {
            showToast("Error", "Please fill all the fields", "error")
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(email, password)
            // if (!newUser) {
            //     showToast("Error", error.message, "error") //wrong here error have no message
            //     return
            // }
            // console.log(error);
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email,
                    username,
                    fullName,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    post: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", userDoc.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        { error, loading, handleSignUp }
    )
}

export default useSignUpWithEmailAndPassword
