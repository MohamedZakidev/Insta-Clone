import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

function useSignUpWithEmailAndPassword() {
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);

    async function signup(formData) {
        const { email, password, username, fullName } = formData
        if (!email || !password || !username || !fullName) {
            console.log(" please fill all the fields");
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(email, password)
            if (!newUser && error) {
                console.log(error);
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
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", userDoc.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        { error, loading, signup }
    )
}

export default useSignUpWithEmailAndPassword
