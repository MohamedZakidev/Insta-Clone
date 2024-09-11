import { getTime } from "../../utils/getTime"
import styles from "./feedpost.module.css"
import { Link as RouterLink } from "react-router-dom"
import { Avatar, Button, Flex, Link, Text } from '@chakra-ui/react'
import useFollowUser from "../../hooks/useFollowUser"

function FeedPostHeader({ post, creatorProfile }) {
    const { isUpdating, isFollowing, handleFollowUSer } = useFollowUser(post.createdBy)
    return (
        <div className={styles.feedPostHeader}>
            <Flex alignItems={"center"}>
                <Link as={RouterLink} to={`/${creatorProfile.username}`}>
                    <Avatar src={creatorProfile.profilePicURL} name={creatorProfile.fullName} bg={"grey"} alt="user profile picture" size={"sm"} />
                </Link>

                <Link as={RouterLink} to={`/${creatorProfile.username}`}>
                    <Text ml={3} fontSize={14} fontWeight={"600"}>{creatorProfile.username}</Text>
                </Link>
                <Text ml={3} fontSize={12} color={"gray.500"}>{getTime(post.createdAt)}</Text>
            </Flex>
            <div>
                <Button
                    fontSize={14}
                    color={"blue.500"}
                    fontWeight={"bold"}
                    _hover={{
                        color: "white"
                    }}
                    bg={"none"}
                    transition={"0.2s ease-in-out"}
                    padding={0}
                    letterSpacing={"1px"}
                    onClick={handleFollowUSer}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </div>
        </div>
    )
}

export default FeedPostHeader
