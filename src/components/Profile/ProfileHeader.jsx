import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore'
import userProfileStore from '../../store/userProfileStore'
import EditProfile from './EditProfile'

function ProfileHeader() {
    const { userProfile } = userProfileStore()

    const authUser = useAuthStore(state => state.user)
    const isVistingOwnProfileAndAuth = authUser && authUser.uid === userProfile.uid
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex
            py={{ base: 5, md: "70px" }}
            gap={{ base: 4, md: 8 }}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={{ base: "column", sm: "row" }}
            px={{ md: 5 }}
        >
            <AvatarGroup size={{ base: "xl", md: "2xl" }}>
                <Avatar backgroundColor={"grey"} src={authUser.profilePicURL} name={userProfile.fullName} alt="Profile picture" />
            </AvatarGroup>
            {/*  */}
            <Flex flexDirection={"column"} gap={2}>
                <Flex gap={4} alignItems={"center"}>
                    <Text>{userProfile.username}</Text>
                    {isVistingOwnProfileAndAuth ?
                        (
                            <Button
                                fontSize={14}
                                fontWeight={600}
                                color={"black"}
                                bg={"white"}
                                _hover={{
                                    bg: "whiteAlpha.700"
                                }}
                                size={{ base: "xs", md: "sm" }}
                                onClick={onOpen}
                            >

                                Edit Profile
                            </Button>
                        )
                        :
                        (
                            <Button
                                fontSize={14}
                                fontWeight={600}
                                color={"white.700"}
                                bg={"blue.500"}
                                _hover={{
                                    bg: "blue.700"
                                }}
                                size={{ base: "xs", md: "sm" }}
                            >
                                Follow
                            </Button>
                        )
                    }
                </Flex>
                <Flex gap={{ base: 2, sm: 4 }} fontSize={14}>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.posts.length}{" "}</Text>
                        post
                    </Text>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.followers.length}{" "}</Text>
                        followers
                    </Text>
                    <Text>
                        <Text as={"span"} fontWeight={"bold"}>{userProfile.following.length}{" "}</Text>
                        following
                    </Text>
                </Flex>
                <Text fontWeight={700}>{userProfile.fullName}</Text>
                <Text fontSize={14}>{userProfile.bio}</Text>
            </Flex>
            {isOpen && <EditProfile isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader
