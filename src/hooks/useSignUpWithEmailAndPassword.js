import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

function useSignUpWithEmailAndPassword() {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    async function handleSignUp(formData) {
        const { email, password, username, fullName } = formData

        if (!email || !password || !username || !fullName) {
            showToast("Error", "Please fill all the fields", "error")
            return
        }

        // checking if username exist
        const usersRef = collection(firestore, "users")
        const q = query(usersRef, where("username", "==", username))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exist", "error")
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(email, password)
            if (!newUser) {
                showToast("Error", error.message, "error")
                return
            }
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
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", userDoc.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return { error, loading, handleSignUp }
}

export default useSignUpWithEmailAndPassword
