import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react"
import AuthForm from "../../components/AuthForm"

function SignUp() {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"800px"} padding={0} border={"1px "} borderColor={"red"}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="auth.png" alt="phone image" />
                    </Box>

                    <VStack whiteSpace={4} border={"1px solid green"}>
                        <AuthForm />
                        <p>Get the app.</p>
                        <Flex gap={5}>
                            <Image h={10} src="playstore.png" alt="Play store logo"></Image>
                            <Image h={10} src="microsoft.png" alt=" Microsoft logo"></Image>
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default SignUp
