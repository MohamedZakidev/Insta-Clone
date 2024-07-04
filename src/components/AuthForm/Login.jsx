import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Alert, AlertDescription, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import useLogin from "../../hooks/useLogin"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData

    const [showPassword, setShowPassword] = useState(false)

    const { loading, error, handleLogin } = useLogin()

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    return (
        <>
            <Input
                type="email"
                placeholder="Email"
                fontSize={14}
                name="email"
                value={email}
                onChange={handleChange}
            />
            <InputGroup>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    fontSize={14}
                    name="password"
                    value={password}
                    onChange={handleChange}
                />

                <InputRightElement>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {error?.message &&
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    <AlertDescription>{error.message}</AlertDescription>
                </Alert>
            }
            <Button
                colorScheme="blue"
                size={"sm"}
                alignSelf={"stretch"}
                type="submit"
                isLoading={loading}
                onClick={() => handleLogin(formData)}
            >
                Log in
            </Button>
        </>
    )
}

export default Login
