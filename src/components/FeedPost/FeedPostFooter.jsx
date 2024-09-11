import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../public/assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useLikePost from '../../hooks/useLikePost'

function FeedPostFooter({ post, userProfile, isProfilePage }) {
    const [comment, setComment] = useState("")
    const commentRef = useRef(null)

    const { isLoading, handlePostComment } = usePostComment()

    const { isLiked, likesCount, handleLikePost } = useLikePost(post)

    async function handleSubmitComment() {
        await handlePostComment(post.id, comment);
        setComment("");
    }


    return (
        <Flex flexDirection={"column"} mt={"auto"} gap={1} pt={3} borderTop={"1px solid gray"} w={"full"}>
            <Flex gap={4}>
                <Box onClick={handleLikePost} cursor={"pointer"}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box cursor={"pointer"} onClick={() => commentRef.current.focus()}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>{likesCount ? likesCount === 1 ? `${likesCount} like` : `${likesCount} likes` : null}</Text>
            <Text fontSize={"sm"} fontWeight={700} maxW={"40ch"}>
                {userProfile.username}
                <Text as={"span"} fontWeight={400} ml={3}>{post?.caption}</Text>
            </Text>
            {post.comments.length > 0 ?
                (
                    <Text color={"gray.500"} fontSize={"sm"} cursor={"pointer"}>
                        Veiw {post.comments.length === 1 ? "" : "all"} {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
                    </Text>
                ) :
                !isProfilePage &&
                (
                    <Text color={"gray.500"} fontSize={"sm"}>
                        No comments yet
                    </Text>
                )
            }
            <InputGroup>
                <Input
                    fontSize={14}
                    variant={"flushed"}
                    placeholder={"Add a commnet..."}
                    _placeholder={{
                        color: "gray.500"
                    }}
                    ref={commentRef}
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
