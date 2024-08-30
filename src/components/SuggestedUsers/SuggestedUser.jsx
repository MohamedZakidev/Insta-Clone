import { useState } from "react"
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"

function SuggestedUser({ user }) {

    const [isFollowed, setIsFollowed] = useState() // work here on the follow logic
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={3} alignItems={"center"}>
                <Avatar bg={"grey"} src={user.profilePicURL} name={user.fullName} />
                <Box>
                    <Text>{user.fullName}</Text>
                    <Text fontSize={11} color={"gray.500"} >{user.followers.length} followers</Text>

                </Box>
            </Flex>
            <Button
                p={0}
                color={"blue.500"}
                bg={"transparent"}
                fontSize={14}
                _hover={{
                    color: "white"
                }}
                onClick={() => setIsFollowed(!isFollowed)}
            >
                {isFollowed ? "Unfollow" : "Follow"}
            </Button>
        </Flex>
    )
}

export default SuggestedUser
