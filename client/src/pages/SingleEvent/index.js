import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteEventModal from "../../components/DeleteEventModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const SingleEvent = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { whichWebsite, screenWidth } = props;
    const [event, setEvent] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const eventId = location.pathname.split("/")[2];
    console.log(currentUser, event.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/events/${eventId}`);
                setEvent(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [eventId]);

    const handleAccess = async () => {
        if (currentUser === null || currentUser.id !== event.uid) {
            alert("You cannot edit someone else's event!");
        } else {
            navigate(`/edit/${eventId}`);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser === null || currentUser.id !== event.uid) alert("You cannot delete someone else's event!");
            await axiosInstance.delete(`/events/${eventId}`);
            navigate("/events");
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    return (
        <div id="event-container">
            <div id="event-header-container">
                <div className="event-header-col">
                    <Header as="h1" id="event-header">{event.first_name} {event.last_name} Said</Header>
                </div>
                <div className="event-header-col">
                    <Button id="event-edit-btn" onClick={handleAccess} icon>
                        {screenWidth <= 516 ? "Edit " : null}
                        <Icon name="edit outline" />
                    </Button>
                    <DeleteEventModal handleDelete={handleDelete} screenWidth={screenWidth} />
                </div>
            </div>
            <div id="event">
                <div className="event-col">
                    <Rating id="event-rating" maxRating={5} rating={event.rating} icon="star" size="massive" disabled />
                    <p id="event-text">{event.text}</p>
                    <p id="event-date">{moment(event.date).format("MMMM Do YYYY")}</p>
                </div>
                <div className="event-col">
                    <Image src={event.image} draggable="false" />
                </div>
            </div>
        </div>
    );
}

export default SingleEvent;