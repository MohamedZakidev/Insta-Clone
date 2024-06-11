import { Container, Flex } from "@chakra-ui/react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePost from "../../components/Profile/ProfilePost"

function ProfilePage() {
    return (
        <Container maxW={"container.lg"} py={{ base: 7, sm: 20 }}>
            <ProfileHeader />
            <Flex
                px={{ base: 2, sm: 4 }}
                borderTop={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flexDirection={"column"}
            >
                <ProfileTabs />
                <ProfilePost />
            </Flex>
        </Container>
    )
}

export default ProfilePage
