import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import styles from "./feedpost.module.css"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../../public/assets/constants"
import { useState } from "react"

function FeedPost() {
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    console.log(isLiked);

    function handleLikes() {
        console.log("click");
        if (isLiked) {
            setIsLiked(false)
            setLikesCount(prev => prev - 1)
        } else {
            setIsLiked(true)
            setLikesCount(prev => prev + 1)
        }
    }

    return (
        <div className={styles.feedPost}>
            <div className={styles.feedPostHeader}>
                <Flex alignItems={"center"}>
                    <Avatar src="img1.png" alt="user profile picture" size={"sm"} />
                    <Text ml={3} fontSize={14} fontWeight={"600"}>Ana de armas</Text>
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
            <div className={styles.feedPostFooter}>
                <Flex gap={4}>
                    <Box onClick={handleLikes} cursor={"pointer"}>
                        {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                    </Box>
                    <Box cursor={"pointer"}>
                        <CommentLogo />
                    </Box>
                </Flex>
                <div>user name and caption</div>
                <div>veiw all 100 comments</div>
                <div>input for comment</div>
            </div>
        </div>
    )
}

export default FeedPost
