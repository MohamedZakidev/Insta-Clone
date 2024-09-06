import { Avatar, Flex, Text } from '@chakra-ui/react'
import useGetUserProfileByUid from '../../hooks/useGetUserProfileByUid'

function Comment({ comment }) {
    // const { userProfile } = useGetUserProfileByUid(comment.createdBy)
    // console.log(userProfile)
    return (
        <Flex gap={3}>
            {/* <Avatar src={userProfile.profilePicURL} name={userProfile.username} size={"sm"} /> */}
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Text fontSize={12} fontWeight={"bold"}>
                        {/* {userProfile.username} */}
                    </Text>
                    <Text fontSize={14}>
                        {comment.comment}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {comment.createdAt}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Comment
