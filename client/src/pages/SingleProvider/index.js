import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import DeleteProviderModal from "../../components/DeleteProviderModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const SingleProvider = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { screenWidth } = props;
    const [provider, setProvider] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const providerId = location.pathname.split("/")[2];
    console.log(currentUser, provider.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/providers/${providerId}`);
                setProvider(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [providerId]);

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    return (
        <div id="provider-container">
            <div id="provider-banner-container">
                <div id="provider-banner">
                    <div className="provider-banner-col">
                        <Image id="provider-banner-profile-image" src={provider.service_image} draggable="false" />
                    </div>
                    <div className="provider-banner-col">
                        <Header id="provider-service" as="h2">{provider.service}</Header>
                        <Header id="provider-type" as="h4">{provider.type}</Header>
                        <Header id="provider-rate" as="h2">${provider.pay_rate}/hr</Header>
                        
                    </div>
                    <div className="provider-banner-col">
                        <Button id="provider-request-booking-btn">Request Booking</Button>
                        <Button id="provider-message-btn">Message</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProvider;