import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore"
import { Link as RouterLink } from "react-router-dom"

function SuggestedUser({ user, setUser }) {
    const { isUpdating, isFollowing, handleFollowUSer } = useFollowUser(user.uid)
    const authUser = useAuthStore((state) => state.user)

    async function onFollowUser() {
        await handleFollowUSer()
        if (setUser) {
            setUser({
                ...user,
                followers: isFollowing ? user.followers.filter(uid => uid !== authUser.uid) : [...user.followers, authUser.uid]
            })
        }
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={3} alignItems={"center"}>
                <Link as={RouterLink} to={`/${user.username}`}>
                    <Avatar bg={"grey"} src={user.profilePicURL} name={user.fullName} />
                </Link>
                <Box>
                    <Link as={RouterLink} to={`/${user.username}`}>
                        <Text>{user.fullName}</Text>
                    </Link>
                    <Text fontSize={11} color={"gray.500"} >{user.followers.length} followers</Text>
                </Box>
            </Flex>
            {authUser.uid !== user.uid && (
                <Button
                    p={0}
                    color={"blue.500"}
                    bg={"transparent"}
                    fontSize={14}
                    _hover={{
                        color: "white"
                    }}
                    isLoading={isUpdating}
                    onClick={onFollowUser}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    )
}

export default SuggestedUser
