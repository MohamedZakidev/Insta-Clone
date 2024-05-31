import { Box, VStack, Image } from "@chakra-ui/react"

function AuthForm() {
    return (
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src="logo.png" />
            </VStack>
        </Box>
    )
}

export default AuthForm
