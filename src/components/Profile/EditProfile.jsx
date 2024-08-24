import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

const EditProfile = ({ isOpen, onClose }) => {
    const authUser = useAuthStore((state) => state.user)
    console.log(authUser)
    const [formData, setFormData] = useState({
        fullName: authUser.fullName || "",
        username: authUser.username || "",
        bio: authUser.bio || ""
    })
    const { fullName, username, bio } = formData

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleEditeProfile() {
        console.log("")
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Container Flex */}
                        <Flex bg={"black"}>
                            <Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                    Edit Profile
                                </Heading>
                                <FormControl>
                                    <Stack direction={["column", "row"]} spacing={6}>
                                        <Center>
                                            <Avatar size='xl' src={""} border={"2px solid white "} />
                                        </Center>
                                        <Center w='full'>
                                            <Button w='full'>Edit Profile Picture</Button>
                                        </Center>
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                                    <Input placeholder={"Full Name"} size={"sm"} type={"text"} name="fullName" value={fullName} onChange={handleChange} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Username</FormLabel>
                                    <Input placeholder={"Username"} size={"sm"} type={"text"} name="username" value={username} onChange={handleChange} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Bio</FormLabel>
                                    <Input placeholder={"Bio"} size={"sm"} type={"text"} name="bio" value={bio} onChange={handleChange} />
                                </FormControl>

                                <Stack spacing={6} direction={["column", "row"]}>
                                    <Button
                                        bg={"red.400"}
                                        color={"white"}
                                        w='full'
                                        size='sm'
                                        _hover={{ bg: "red.500" }}
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={"blue.400"}
                                        color={"white"}
                                        size='sm'
                                        w='full'
                                        _hover={{ bg: "blue.500" }}
                                        onClick={handleEditeProfile}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfile;