import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const ProfileEvents = (props) => {

    const { currentUser } = props;

    const [events, setEvents] = useState([]);
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
        <div id="profile-events">
            {events.map((event, index) => {
                return (
                    event.event_uid !== currentUser.id ? null : <div key={index} className="profile-event-card-col">
                        {/* <Link to={`/event/${event.id}`}> */}
                            <div className="profile-event-card">
                                <Image className="profile-event-card-image" src={event.event_image} draggable="false" />
                                <div className="profile-event-card-name">{event.name}</div>
                                <div className="profile-event-card-date">{moment(event.date).format("MMMM Do YYYY")}</div>
                            </div>
                        {/* </Link> */}
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileEvents;
