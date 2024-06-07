import { Link as ReactRouter } from 'react-router-dom'
import { Box, Text, Link } from '@chakra-ui/react'

function SuggestedFooter() {
    return (
        <Box fontSize={12} color={"gray.500"} mt={5}>
            <Text as={"span"}>© 2024 Built by{" "}</Text>
            <Link
                as={ReactRouter}
                to={"https://github.com/MohamedZakidev"}
                target="_blank"
                color={"blue.500"}
                fontSize={14}
                letterSpacing={".5px"}
            >
                Mohamed Zaki
            </Link>
        </Box>
    )
}

export default SuggestedFooter
