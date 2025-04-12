import React from "react";
import { Header, Button } from "semantic-ui-react";

import "./style.css";

const HomeContactForm = () => {
    return (
        <>
            <div id="home-contact-form-container">
                <div id="home-contact-form">
                    <div className="home-contact-form-col">
                        <h1 id="home-contact-form-header">Can't Find What You're Looking For?</h1>
                        <h4 id="home-contact-form-subheader">Let us know, and we'll help you find the right service provider</h4>
                    </div>
                    <div className="home-contact-form-col">
                        <label className="home-contact-form-label" htmlFor="home-contact-form-input">Name</label>
                        <input name="name" type="text" required id="home-contact-form-name-input" placeholder="Enter Name Here" />
                    </div>
                    <div className="home-contact-form-col">
                        <label className="home-contact-form-label" htmlFor="home-contact-form-input">Email</label>
                        <input name="name" type="email" id="home-contact-form-email-input" placeholder="Enter Email Here" />
                    </div>
                    <div className="home-contact-form-col">
                        <label className="home-contact-form-label" htmlFor="home-contact-form-input">Service Needed</label>
                        <input id="home-contact-form-service-input" placeholder="Enter Needed Service Here" />
                    </div>
                    <div className="home-contact-form-col">
                        <Button id="home-contact-form-submit-btn">Submit</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContactForm;