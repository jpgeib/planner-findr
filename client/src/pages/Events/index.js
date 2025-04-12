import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Header, Image, Icon, Rating } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Events = (props) => {

    const { whichWebsite } = props;

    const [events, setEvents] = useState([]);

    const site = whichWebsite(window.location.href, "zuse", "acp", "union");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/events");
                setEvents(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="events-container">
            <div id="events-headers-container">
                <div className="events-headers-col">
                    <Header as="h1" id="events-header">events</Header>
                </div>
                <div className="events-headers-col">
                    <Button as={Link} to="/write" size="massive" icon labelPosition="right" id="write-event-btn">Write A event<Icon id="write-icon" name="edit" /></Button>
                </div>
            </div>
            <p className="events-text">{events.length > 0 ? "Don't take our word for it, listen to our satisfied customers!" : "Looks like we don't have any events yet, you could be the first!"}</p>
            {events.length > 0 ? null : <div id="events-no-result-container">
                <Image id="events-no-result-image" src="https://zuse-inc-bucket.s3.amazonaws.com/no-results-blue.png" draggable="false" />
            </div>}
            <div id="events">
                {events.map((event, index) => {
                    return (
                        event.rating < 3 ? null : <div key={event.id} className="event-card-col">
                            <Link to={`/event/${event.id}`}>
                                <div className="event-card">
                                    <Image className="event-card-image" src={event.image} draggable="false" />
                                    <Rating className="event-card-rating" maxRating={5} rating={event.rating} icon="star" size="huge" disabled />
                                    <div className="event-card-text">{event.text}</div>
                                    <div className="event-card-author">{event.first_name} {event.last_name}</div>
                                    <div className="event-card-date">{moment(event.date).format("MMMM Do YYYY")}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Events;