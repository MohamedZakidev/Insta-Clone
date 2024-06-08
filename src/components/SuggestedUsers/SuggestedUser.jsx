import { useState } from "react"
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"

function SuggestedUser({ username, avatar, numFollowers }) {
    const [isFollowed, setIsFollowed] = useState()
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={3} alignItems={"center"}>
                <Avatar src={avatar} />
                <Box>
                    <Text>{username}</Text>
                    <Text fontSize={11} color={"gray.500"} >{numFollowers} followers</Text>

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
