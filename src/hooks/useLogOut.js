import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

function useLogOut() {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast()
    const logoutUser = useAuthStore((state) => state.logout)
    async function handleLogOut() {
        try {
            await signOut()
            localStorage.removeItem("user-info")
            logoutUser()
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return { handleLogOut, loading, error }

}

export default useLogOut
