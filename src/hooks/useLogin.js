import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast"
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

function useLogin() {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    async function handleLogin(formData) {
        const { email, password } = formData

        if (!email || !password) {
            showToast("Error", "Please fill all the fields", "error")
            return
        }

        try {
            const userCred = await signInWithEmailAndPassword(email, password)
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data());
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return { error, loading, handleLogin }
}

export default useLogin
