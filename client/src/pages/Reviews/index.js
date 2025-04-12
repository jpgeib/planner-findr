import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Header, Image, Icon, Rating } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Reviews = (props) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/reviews");
                setReviews(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="reviews-container">
            <div id="reviews-headers-container">
                <div className="reviews-headers-col">
                    <Header as="h1" id="reviews-header">Reviews</Header>
                </div>
                <div className="reviews-headers-col">
                    <Button as={Link} to="/reviews/write" size="massive" icon labelPosition="right" id="write-review-btn">Write A Review<Icon id="write-icon" name="edit" /></Button>
                </div>
            </div>
            <p className="reviews-text">{reviews.length > 0 ? "Don't take our word for it, listen to our satisfied customers!" : "Looks like we don't have any reviews yet, you could be the first!"}</p>
            {reviews.length > 0 ? null : <div id="reviews-no-result-container">
                <Image id="reviews-no-result-image" src="https://zuse-inc-bucket.s3.amazonaws.com/no-results-blue.png"  />
            </div>}
            <div id="reviews">
                {reviews.map((review, index) => {
                    return (
                        review.rating < 3 ? null : <div key={review.id} className="review-card-col">
                            <Link to={`/review/${review.id}`}>
                                <div className="review-card">
                                    <Image className="review-card-image" src={review.image} draggable="false" />
                                    <Rating className="review-card-rating" maxRating={5} rating={review.rating} icon="star" size="huge" disabled />
                                    <div className="review-card-text">{review.text}</div>
                                    <div className="review-card-author">{review.first_name} {review.last_name}</div>
                                    <div className="review-card-date">{moment(review.date).format("MMMM Do YYYY")}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Reviews;