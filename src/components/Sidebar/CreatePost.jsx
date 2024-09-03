import { useRef, useState } from "react";
import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CreatePostLogo } from "../../../public/assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import userProfileStore from "../../store/userProfileStore";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [caption, setCaption] = useState("")
    const inputRef = useRef()
    const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg()
    const showToast = useShowToast()

    const { isLoading, handleCreatePost } = useCreatePost()

    async function handlePostCreation() {
        try {
            await handleCreatePost(selectedFile, caption)
            onClose()
            setSelectedFile(null)
            setCaption("")
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <>
            <Tooltip
                hasArrow
                label={"Create"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={3}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />

                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea placeholder='Post caption...'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <Input type='file' hidden ref={inputRef} onChange={handleImageChange} />
                        <BsFillImageFill
                            onClick={() => inputRef.current.click()}
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />
                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                <Image src={selectedFile} alt='Selected img' />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    bg={"black"}
                                    onClick={() => {
                                        setSelectedFile(null);
                                    }}
                                />
                            </Flex>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} isLoading={isLoading} onClick={handlePostCreation}>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;

function useCreatePost() {
    const [isLoading, setisLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const createPost = usePostStore((state) => state.createPost)
    const userProfile = userProfileStore((state) => state.userProfile)

    const addPost = userProfileStore((state) => state.addPost)
    //pathname later
    const showToast = useShowToast()

    async function handleCreatePost(selectedFile, caption) {
        if (isLoading) return;
        if (!selectedFile) { throw new Error("Please select an image") }
        setisLoading(true)
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        }
        try {
            //1. get user ref
            const userDocRef = doc(firestore, "users", authUser.uid);
            //2. create posts collection and add a post document and save its ref
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            //3. add post id to the user Doc in the posts array
            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            //4. get post image ref and upload it in the storage as a string
            const imageRef = ref(storage, `posts/${postDocRef.id}`);
            await uploadString(imageRef, selectedFile, "data_url");
            //5. download post image url
            const downloadURL = await getDownloadURL(imageRef);

            //6. add the image ref to the post document 
            await updateDoc(postDocRef, { imageURL: downloadURL });
            //7. add imageURL to newpost obj do not know why just yet??
            newPost.imageURL = downloadURL;

            //8. add the post to the store post so we fetch posts from that later on i think
            createPost({ ...newPost, id: postDocRef.id })
            //9. update userProfile to update the interface on the profile page
            if (userProfile) {
                addPost({ ...newPost, id: postDocRef.id })
            }

            showToast("Success", "Post created Successfully", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setisLoading(false)
        }

    }
    return { isLoading, handleCreatePost }
}