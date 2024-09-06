import { useEffect, useState } from "react"
import styles from "./feedpost.module.css"
import { Avatar, Button, Flex, Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import FeedPostFooter from "./FeedPostFooter"

function FeedPost() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    return (
        <div className={styles.feedPost}>
            {
                isLoading ? (
                    <>
                        <Flex alignItems={"center"} gap={4} >
                            <SkeletonCircle size={10} />
                            <Flex flexDirection={"column"} gap={2}>
                                <Skeleton h={2} w={"160px"} />
                                <Skeleton h={2} w={"80px"} />
                            </Flex>
                        </Flex>
                        <Skeleton h={"500"} />
                    </>
                ) : (
                    <>
                        <div className={styles.feedPostHeader}>
                            <Flex alignItems={"center"}>
                                <Avatar src="img1.png" alt="user profile picture" size={"sm"} />
                                <Text ml={3} fontSize={14} fontWeight={"600"}>Ana de armas</Text>
                                <Text ml={3} fontSize={12} color={"gray.500"}>• 1w </Text>
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
                                >
                                    Unfollow
                                </Button>
                            </div>
                        </div>
                        <div className={styles.feedPostBody}>
                            <Image src="img1.png" alt="user profile picture" />
                        </div>
                        <FeedPostFooter />
                    </>
                )
            }
        </div >
    )
}

export default FeedPost
