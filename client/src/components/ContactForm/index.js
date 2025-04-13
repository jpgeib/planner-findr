import React from "react";
import { Header, Button } from "semantic-ui-react";

import "./style.css";

const HomeContactForm = () => {
    return (
        <>
            <div id="contact-form-container">
                <div id="contact-form">
                    <div className="contact-form-col">
                        <h1 id="contact-form-header">Can't Find What You're Looking For?</h1>
                        <h4 id="contact-form-subheader">Let us know, and we'll help you find the right service provider</h4>
                    </div>
                    <div className="contact-form-col">
                        <label className="contact-form-label" htmlFor="contact-form-input">Name</label>
                        <input name="name" type="text" required id="contact-form-name-input" placeholder="Enter Name Here" />
                    </div>
                    <div className="contact-form-col">
                        <label className="contact-form-label" htmlFor="contact-form-input">Email</label>
                        <input name="name" type="email" id="contact-form-email-input" placeholder="Enter Email Here" />
                    </div>
                    <div className="contact-form-col">
                        <label className="contact-form-label" htmlFor="contact-form-input">Service Needed</label>
                        <input id="contact-form-service-input" placeholder="Enter Needed Service Here" />
                    </div>
                    <div className="contact-form-col">
                        <Button id="contact-form-submit-btn">Submit</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContactForm;