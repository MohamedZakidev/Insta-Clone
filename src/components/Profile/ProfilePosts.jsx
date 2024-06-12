import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ProfilePost from "./ProfilePost"

function ProfilePosts() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])
    console.log("dsadsd");

    return (
        <Grid
            border={"1px solid red"}
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)"
            }}
            gap={1}
        >
            {isLoading ? (
                [0, 1, 2, 3, 4, 5].map((_, index) => (
                    <GridItem key={index}>
                        <Skeleton>
                            <Box h={"300px"}>content wrapped</Box>
                        </Skeleton>
                    </GridItem>
                ))
            ) :
                (
                    <>
                        <ProfilePost />
                    </>
                )
            }
        </Grid>
    )
}

export default ProfilePosts
