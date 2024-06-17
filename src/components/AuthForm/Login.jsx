import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData

    const [showPassword, setShowPassword] = useState(false)

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
            <Button
                colorScheme="blue"
                size={"sm"}
                alignSelf={"stretch"}
                type="submit"
            >
                Log in
            </Button>
        </>
    )
}

export default Login
