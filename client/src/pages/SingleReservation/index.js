import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteReviewModal from "../../components/DeleteReviewModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const SingleReservation = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { whichWebsite, screenWidth } = props;
    const [reservation, setReservation] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const reservationId = location.pathname.split("/")[2];
    console.log(currentUser, reservation.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/reservations/${reservationId}`);
                setReservation(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [reservationId]);

    const handleAccess = async () => {
        if (currentUser === null || currentUser.id !== reservation.uid) {
            alert("You cannot edit someone else's reservation!");
        } else {
            navigate(`/edit/${reservationId}`);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser === null || currentUser.id !== reservation.uid) alert("You cannot delete someone else's reservation!");
            await axiosInstance.delete(`/reservations/${reservationId}`);
            navigate("/reservations");
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    return (
        <div id="reservation-container">
            <div id="reservation-header-container">
                <div className="reservation-header-col">
                    <Header as="h1" id="reservation-header">{reservation.first_name} {reservation.last_name} Said</Header>
                </div>
                <div className="reservation-header-col">
                    <Button id="reservation-edit-btn" onClick={handleAccess} icon>
                        {screenWidth <= 516 ? "Edit " : null}
                        <Icon name="edit outline" />
                    </Button>
                    <DeletereservationModal handleDelete={handleDelete} screenWidth={screenWidth} />
                </div>
            </div>
            <div id="reservation">
                <div className="reservation-col">
                    <Rating id="reservation-rating" maxRating={5} rating={reservation.rating} icon="star" size="massive" disabled />
                    <p id="reservation-text">{reservation.text}</p>
                    <p id="reservation-date">{moment(reservation.date).format("MMMM Do YYYY")}</p>
                </div>
                <div className="reservation-col">
                    <Image src={reservation.image} draggable="false" />
                </div>
            </div>
        </div>
    );
}

export default SingleReservation;