import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../public/assets/constants'
import { useLocation } from 'react-router-dom'
import usePostComment from '../../hooks/usePostComment'
import useShowToast from '../../hooks/useShowToast'

function FeedPostFooter({ post, fullName }) {
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState("")
    const [likesCount, setLikesCount] = useState(0)
    const { pathname } = useLocation()

    const { isLoading, handlePostComment } = usePostComment()

    function handleLikes() {
        if (isLiked) {
            setIsLiked(false)
            setLikesCount(prev => prev - 1)
        } else {
            setIsLiked(true)
            setLikesCount(prev => prev + 1)
        }
    }

    async function handleSubmitComment() {
        await handlePostComment(post.id, comment);
        setComment("");
    }


    return (
        <Flex p={"0 1em"} flexDirection={"column"} gap={2} mt={"auto"}>
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
                {fullName}
                <Text as={"span"} fontWeight={400} ml={3}>{post?.caption}</Text>
            </Text>
            {pathname === "/" ? <Text color={"gray.500"} fontSize={"sm"}>Veiw all 100 comments</Text> : null}
            <InputGroup>
                <Input
                    fontSize={14}
                    variant={"flushed"}
                    placeholder={"Add a commnet..."}
                    _placeholder={{
                        color: "gray.500"
                    }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                {comment &&
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.500"}
                            fontWeight={600}
                            bg={"transparent"}
                            _hover={{
                                color: "white"
                            }}
                            isLoading={isLoading}
                            onClick={handleSubmitComment}
                        >
                            Post
                        </Button>
                    </InputRightElement>
                }
            </InputGroup>
        </Flex>
    )
}

export default FeedPostFooter
