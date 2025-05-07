import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const ProfileReviews = (props) => {

    const { currentUser } = props;

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
        <div id="profile-reviews">
            {reviews.map((review, index) => {
                return (
                    review.uid !== currentUser.id ? null : <div key={review.id} className="profile-review-card-col">
                        {/* <Link to={`/review/${review.id}`}> */}
                        <div className="profile-review-card">
                            <Image className="profile-review-card-image" src={review.image} draggable="false" />
                            <Rating className="profile-review-card-rating" maxRating={5} rating={review.rating} icon="star" size="huge" disabled />
                            <div className="profile-review-card-text">{review.text}</div>
                            <div className="profile-review-card-author">
                                <Image src={review.profile_image} size="mini" circular />
                                <div className="profile-review-card-author-name">{review.first_name} {review.last_name}</div>
                            </div>
                            <div className="profile-review-card-date">{moment(review.date).format("MMMM Do YYYY")}</div>
                        </div>
                        {/* </Link> */}
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileReviews;