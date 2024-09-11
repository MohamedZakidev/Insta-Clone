import { Avatar, Flex, Text, Link, Button } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import useLogOut from "../../hooks/useLogOut"
import useAuthStore from "../../store/authStore"

function SuggestedHeader() {
    const { handleLogOut, loading } = useLogOut()
    const user = useAuthStore(state => state.user)

    if (user) {
        return (
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Link as={RouterLink} to={user.username}>
                    <Avatar size={"sm"} src={user.profilePicURL} name={user.fullName} bg={"grey"} />
                </Link>
                <Link as={RouterLink} to={user.username}>
                    <Text fontWeight={"bold"}>{user.username}</Text>
                </Link>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={14}
                    fontWeight={"600"}
                    color={"blue.400"}
                    _hover={{
                        color: "white",
                        bg: "transparent"
                    }}
                    letterSpacing={"1px"}
                    isLoading={loading}
                    onClick={handleLogOut}
                >
                    Log out
                </Button>
            </Flex>
        )
    }
}

export default SuggestedHeader
