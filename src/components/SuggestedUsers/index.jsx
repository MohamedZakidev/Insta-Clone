import { Flex, Link, Text } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import { Link as ReactRouter } from "react-router-dom"
import SuggestedUser from "./SuggestedUser"
import SuggestedFooter from "./SuggestedFooter"

function SuggestedUsers() {
    return (
        <Flex direction={"column"} gap={4} fontSize={14}>
            <SuggestedHeader />
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text>Suggested for you</Text>
                <Link as={ReactRouter}
                    _hover={{
                        color: "gray.400"
                    }}
                >
                    See all
                </Link>
            </Flex>
            <SuggestedUser />
            <SuggestedUser />
            <SuggestedUser />
            <SuggestedFooter />

        </Flex >
    )
}

export default SuggestedUsers
