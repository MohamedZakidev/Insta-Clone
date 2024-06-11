import { Avatar, AvatarGroup, Button, Flex, Text } from '@chakra-ui/react'

function ProfileHeader() {
    return (
        <Flex
            py={10}
            gap={4}
            justifyContent={{
                base: "center",
                sm: "flex-start"
            }}
            alignItems={"center"}
            flexDirection={{ base: "column", sm: "row" }}
        >
            <AvatarGroup size={{ base: "xl", md: "2xl" }}>
                <Avatar name='ana de armas' src='img1.png' alt="Profile picture" />
            </AvatarGroup>
            {/*  */}
            <Flex flexDirection={"column"} gap={2}>
                <Flex gap={4} alignItems={"center"}>
                    <Text>Ana de armas</Text>
                    <Button
                        fontSize={14}
                        fontWeight={600}
                        color={"black"}
                        bg={"white"}
                        _hover={{
                            bg: "whiteAlpha.700"
                        }}
                        size={{ base: "xs", md: "sm" }}
                    >
                        Edit Profile
                    </Button>
                </Flex>
                <Flex gap={{ base: 2, sm: 4 }} fontSize={14}>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>4{" "}</Text>
                        post
                    </Text>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>4{" "}</Text>
                        follower
                    </Text>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>4{" "}</Text>
                        following
                    </Text>
                </Flex>
                <Text fontWeight={700}>Ana de Armas</Text>
                <Text fontSize={14}>some really cool bio text</Text>
            </Flex>
        </Flex>
    )
}

export default ProfileHeader
