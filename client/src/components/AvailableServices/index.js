import React from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

const AvailableServices = () => {
    return (
        <>
            <div id="available-services-container">
                <Header id="available-services-header" as="h1">Available Services</Header>
                <Header id="available-services-subheader" as="h4">Browse through a variety of services</Header>
                <div id="available-services">
                    <div className="available-services-col">
                        <p className="available-services-emoji">😊</p>
                        <Header className="available-services-col-header" as="h4">Makeup Artists</Header>
                        <Header className="available-services-col-subheader" as="h4">For flawless looks</Header>
                    </div>
                    <div className="available-services-col">
                        <p className="available-services-emoji">📸</p>
                        <Header className="available-services-col-header" as="h4">Photographers</Header>
                        <Header className="available-services-col-subheader" as="h4">Capture memories</Header>
                    </div>
                    <div className="available-services-col">
                        <p className="available-services-emoji">👗</p>
                        <Header className="available-services-col-header" as="h4">Designers</Header>
                        <Header className="available-services-col-subheader" as="h4">Unique creations</Header>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AvailableServices;