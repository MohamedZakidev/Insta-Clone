import styles from "./feedpost.module.css"
import { Box, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react"
import useGetFeedPosts from "../../hooks/useGetFeedPosts"
import FeedPost from "./FeedPost"

function FeedPosts() {
    const { isLoading, posts } = useGetFeedPosts()
    return (
        <div className={styles.feedPost}>
            {
                isLoading &&
                [0, 1, 2].map((_, index) => {
                    return (
                        <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
                            <Flex gap='2'>
                                <SkeletonCircle size='10' />
                                <VStack gap={2} alignItems={"flex-start"}>
                                    <Skeleton height='10px' w={"200px"} />
                                    <Skeleton height='10px' w={"200px"} />
                                </VStack>
                            </Flex>
                            <Skeleton w={"full"}>
                                <Box h={"400px"}>contents wrapped</Box>
                            </Skeleton>
                        </VStack>
                    )
                })
            }
            {
                !isLoading && posts.length > 0 && (
                    posts.map(post => <FeedPost key={post.id} post={post} />)
                )
            }
        </div >
    )
}

export default FeedPosts

// <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
//     <Flex gap='2'>
//         <SkeletonCircle size='10' />
//         <VStack gap={2} alignItems={"flex-start"}>
//             <Skeleton height='10px' w={"200px"} />
//             <Skeleton height='10px' w={"200px"} />
//         </VStack>
//     </Flex>
//     <Skeleton w={"full"}>
//         <Box h={"400px"}>contents wrapped</Box>
//     </Skeleton>
// </VStack>