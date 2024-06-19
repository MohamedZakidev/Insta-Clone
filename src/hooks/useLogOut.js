import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";

function useLogOut() {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast()

    async function handleLogOut() {
        try {
            await signOut()
            localStorage.removeItem("user-info")
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return { error, loading, handleLogOut }

}

export default useLogOut
