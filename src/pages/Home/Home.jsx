import FeedPost from "../../components/FeedPost/FeedPost"
import styles from "../../styles/home.module.css"

function Home() {
    return (
        <main className={styles.mainContainer}>
            <section className={styles.feedPostsContainer}>
                <FeedPost />
                <FeedPost />
            </section>
            <section className={styles.suggestedUsersContainer}>
                suggested users
            </section>
        </main>
    )
}

export default Home
