import { Avatar, Flex, Text, Link } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

function SuggestedHeader() {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Link as={RouterLink} to="#">
                <Avatar size={"sm"} src="profilepic.png" />
            </Link>
            <Text fontWeight={"bold"}>Ana de Armas</Text>
            <Link
                as={RouterLink}
                fontSize={14}
                fontWeight={"600"}
                color={"blue.400"}
                style={{ textDecoration: "none" }}
                _hover={{
                    color: "white"
                }}
                letterSpacing={"1px"}
            >
                Log out
            </Link>
        </Flex>

    )
}

export default SuggestedHeader
