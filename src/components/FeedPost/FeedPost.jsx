import { Avatar, Button, Flex, Image, Text } from "@chakra-ui/react"
import styles from "./feedpost.module.css"

function FeedPost() {
    return (
        <div className={styles.feedPost}>
            <div className={styles.feedPostHeader}>
                <Flex alignItems={"center"}>
                    <Avatar src="img1.png" alt="user profile picture" size={"sm"} />
                    <Text ml={3} fontSize={14} fontWeight={"600"}>Mohamed Zaki</Text>
                    <Text ml={3} fontSize={12} color={"gray.500"}>• 1w </Text>
                </Flex>
                <div>
                    <Button
                        fontSize={14}
                        color={"blue.500"}
                        fontWeight={"bold"}
                        _hover={{
                            color: "white"
                        }}
                        bg={"none"}
                        transition={"0.2s ease-in-out"}
                    >
                        Unfollow
                    </Button>
                </div>
            </div>
            <div className={styles.feedPostBody}>
                <Image src="img1.png" alt="user profile picture" />
            </div>
            <div className={styles.feedPostFooter}>feedpost footer</div>
        </div>
    )
}

export default FeedPost
