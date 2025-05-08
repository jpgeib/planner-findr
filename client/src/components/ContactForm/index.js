import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Header, Button } from "semantic-ui-react";

import "./style.css";

const ContactForm = () => {

    const [submitted, setSubmitted] = useState(false);
    const { register } = useForm();
    const FORM_ENDPOINT = "https://www.formbackend.com/f/6853a413e9e988ff";

    const handleSubmit = async (e) => {

    };

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
                        <input name="email" type="email" id="contact-form-email-input" placeholder="Enter Email Here" />
                    </div>
                    <div className="contact-form-col">
                        <label className="contact-form-label" htmlFor="contact-form-input">Service Needed</label>
                        <input name="service" type="text" id="contact-form-service-input" placeholder="Enter Needed Service Here" />
                    </div>
                    <div className="contact-form-col">
                        <Button id="contact-form-submit-btn">Submit</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;