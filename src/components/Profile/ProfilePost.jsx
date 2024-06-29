import { Avatar, Box, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment";
import FeedPostFooter from "../FeedPost/FeedPostFooter";

function ProfilePost({ img, likes = 7, comments = 7, username = "Ana de armas", profilePic = "profilepc.png", commentsData = [] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                        <Text fontWeight={"bold"} ml={2}>{likes}</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <FaComment size={20} aria-label="comments" />
                        <Text fontWeight={"bold"} ml={2}>{comments}</Text>
                    </Flex>
                </Flex>
                <Image src={img} w={"full"} h={"full"} objectFit={"cover"} alt="profile post" />
            </GridItem>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid"} borderColor={"whiteAlpha.200"}>
                    <ModalBody p={0}>
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
                            <Box
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                overflow={"hidden"}
                            >
                                <Image src={img} alt="Post picture" h={"full"} objectFit={"cover"} />
                            </Box>

                            {/* Right hand side */}
                            <Flex flex={1} flexDirection={"column"} px={10} pt={4} display={{ base: "none", md: "flex" }}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={2}>
                                        <Avatar src={profilePic} size={"sm"} name={username} />
                                        <Text fontWeight={"bold"} fontSize={12}>{username}</Text>
                                    </Flex>
                                    <Box
                                        p={1}
                                        borderRadius={4}
                                        _hover={{ bg: "whiteAlpha.300", color: "red" }}
                                    >
                                        <MdDelete size={20} cursor={"pointer"} aria-label="delete" />
                                    </Box>
                                </Flex>
                                <Divider orientation='horizontal' my={4} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    {commentsData.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            createdAt={comment.createdAt}
                                            username={comment.username}
                                            profilePic={comment.profilePic}
                                            text={comment.text}
                                        />
                                    ))}
                                </VStack>
                                <Divider justifySelf={"flex-end"} my={4} bg={"gray.800"} />
                                <FeedPostFooter />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfilePost;
