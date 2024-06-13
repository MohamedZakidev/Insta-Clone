import { Avatar, Box, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

function ProfilePost({ img }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                    opacity={0} s
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
                        <AiFillHeart size={20} />
                        <Text fontWeight={"bold"} ml={2}>7</Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                        <FaComment size={20} />
                        <Text fontWeight={"bold"} ml={2}>7</Text>
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
                <ModalContent pb={4} bg={"black"} border={"1px solid"} borderColor={"whiteAlpha.200"}  >
                    <ModalBody p={0}>
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
                            <Box
                                borderRadius={4}
                                border={"1px solid"}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                overflow={"hidden"}
                            >
                                <Image src={img} alt="Post picture" />
                            </Box>
                            {/* right hand side */}
                            <Flex flex={1} flexDirection={"column"} px={10} pt={4} display={{ base: "none", md: "flex" }}>
                                <Flex alignItems={"center"} justifyContent={"space-between"}>
                                    <Flex alignItems={"center"} gap={2}>
                                        <Avatar src={img} size={"sm"} name="Ana de armas" />
                                        <Text fontWeight={"bold"} fontSize={12}>Ana de armas</Text>
                                    </Flex>
                                    <Box
                                        p={1}
                                        borderRadius={4}
                                        _hover={{ bg: "whiteAlpha.300", color: "red" }}
                                    >
                                        <MdDelete size={20} cursor={"pointer"} />
                                    </Box>
                                </Flex>
                                <Divider orientation='horizontal' my={4} bg={"gray.500"} />
                                <Flex>
                                    {/* {work here} */}
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost
