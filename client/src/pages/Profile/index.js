import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileReviews from "../../components/ProfileReviews";
import ProfileEvents from "../../components/ProfileEvents";
// import ReservationRequest from "../../components/ReservationRequest";
// import DeleteProviderModal from "../../components/DeleteProviderModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Profile = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { screenWidth } = props;
    const [reviews, setReviews] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);
    console.log(events);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resReviews = await axiosInstance.get("/reviews");
                const resEvents = await axiosInstance.get("/events");
                setReviews(resReviews.data);
                setEvents(resEvents.data);
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
                        <ProfileEvents currentUser={currentUser} />
                    </div>
                    <div className="profile-col">
                        <Header as="h2">My Reviews</Header>
                        <ProfileReviews currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;