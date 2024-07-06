import { Flex, Image, Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

function GoogleAuth({ prefix }) {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    return (
        <Flex justifyContent={"center"} alignItems={"center"} gap={2} cursor={"pointer"}>
            <Image w={"20px"} src="google.png" />
            <Text>{prefix} with Google</Text>
        </Flex>
    )
}

export default GoogleAuth
