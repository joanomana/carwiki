import { useEffect, useState } from "react";
import styles from "@/style/review.module.css";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    const defaultReviews = [
        {
            rating: 5,
            comment: "Amazing website! Found all the car info I needed.",
            date: "2025-01-01T10:00:00.000Z",
        },
        {
            rating: 4,
            comment: "Great experience overall. Could use more brands.",
            date: "2025-01-02T14:30:00.000Z",
        },
        {
            rating: 5,
            comment: "Very clean UI and accurate data. I love it!",
            date: "2025-01-03T18:45:00.000Z",
        },
    ];

    useEffect(() => {
        const stored = localStorage.getItem("reviews");
        const userReviews = stored ? JSON.parse(stored) : [];

        const hasDefault = defaultReviews.every(def =>
            userReviews.some(r => r.comment === def.comment && r.rating === def.rating)
        );

        const combinedReviews = hasDefault
            ? userReviews
            : [...defaultReviews, ...userReviews];

        localStorage.setItem("reviews", JSON.stringify(combinedReviews));
        setReviews(combinedReviews);
    }, []);

    return (
        <div className={styles.reviewPage}>
            <h1>What People Are Saying</h1>
            <div className={styles.reviewsList}>
                {reviews.map((review, index) => (
                    <div className={styles.reviewCard} key={index}>
                        <div className={styles.stars}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < review.rating ? styles.filled : styles.empty}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <p>{review.comment}</p>
                        <span className={styles.timestamp}>
                            {new Date(review.date).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
