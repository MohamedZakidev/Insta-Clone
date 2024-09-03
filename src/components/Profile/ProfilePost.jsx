import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment";
import FeedPostFooter from "../FeedPost/FeedPostFooter";
import userProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";

function ProfilePost({ post }) {
    const { caption, likes, comments, createdAt, createdBy, imageURL } = post
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useAuthStore(state => state.user)
    const userProfile = userProfileStore(state => state.userProfile)
    const showToast = useShowToast()

    const deletePost = usePostStore(state => state.deletePost)
    const deletePostFromProfile = userProfileStore(state => state.deletePost)

    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDeletePost() {
        if (!window.confirm("Are you sure you want to delete this post ?")) return
        if (isDeleting) return
        setIsDeleting(true)
        try {
            // update firebase data base
            await deleteDoc(doc(firestore, "posts", post.id))
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef)

            const userDocRef = doc(firestore, "users", authUser.uid);
            await updateDoc(userDocRef, {
                posts: arrayRemove(post.id)
            })
            // update user interface
            deletePost(post.id)
            deletePostFromProfile(post.id)

        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <GridItem
                position={"relative"}
                cursor={"pointer"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                borderRadius={4}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    bg={"blackAlpha.700"}
                    top={0}
                    bottom={0}
                    right={0}
                    left={0}
                    transition={"all 0.3s"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={6}
                >
                    <Flex alignItems={"center"}>
                        <AiFillHeart size={20} aria-label="likes" />
                        <Text fontWeight={"bold"} ml={2}>{likes.length}</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <FaComment size={20} aria-label="comments" />
                        <Text fontWeight={"bold"} ml={2}>{comments.length}</Text>
                    </Flex>
                </Flex>
                <Image src={imageURL} w={"full"} h={"full"} objectFit={"cover"} alt="profile post" />
            </GridItem>


            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid"} borderColor={"whiteAlpha.200"}>
                    <ModalBody p={0} >
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"} maxHeight={"90vh"} minHeight={"50vh"}>
                            <Flex
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                overflow={"hidden"}
                                justifyItems={"center"}
                                justifyContent={"center"}
                            >
                                <Image src={imageURL} alt="Post picture" h={"full"} objectFit={"cover"} w={"full"} />
                            </Flex>

                            {/* Right hand side */}
                            <Flex flex={1} flexDirection={"column"} px={10} pt={4} display={{ base: "none", md: "flex" }}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={2}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name={userProfile.username} />
                                        <Text fontWeight={"bold"} fontSize={12}>{userProfile.username}</Text>
                                    </Flex>
                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            size={"sm"}
                                            bg={"transparent"}
                                            p={1}
                                            borderRadius={4}
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            isLoading={isDeleting}
                                            onClick={handleDeletePost}
                                        >
                                            <MdDelete size={20} cursor={"pointer"} aria-label="delete" />
                                        </Button>
                                    )}
                                </Flex>
                                <Divider orientation='horizontal' my={4} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    {comments.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            createdAt={comment.createdAt}
                                            username={comment.username}
                                            profilePic={comment.profilePic}
                                            text={comment.text}
                                        />
                                    ))}
                                </VStack>
                                {comments.length === 0 ? <Text color={"whiteAlpha.500"} alignSelf={"center"}>No Comments yet...</Text> :
                                    <Divider justifySelf={"flex-end"} my={4} bg={"gray.800"} />
                                }
                                <FeedPostFooter likes={likes} caption={caption} comments={comments} fullName={userProfile.fullName} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfilePost;
