import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileReviews from "../../components/ProfileReviews";
import ProfileEvents from "../../components/ProfileEvents";
import ProfileReservations from "../../components/ProfileReservations";
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
                        <Image id="profile-image" src={currentUser.profile_image} />
                    </div>
                    <div className="profile-col">
                        <Header id="profile-name" as="h2">{currentUser.first_name} {currentUser.last_name}</Header>
                        <Header as="h4" className="profile-header">
                            Email
                        </Header>
                        <p className="profile-text">{currentUser.email}</p>
                        <Header as="h4" className="profile-header">
                            Location
                        </Header>
                        <p className="profile-text">{currentUser.location}</p>
                        <Header as="h4" className="profile-header">
                            Phone
                        </Header>
                        <p className="profile-text">{currentUser.phone_number}</p>
                        <Header as="h4" className="profile-header">
                            About
                        </Header>
                        <p className="profile-text">{currentUser.about}</p>
                    </div>
                    <div className="profile-col">
                        <Header as="h2">My Reservations</Header>
                        <ProfileReservations currentUser={currentUser} />
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