import React from "react";
import { Header } from "semantic-ui-react";

import "./style.css";

const HomeContactForm = () => {
    return (
        <>
            <div id="home-contact-form-container">
                <div id="home-contact-form">
                    <div className="home-contact-form-col">
                        <h1 id="home-contact-form-header">Contact Us</h1>
                        <h4 id="home-contact-form-subheader">We would love to hear from you!</h4>
                    </div>
                    <div className="home-contact-form-col">
                        <input id="home-contact-form-input" placeholder="Your Name" />
                    </div>
                    <div className="home-contact-form-col">
                        <input id="home-contact-form-input" placeholder="Your Email" />
                    </div>
                    <div className="home-contact-form-col">
                        <textarea id="home-contact-form-textarea" placeholder="Your Message"></textarea>
                    </div>
                    <div className="home-contact-form-col">
                        <button id="home-contact-form-submit-btn">Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContactForm;