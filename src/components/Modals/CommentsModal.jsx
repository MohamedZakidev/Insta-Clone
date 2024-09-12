import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef, useState } from "react";

function CommentsModal({ isOpen, onClose, post }) {
    const [comment, setComment] = useState("")

    const commentsContainerRef = useRef(null)

    const { isLoading, handlePostComment } = usePostComment()

    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [isOpen, post.comments.length]);

    async function handleSubmitComment(e) {
        e.preventDefault()
        await handlePostComment(post.id, comment)
        setComment("")
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Comments</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
                        {post.comments.map((comment, index) => (
                            <Comment key={index} comment={comment} />
                        ))}
                    </Flex>
                    <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
                        <Input placeholder='Comment' size={"sm"} value={comment} onChange={(e) => setComment(e.target.value)} />
                        <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CommentsModal;