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

    return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)"
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
                        <ProfilePost img="/img1.png" />
                        <ProfilePost img="/img2.png" />
                        <ProfilePost img="/img3.png" />
                        <ProfilePost img="/img4.png" />
                    </>
                )
            }
        </Grid>
    )
}

export default ProfilePosts
