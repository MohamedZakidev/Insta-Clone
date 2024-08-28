import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileTabs from "../../components/Profile/ProfileTabs"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import { Link as RouterLink, useParams } from "react-router-dom"
import useGetUserProfileByUid from "../../hooks/useGetUserProfileByUid"

function ProfilePage() {
    const { uid } = useParams()
    const { isLoading, userProfile } = useGetUserProfileByUid(uid)

    const userNotFound = !isLoading && !userProfile
    if (userNotFound) {
        return <UserNotFound />
    }

    return (
        <Container maxW={"container.lg"} px={5}>
            {isLoading && <ProfileHeaderSkeleton />}
            {!isLoading && userProfile ? <ProfileHeader /> : null}
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

const ProfileHeaderSkeleton = () => {
    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <SkeletonCircle size='24' />

            <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
                <Skeleton height='12px' width='150px' />
                <Skeleton height='12px' width='100px' />
            </VStack>
        </Flex>
    );
};

function UserNotFound() {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
            <Text fontSize={"2xl"}>User Not Found</Text>
            <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    )
}

export default ProfilePage
