import { Flex, GridItem, Image, Text } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"

// eslint-disable-next-line react/prop-types
function ProfilePost({ img }) {
    return (
        <GridItem
            position={"relative"}
            cursor={"pointer"}
            border={"1px solid"}
            borderColor={"whiteAlpha.300"}
            borderRadius={4}
            aspectRatio={1 / 1}
        >
            <Flex
                opacity={0}
                _hover={{ opacity: 1 }}
                position={"absolute"}
                bg={"blackAlpha.700"}
                top={0}
                bottom={0}
                right={0}
                left={0}
                transition={"all 0.3s"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={6}
            >
                <Flex alignItems={"center"}>
                    <AiFillHeart size={20} />
                    <Text fontWeight={"bold"} ml={2}>7</Text>
                </Flex>
                <Flex alignItems={"center"}>
                    <FaComment size={20} />
                    <Text fontWeight={"bold"} ml={2}>7</Text>
                </Flex>
            </Flex>
            <Image src={img} w={"full"} h={"full"} objectFit={"cover"} alt="profile post" />

        </GridItem>
    )
}

export default ProfilePost
