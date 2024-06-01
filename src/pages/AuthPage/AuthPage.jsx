import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react"
import AuthForm from "../../components/AuthForm"

function AuthPage() {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"800px"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image w={"600px"} src="auth.png" alt="phone image" />
                    </Box>

                    <VStack spacing={4} w={"md"}>
                        <AuthForm />
                        <Text>Get the app.</Text>
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

export default AuthPage
