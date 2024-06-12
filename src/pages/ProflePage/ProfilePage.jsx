import { Container, Flex } from "@chakra-ui/react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePosts from "../../components/Profile/ProfilePosts"

function ProfilePage() {
    return (
        <Container maxW={"container.lg"} px={5}>
            <ProfileHeader />
            <Flex
                px={{ base: 2, sm: 4 }}
                borderTop={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flexDirection={"column"}
            >
                <ProfileTabs />
                <ProfilePosts />
            </Flex>
        </Container>
    )
}

export default ProfilePage
