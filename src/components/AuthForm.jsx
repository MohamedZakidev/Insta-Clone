import { Box, VStack, Image, Input, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"

function AuthForm() {
    const isLogin = useState(true)
    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
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

            <Box border={"1px solid gray"} padding={5} w={"full"}>
                <Flex alignItems={"center"} justifyContent={"space-between"} border={"1px solid gray"}>
                    <Text>Don&apos;t have an account? <Button padding={0} bg={"none"}>SignUp</Button></Text>
                </Flex>
            </Box>
        </>
    )
}

export default AuthForm
