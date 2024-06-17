import { Flex, Image, Text } from "@chakra-ui/react"

function GoogleAuth() {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <Image w={"20px"} src="google.png" />
            <Text>Log in with Google</Text>
        </Flex>
    )
}

export default GoogleAuth
