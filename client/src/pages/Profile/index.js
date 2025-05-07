import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import ReservationRequest from "../../components/ReservationRequest";
// import DeleteProviderModal from "../../components/DeleteProviderModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Profile = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { screenWidth } = props;
    const [provider, setProviders] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);

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
        <>
            <div id="profile-container">
                <div id="profile">
                    <div className="profile-col">
                        <Image circular src={currentUser.profile_image} />
                    </div>
                    <div className="profile-col">
                        <Header as="h2">{currentUser.first_name} {currentUser.last_name}</Header>
                        <Header as="h4" className="profile-header">
                            Email: {currentUser.email}
                        </Header>
                        <Header as="h4" className="profile-header">
                            Location: {currentUser.location}
                        </Header>
                        <Header as="h4" className="profile-header">
                            Phone: {currentUser.phone_number}
                        </Header>
                        <Header as="h4" className="profile-header">
                            About: {currentUser.about}
                        </Header>
                        <Header as="h4" className="profile-header">

                        </Header>
                    </div>
                    <div className="profile-col">
                        <Header as="h2">My Reservations</Header>
                        <div id="profile-reservations">
                            {reservations.map((reservation, index) => {
                                return (
                                    <div key={index} className="reservation-card-col">
                                        <Link to={`/reservation/${reservation.id}`}>
                                            <div className="reservation-card">
                                                <Image className="reservation-card-image" src={reservation.service_image} draggable="false" />
                                                <div className="reservation-card-service">{reservation.service}</div>
                                                <div className="reservation-card-rate">${reservation.pay_rate}/hr</div>
                                                <div className="reservation-card-distance">{reservation.distance <= 1 ? `${reservation.distance} mile away` : `${reservation.distance} miles away`}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="profile-col">
                        <Header as="h2">My Events</Header>
                        <div id="profile-events">
                            {events.map((event, index) => {
                                return (
                                    <div key={index} className="event-card-col">
                                        <Link to={`/event/${event.id}`}>
                                            <div className="event-card">
                                                <Image className="event-card-image" src={event.service_image} draggable="false" />
                                                <div className="event-card-service">{event.service}</div>
                                                <div className="event-card-rate">${event.pay_rate}/hr</div>
                                                <div className="event-card-distance">{event.distance <= 1 ? `${event.distance} mile away` : `${event.distance} miles away`}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="profile-col">
                        <Header as="h2">My Reviews</Header>
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

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;