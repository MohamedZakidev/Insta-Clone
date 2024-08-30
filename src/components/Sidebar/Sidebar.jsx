import { Link as RouterLink } from "react-router-dom"
import useLogOut from "../../hooks/useLogOut"
import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react"
import { InstagramLogo, InstagramMobileLogo } from "../../../public/assets/constants"
import { BiLogOut } from "react-icons/bi"
import SidebarItems from "./SidebarItems"

function Sidebar() {
    const { handleLogOut, loading } = useLogOut()

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

                <Flex direction={"column"} alignItems={{ base: "flex-start", md: "flex-start" }} w={"full"} gap={7}>
                    {/* sidebar items live here */}
                    <SidebarItems />
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
