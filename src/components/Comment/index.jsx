import { Avatar, Flex, Text } from '@chakra-ui/react'

function Comment({ createdAt, username, profilePic, text }) {
    return (
        <Flex gap={3}>
            <Avatar src={profilePic} name={username} size={"sm"} />
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Text fontSize={12} fontWeight={"bold"}>
                        {username}
                    </Text>
                    <Text fontSize={14}>
                        {text}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {createdAt}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Comment
