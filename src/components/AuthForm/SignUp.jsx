import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        username: "",
    })
    const { email, password, username, fullName } = formData

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

            <Button
                colorScheme="blue"
                size={"sm"}
                alignSelf={"stretch"}
                type="submit"
            >
                Sign up
            </Button>
        </>
    )
}

export default SignUp
