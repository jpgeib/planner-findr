import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Header, Image, Icon, Rating } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Reservations = (props) => {

    const { whichWebsite } = props;

    const [reservations, setReservations] = useState([]);

    const site = whichWebsite(window.location.href, "zuse", "acp", "union");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get("/reservations");
                setReservations(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, []);

    return (
        <div id="reservations-container">
            <div id="reservations-headers-container">
                <div className="reservations-headers-col">
                    <Header as="h1" id="reservations-header">reservations</Header>
                </div>
                <div className="reservations-headers-col">
                    <Button as={Link} to="/write" size="massive" icon labelPosition="right" id="write-reservation-btn">Write A reservation<Icon id="write-icon" name="edit" /></Button>
                </div>
            </div>
            <p className="reservations-text">{reservations.length > 0 ? "Don't take our word for it, listen to our satisfied customers!" : "Looks like we don't have any reservations yet, you could be the first!"}</p>
            {reservations.length > 0 ? null : <div id="reservations-no-result-container">
                <Image id="reservations-no-result-image" src="https://zuse-inc-bucket.s3.amazonaws.com/no-results-blue.png" draggable="false" />
            </div>}
            <div id="reservations">
                {reservations.map((reservation, index) => {
                    return (
                        reservation.rating < 3 ? null : <div key={reservation.id} className="reservation-card-col">
                            <Link to={`/reservation/${reservation.id}`}>
                                <div className="reservation-card">
                                    <Image className="reservation-card-image" src={reservation.image} draggable="false" />
                                    <Rating className="reservation-card-rating" maxRating={5} rating={reservation.rating} icon="star" size="huge" disabled />
                                    <div className="reservation-card-text">{reservation.text}</div>
                                    <div className="reservation-card-author">{reservation.first_name} {reservation.last_name}</div>
                                    <div className="reservation-card-date">{moment(reservation.date).format("MMMM Do YYYY")}</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Reservations;