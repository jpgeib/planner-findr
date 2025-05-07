import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const ProfileReservations = (props) => {

    const { currentUser } = props;

    const [reservations, setReservations] = useState([]);
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
        <div id="profile-reservations">
            {reservations.map((reservation, index) => {
                return (
                    reservation.reservation_uid !== currentUser.id ? null : <div key={index} className="profile-reservation-card-col">
                        {/* <Link to={`/reservation/${reservation.id}`}> */}
                            <div className="profile-reservation-card">
                                <Image className="profile-reservation-card-image" src={reservation.reservation_image} draggable="false" />
                                <div className="profile-reservation-card-name">{reservation.name}</div>
                                <div className="profile-reservation-card-date">{moment(reservation.date).format("MMMM Do YYYY")}</div>
                            </div>
                        {/* </Link> */}
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileReservations;
