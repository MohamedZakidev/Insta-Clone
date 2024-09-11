import FeedPosts from "../../components/FeedPost/FeedPosts"
import SuggestedUsers from "../../components/SuggestedUsers"
import useGetFeedPosts from "../../hooks/useGetFeedPosts"
import styles from "../../styles/home.module.css"

function Home() {
    return (
        <main className={styles.mainContainer}>
            <section className={styles.feedPostsContainer}>
                <FeedPosts />
            </section>
            <section className={styles.suggestedUsersContainer}>
                <SuggestedUsers />
            </section>
        </main>
    )
}

export default Home
