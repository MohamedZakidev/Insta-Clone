import styles from "./feedpost.module.css"

function FeedPost() {
    return (
        <div className={styles.feedPost}>
            <div className={styles.feedPostHeader}>
                <div>dasdasdsa</div>
                <div>dasdasdsa</div>
            </div>
            <div className={styles.feedPostBody}>feedpost body</div>
            <div className={styles.feedPostFooter}>feedpost footer</div>
        </div>
    )
}

export default FeedPost
