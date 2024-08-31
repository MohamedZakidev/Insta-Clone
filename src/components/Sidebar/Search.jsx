import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import { SearchLogo } from "../../../public/assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isLoading, getSearchedUser, searchedUser, setSearchedUser } = useSearchUser()
    const [searchInput, setSearchInput] = useState("")

    function handleSearchUser(e) {
        e.preventDefault()
        getSearchedUser(searchInput)
    }

    return (
        <>
            <Tooltip
                hasArrow
                label={"Search"}
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
                    <SearchLogo />
                    <Box display={{ base: "none", md: "block" }}>Search</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                    <ModalHeader>Search</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel>User name</FormLabel>
                                <Input
                                    placeholder="Leo Messi"
                                    name="searchInput"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </FormControl>

                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
                                    Search
                                </Button>
                            </Flex>
                        </form>
                        {searchedUser && <SuggestedUser searchedUser={searchedUser} setSearchedUser={setSearchedUser} />}
                    </ModalBody>
                </ModalContent>

            </Modal>
        </>
    );
};

export default Search;