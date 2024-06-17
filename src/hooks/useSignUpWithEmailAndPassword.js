import { auth } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
function useSignUpWithEmailAndPassword() {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    return (
        <>

        </>
    )
}

export default useSignUpWithEmailAndPassword
