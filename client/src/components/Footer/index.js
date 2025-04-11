import React from "react";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

const Footer = () => {
    return (
        <>
            <div id="footer-container">
                <div id="footer">
                    <div className="footer-col">
                        <Header className="footer-header" as="h3">© 2024 Planner Findr. All Rights Reserved</Header>
                    </div>
                    <div className="footer-col">
                        <Header className="footer-header" as="h3">Privacy Policy</Header>
                    </div>
                    <div className="footer-col">
                        <Header className="footer-header" as="h3">Terms of Service</Header>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;