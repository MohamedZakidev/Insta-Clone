import { Button, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"

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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        this is a modal
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

export default ProfilePost
