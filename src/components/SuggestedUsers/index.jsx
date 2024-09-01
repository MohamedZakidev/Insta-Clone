import { Flex, Link, Text } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import { Link as ReactRouter } from "react-router-dom"
import SuggestedUser from "./SuggestedUser"
import SuggestedFooter from "./SuggestedFooter"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"

function SuggestedUsers() {
    const { isLoading, suggestedUsers } = useGetSuggestedUsers()
    if (isLoading) return null

    return (
        <Flex direction={"column"} gap={4} fontSize={14}>
            <SuggestedHeader />
            {suggestedUsers.length ? (
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
            ) : null}
            {suggestedUsers.map(user => {
                return (
                    <SuggestedUser
                        user={user}
                        key={user.id}
                    />
                )
            })}
            <SuggestedFooter />
        </Flex >
    )
}

export default SuggestedUsers
