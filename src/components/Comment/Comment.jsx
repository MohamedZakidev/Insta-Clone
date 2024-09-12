import { Avatar, Flex, Link, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import useGetUserProfileByUid from '../../hooks/useGetUserProfileByUid'
import { Link as RouterLink } from 'react-router-dom'
import { getTime } from "../../utils/getTime"

function Comment({ comment }) {
    const { isLoading, userProfile } = useGetUserProfileByUid(comment.createdBy)
    if (isLoading) return <CommentSkeleton />
    return (
        <Flex gap={3}>
            <Link as={RouterLink} to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} name={userProfile.username} size={"sm"} />
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Flex direction={"column"}>
                        <Link as={RouterLink} to={`/${userProfile.username}`}>
                            <Text fontSize={12} fontWeight={"bold"}>
                                {userProfile.username}
                            </Text>
                        </Link>
                        <Text fontSize={12} color={"gray"}>
                            {getTime(comment.createdAt)}
                        </Text>
                    </Flex>
                    <Text fontSize={14} whiteSpace={"initial"} maxW={"30ch"}>
                        {comment.comment}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Comment

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w='10' />
            <Flex gap={1} flexDir={"column"}>
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>
        </Flex>
    );
};