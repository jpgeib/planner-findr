import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./style.css";

const ContactForm = () => {

    const [submitted, setSubmitted] = useState(false);
    const { register } = useForm();
    const navigate = useNavigate();
    const FORM_ENDPOINT = "https://www.formbackend.com/f/6853a413e9e988ff";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const contactForm = document.getElementById("contact-form");
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
                },
                body: formData
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Form response was not ok");
                }
                setSubmitted(true);
            }).catch((err) => {
                e.target.submit();
            });
        } catch (err) {
            console.error("Error submitting form:", err);
        };
    };

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                navigate("/providers");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [submitted, navigate]);

    if (submitted) {
        return (
            <>
                <div id="thank-you-container">
                    <h2>Thank you!</h2>
                    <div>We'll be in touch soon.</div>
                </div>
            </>
        );
    };

    return (
        <>
            <div id="contact-form-container">
                <form
                    action={FORM_ENDPOINT}
                    method="POST"
                    onSubmit={handleSubmit}
                    id="contact-form"
                >
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
                        <button id="contact-form-submit-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;