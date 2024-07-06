import { Box, VStack, Image, Button, Flex, Text, FormControl } from "@chakra-ui/react"
import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import GoogleAuth from "./GoogleAuth"

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <>
            <Box border={"1px"} borderColor={"gray.300"} padding={5}>
                <VStack spacing={4} padding={5}>
                    <Image src="logo.png" alt="Instagram  logo" />

                    {/*  */}
                    <FormControl display={"flex"} flexDirection={"column"} gap={4}>
                        {isLogin ? <Login /> : <SignUp />}
                    </FormControl>
                    {/*  */}

                    <Flex alignItems={"center"} gap={4} w={"full"} my={4}>
                        <Box flex={2} h={"1px"} bg={"gray.500"}></Box>
                        <Text>OR</Text>
                        <Box flex={2} h={"1px"} bg={"gray.500"}></Box>
                    </Flex>

                    <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
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
