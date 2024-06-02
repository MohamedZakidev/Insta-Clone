import { Box, VStack, Image, Input, Button, Flex, Text, FormControl } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { email, password, confirmPassword } = formData

    const navigate = useNavigate()
    const isError = !email || !password //confirmpassword to be added

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }


    function handleAuth() {
        if (isError) {
            alert("please fill all input fields")
            return
        }
        navigate("/")
    }


    return (
        <>
            <Box border={"1px"} borderColor={"gray.300"} padding={5}>
                <VStack spacing={4} padding={5}>
                    <Image src="logo.png" alt="Instagram  logo" />

                    {/*  */}
                    <FormControl display={"flex"} flexDirection={"column"} gap={4}>
                        <Input
                            type="email"
                            placeholder="Email"
                            fontSize={14}
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            fontSize={14}
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />

                        {!isLogin ? (
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                fontSize={14}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        ) : null}

                        <Button
                            colorScheme="blue"
                            size={"sm"}
                            alignSelf={"stretch"}
                            type="submit"
                            onClick={handleAuth}
                        >
                            {isLogin ? "Log in" : "Sign up"}
                        </Button>
                    </FormControl>
                    {/*  */}

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
