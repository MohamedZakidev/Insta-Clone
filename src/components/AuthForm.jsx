import { Box, VStack, Image, Input, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
            <Box border={"1px"} borderColor={"gray.300"} padding={5}>
                <VStack spacing={4} padding={5}>
                    <Image src="logo.png" alt="Instagram  logo" />
                    <Input
                        type="email"
                        placeholder="Email"
                        fontSize={14}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        fontSize={14}
                    />

                    {!isLogin ? (
                        <Input
                            type="password"
                            placeholder="Confirm password"
                            fontSize={14}
                        />
                    ) : null}

                    <Button colorScheme="blue" size={"sm"} alignSelf={"stretch"}>
                        {isLogin ? "Log in" : "Sign up"}
                    </Button>


                    <Flex alignItems={"center"} gap={4} w={"full"} my={4}>
                        <Box flex={2} h={"1px"} bg={"gray.500"}></Box>
                        <Text>OR</Text>
                        <Box flex={2} h={"1px"} bg={"gray.500"}></Box>
                    </Flex>

                    <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                        <Image w={"20px"} src="google.png" />
                        <Text>Log in with Google</Text>
                    </Flex>
                </VStack>
            </Box>

            <Box border={"1px"} borderColor={"gray.300"} padding={3} w={"full"}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Text>
                        {isLogin ?
                            "Don't have an account?" :
                            "Already have an account?"
                        }
                    </Text>
                    <Button fontSize={"sm"} ml={2} variant={"link"} color={"blue.500"}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default AuthForm
