import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReservationRequest from "../../components/ReservationRequest";
// import DeleteProviderModal from "../../components/DeleteProviderModal";
import { axiosInstance } from "../../utils/api";

const Profile = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { screenWidth } = props;
    const [provider, setProvider] = useState({});
    const [reviews, setReviews] = useState([]);

    return (
        <>
            <div id="profile-container">
                <div id="profile">
                    <div className="profile-col">
                        <Image />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;