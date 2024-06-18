import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputRightElement, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword.js"

function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        username: "",
    })
    const { email, password, username, fullName } = formData

    const [showPassword, setShowPassword] = useState(false)

    const { loading, error, signup } = useSignUpWithEmailAndPassword()

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

            <Input
                type="text"
                placeholder="Username"
                fontSize={14}
                name="username"
                value={username}
                onChange={handleChange}
            />
            <Input
                type="text"
                placeholder="Full name"
                fontSize={14}
                name="fullName"
                value={fullName}
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
                onClick={() => signup(formData)}
            >
                Sign up
            </Button>
        </>
    )
}

export default SignUp
