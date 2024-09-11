import styles from "./feedpost.module.css"
import { Image } from '@chakra-ui/react'
import FeedPostFooter from './FeedPostFooter'
import useGetUserProfileById from "../../hooks/useGetUserProfileByUid"
import FeedPostHeader from "./FeedPostHeader"

function FeedPost({ post }) {
    const { userProfile } = useGetUserProfileById(post.createdBy)
    return (
        <>
            <FeedPostHeader post={post} creatorProfile={userProfile} />
            <div className={styles.feedPostBody}>
                <Image src={post.imageURL} alt="feed post image" />
            </div>
            <FeedPostFooter post={post} userProfile={userProfile} />
        </>
    )
}

export default FeedPost
