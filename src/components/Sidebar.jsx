import { Link as RouterLink } from "react-router-dom"
import useLogOut from "../hooks/useLogOut"
import { Avatar, Box, Button, Flex, Link, Text, Tooltip } from "@chakra-ui/react"
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../public/assets/constants"
import { AiFillHome } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"

function Sidebar() {
    const { handleLogOut, loading } = useLogOut()
    const sidebarItems = [
        {
            icon: <AiFillHome size={25} />,
            text: "Home",
            link: "/"
        },

        {
            icon: <SearchLogo />,
            text: "Search"
        },

        {
            icon: <NotificationsLogo />,
            text: "Notifications"
        },

        {
            icon: <CreatePostLogo />,
            text: "Create",
        },

        {
            icon: <Avatar size={"sm"} name="Burak" src="/profilepic.png" />,
            text: "Profile",
            link: ":username"
        }
    ]
    return (
        <Box
            w={{ base: "70px", md: "240px" }}
            h={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.200"}
            position={"sticky"}
            top={0}
            left={0}
            py={8}
            px={{ base: 2, md: 4 }}
        >
            <Flex direction={"column"} alignItems={{ base: "center", md: "flex-start" }} padding={{ md: 4 }} gap={10} h={"full"}>
                <Link
                    as={RouterLink}
                    to={"/"}
                    w={10}
                    borderRadius={4}
                    display={{ base: "flex", md: "none" }}
                    justifyContent={"center"}
                >
                    <InstagramMobileLogo />
                </Link>

                <Link
                    as={RouterLink}
                    to={"/"}
                    display={{ base: "none", md: "block" }}
                    w={10}
                >
                    <InstagramLogo />
                </Link>

                <Flex direction={"column"} alignItems={{ base: "flex-start", md: "flex-start" }} gap={7}>
                    {sidebarItems.map((item, index) => (
                        <Tooltip
                            key={index}
                            aria-label="A tooltip"
                            hasArrow
                            label={item.text}
                            placement="right"
                            openDelay={500}

                        >
                            <Link
                                to={item.link || null}
                                as={RouterLink}
                                display={"flex"}
                                alignItems={"center"}
                                ml={{ base: 2, md: 0 }}
                                _hover={{
                                    bg: { md: "whiteAlpha.400" }
                                }}
                                padding={{ base: 2, md: 4 }}
                                borderRadius={4}
                                w={{ md: "full" }}
                            >
                                {item.icon}
                                <Text ml={4} display={{ base: "none", md: "block" }}>{item.text}</Text>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>
                <Tooltip
                    aria-label="A tooltip"
                    hasArrow
                    placement="right"
                    openDelay={500}
                    label="Log out"
                >
                    <Flex
                        onClick={handleLogOut}
                        alignItems={"center"}
                        ml={{ base: 2, md: 0 }}
                        _hover={{
                            bg: "whiteAlpha.400"
                        }}
                        padding={{ base: 2, md: 4 }}
                        borderRadius={4}
                        w={"100%"}
                        mt={"auto"}

                    >
                        <BiLogOut size={25} />
                        <Button
                            variant={"ghost"}
                            display={{ base: "none", md: "block" }}
                            _hover={{
                                bg: "transparent"
                            }}
                            isLoading={loading}
                        >
                            Log out
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box >
    )
}

export default Sidebar
