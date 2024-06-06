import { useEffect, useRef, useState } from "react"
import styles from "./feedpost.module.css"
import { Avatar, Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../../public/assets/constants"

function FeedPost() {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [comment, setComment] = useState("")
    //make a skeleton 

    const inputRef = useRef()
    const inputRefValue = inputRef.current?.value

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    function handleLikes() {
        if (isLiked) {
            setIsLiked(false)
            setLikesCount(prev => prev - 1)
        } else {
            setIsLiked(true)
            setLikesCount(prev => prev + 1)
        }
    }

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
                                >
                                    Unfollow
                                </Button>
                            </div>
                        </div>
                        <div className={styles.feedPostBody}>
                            <Image src="img1.png" alt="user profile picture" />
                        </div>
                        <div className={styles.feedPostFooter}>
                            <Flex gap={4}>
                                <Box onClick={handleLikes} cursor={"pointer"}>
                                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                                </Box>
                                <Box cursor={"pointer"}>
                                    <CommentLogo />
                                </Box>
                            </Flex>
                            <Text fontWeight={600} fontSize={"sm"}>{likesCount ? likesCount === 1 ? `${likesCount} like` : `${likesCount} likes` : null}</Text>
                            <Text fontSize={"sm"} fontWeight={700} maxW={"40ch"}>
                                Ana de armas
                                <Text as={"span"} fontWeight={400} ml={3}>Feeling Good</Text>
                            </Text>
                            <Text color={"gray.500"} fontSize={"sm"}>Veiw all 100 comments</Text>
                            <InputGroup>
                                <Input
                                    fontSize={14}
                                    variant={"flushed"}
                                    placeholder={"Add a commnet..."}
                                    _placeholder={{
                                        color: "gray.500"
                                    }}
                                    ref={inputRef}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                {inputRefValue &&
                                    <InputRightElement>
                                        <Button
                                            fontSize={14}
                                            color={"blue.500"}
                                            fontWeight={600}
                                            bg={"transparent"}
                                            _hover={{
                                                color: "white"
                                            }}
                                        >
                                            Post
                                        </Button>
                                    </InputRightElement>
                                }
                            </InputGroup>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default FeedPost
