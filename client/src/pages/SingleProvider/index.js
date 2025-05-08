import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReservationRequest from "../../components/ReservationRequest";
// import DeleteProviderModal from "../../components/DeleteProviderModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const SingleProvider = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { screenWidth } = props;
    const [provider, setProvider] = useState({});
    const [reviews, setReviews] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const providerId = location.pathname.split("/")[2];
    console.log(currentUser, provider.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resProviders = await axiosInstance.get(`/providers/${providerId}`);
                const resReviews = await axiosInstance.get(`/reviews`);
                setProvider(resProviders.data);
                setReviews(resReviews.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [providerId]);

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    console.log(reviews);
    return (
        <div id="provider-container">
            <div id="provider-banner-container">
                <div id="provider-banner">
                    <div className="provider-banner-col">
                        <Image id="provider-banner-profile-image" src={provider.service_image} draggable="false" />
                    </div>
                    <div className="provider-banner-col">
                        <Header id="provider-service" as="h2">{provider.service}</Header>
                        <Header id="provider-type" as="h4">{provider.type}</Header>
                        <Header id="provider-rate" as="h2">${provider.pay_rate}/hr</Header>
                    </div>
                    <div className="provider-banner-col">
                        <Button id="provider-request-booking-btn">Request Booking</Button>
                        <Button id="provider-message-btn">Message</Button>
                    </div>
                </div>
            </div>
            <div id="provider-reviews-container">
                <Header id="provider-reviews-header" as="h2">Ratings & Reviews</Header>
                <div id="provider-reviews">
                    {reviews.map((review, index) => {
                        return (
                            review.pid !== provider.id ? null : <div key={review.id} className="provider-review-card-col">
                                {/* <Link to={`/review/${review.id}`}> */}
                                <div className="provider-review-card">
                                    <Image className="provider-review-card-image" src={review.image} draggable="false" />
                                    <Rating className="provider-review-card-rating" maxRating={5} rating={review.rating} icon="star" size="huge" disabled />
                                    <div className="provider-review-card-text">{review.text}</div>
                                    <div className="provider-review-card-author">
                                        <Image src={review.profile_image} size="mini" circular />
                                        <div className="provider-review-card-author-name">{review.first_name} {review.last_name}</div>
                                    </div>
                                    <div className="provider-review-card-date">{moment(review.date).format("MMMM Do YYYY")}</div>
                                </div>
                                {/* </Link> */}
                            </div>
                        );
                    })}
                </div>
            </div>
            <ReservationRequest />
        </div>
    );
}

export default SingleProvider;