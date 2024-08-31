import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore"

function SuggestedUser({ searchedUser, setSearchedUser }) {
    const { isUpdating, isFollowing, handleFollowUSer } = useFollowUser(searchedUser.uid)
    const authUser = useAuthStore((state) => state.user)

    function onFollowUser() {
        handleFollowUSer()
        setSearchedUser({
            ...searchedUser,
            followers: isFollowing ? searchedUser.followers.filter(uid => uid !== authUser.uid) : [...searchedUser.followers, authUser.uid]
        })
    }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={3} alignItems={"center"}>
                <Avatar bg={"grey"} src={searchedUser.profilePicURL} name={searchedUser.fullName} />
                <Box>
                    <Text>{searchedUser.fullName}</Text>
                    <Text fontSize={11} color={"gray.500"} >{searchedUser.followers.length} followers</Text>
                </Box>
            </Flex>
            {authUser.uid !== searchedUser.uid && (
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
