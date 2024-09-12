import { Box, Button, Divider, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../public/assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useLikePost from '../../hooks/useLikePost'
import useAuthStore from '../../store/authStore'
import CommentsModal from '../Modals/CommentsModal'

function FeedPostFooter({ post, userProfile, isProfilePage }) {
    const [comment, setComment] = useState("")

    const commentRef = useRef(null)

    const { isOpen, onOpen, onClose } = useDisclosure();

    const authUser = useAuthStore((state) => state.user);

    const { isLoading, handlePostComment } = usePostComment()

    const { isLiked, likesCount, handleLikePost } = useLikePost(post)

    async function handleSubmitComment() {
        await handlePostComment(post.id, comment);
        setComment("");
    }


    return (
        <Flex flexDirection={"column"} mt={"auto"} gap={1} pt={3} w={"full"}>
            {isProfilePage && <Divider orientation='horizontal' my={4} bg={"gray.500"} />}
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
                    <Text color={"gray.500"} fontSize={"sm"} cursor={"pointer"} onClick={onOpen}>
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
            {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}

            {authUser && <InputGroup>
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
            </InputGroup>}
        </Flex>
    )
}

export default FeedPostFooter
