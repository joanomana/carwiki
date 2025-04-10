"use client";

import { useState } from "react";
import Slider from "@/components/Slider";
import Tab from "@/components/Tabs";
import Style from "@/style/view.module.css";

export default function View() {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
        rating,
        comment,
        date: new Date().toISOString(),
        };

        const stored = localStorage.getItem("reviews");
        const reviews = stored ? JSON.parse(stored) : [];
        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        setRating(0);
        setHovered(0);
        setComment("");
        alert("Thanks for your feedback!");
    };

    return (
        <div className="view">
        <Slider />
        <Tab />
        <div className={Style.body}>
            <div className={Style.reviewSection}>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit} className={Style.reviewForm}>
                <div className={Style.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                    key={star}
                    className={`${Style.star} ${
                        (hovered || rating) >= star ? Style.filled : ""
                    }`}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    >
                    ★
                    </span>
                ))}
                </div>
                <textarea
                className={Style.textarea}
                placeholder="Write your comments..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                />
                <button className={Style.button} type="submit">Submit</button>
            </form>
            </div>
        </div>
        </div>
    );
}
