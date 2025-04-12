import React, { useState, useEffect } from "react";
import { Header, Rating, Image, Button, Icon } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteReviewModal from "../../components/DeleteReviewModal";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const SingleProvider = (props) => {

    const { currentUser, notAuthorized } = props.auth;
    const { whichWebsite, screenWidth } = props;
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

    const handleAccess = async () => {
        if (currentUser === null || currentUser.id !== provider.uid) {
            alert("You cannot edit someone else's provider!");
        } else {
            navigate(`/edit/${providerId}`);
        }
    };

    const handleDelete = async () => {
        try {
            if (currentUser === null || currentUser.id !== provider.uid) alert("You cannot delete someone else's provider!");
            await axiosInstance.delete(`/providers/${providerId}`);
            navigate("/providers");
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    return (
        <div id="provider-container">
            <div id="provider-header-container">
                <div className="provider-header-col">
                    <Header as="h1" id="provider-header">{provider.first_name} {provider.last_name} Said</Header>
                </div>
                <div className="provider-header-col">
                    <Button id="provider-edit-btn" onClick={handleAccess} icon>
                        {screenWidth <= 516 ? "Edit " : null}
                        <Icon name="edit outline" />
                    </Button>
                    <DeleteproviderModal handleDelete={handleDelete} screenWidth={screenWidth} />
                </div>
            </div>
            <div id="provider">
                <div className="provider-col">
                    <Rating id="provider-rating" maxRating={5} rating={provider.rating} icon="star" size="massive" disabled />
                    <p id="provider-text">{provider.text}</p>
                    <p id="provider-date">{moment(provider.date).format("MMMM Do YYYY")}</p>
                </div>
                <div className="provider-col">
                    <Image src={provider.image} draggable="false" />
                </div>
            </div>
        </div>
    );
}

export default SingleProvider;