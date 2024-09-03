import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../public/assets/constants'
import { useLocation } from 'react-router-dom'

function FeedPostFooter({ likes, caption, comments, fullName }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [comment, setComment] = useState("")

    const inputRef = useRef()
    const inputRefValue = inputRef.current?.value
    const { pathname } = useLocation()

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
                <Text as={"span"} fontWeight={400} ml={3}>{caption}</Text>
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
        </Flex>
    )
}

export default FeedPostFooter
