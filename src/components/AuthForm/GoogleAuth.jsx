import { Flex, Image, Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

function GoogleAuth({ prefix }) {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    async function handleGoogleAuth() {
        try {
            const newUser = await signInWithGoogle()
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return
            }
            const userRef = doc(firestore, "users", newUser.user.uid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
                //login
                const userCred = userSnap.data()
                localStorage.setItem("user-info", JSON.stringify(userCred))
                loginUser(userCred)
            }
            else {
                //singup
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
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
    return (
        <Flex justifyContent={"center"} alignItems={"center"} gap={2} cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image w={"20px"} src="google.png" />
            <Text>{prefix} with Google</Text>
        </Flex>
    )
}

export default GoogleAuth
