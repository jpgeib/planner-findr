import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteReviewModal from "../../components/DeleteReviewModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Review = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { whichWebsite, screenWidth } = props;
    const [review, setReview] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const reviewId = location.pathname.split("/")[2];
    console.log(currentUser, review.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/reviews/${reviewId}`);
                setReview(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [reviewId]);

    const handleAccess = async () => {
        if (currentUser === null || currentUser.id !== review.uid) {
            alert("You cannot edit someone else's review!");
        } else {
            navigate(`/edit/${reviewId}`);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser === null || currentUser.id !== review.uid) alert("You cannot delete someone else's review!");
            await axiosInstance.delete(`/reviews/${reviewId}`);
            navigate("/reviews");
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    return (
        <div id="review-container">
            <div id="review-header-container">
                <div className="review-header-col">
                    <Header as="h1" id="review-header">{review.first_name} {review.last_name} Said</Header>
                </div>
                <div className="review-header-col">
                    <Button id="review-edit-btn" onClick={handleAccess} icon>
                        {screenWidth <= 516 ? "Edit " : null}
                        <Icon name="edit outline" />
                    </Button>
                    <DeleteReviewModal handleDelete={handleDelete} screenWidth={screenWidth} />
                </div>
            </div>
            <div id="review">
                <div className="review-col">
                    <Rating id="review-rating" maxRating={5} rating={review.rating} icon="star" size="massive" disabled />
                    <p id="review-text">{review.text}</p>
                    <p id="review-date">{moment(review.date).format("MMMM Do YYYY")}</p>
                </div>
                <div className="review-col">
                    <Image src={review.image} draggable="false" />
                </div>
            </div>
        </div>
    );
}

export default Review;