import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./style.css";

const ReservationRequest = () => {

    const [submitted, setSubmitted] = useState(false);
    const { register } = useForm();
    const navigate = useNavigate();
    const FORM_ENDPOINT = "https://www.formbackend.com/f/6853a413e9e988ff";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservationReq = document.getElementById("reservation-request");
        const formData = new FormData(reservationReq);

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
            <div id="reservation-request-container">
                <form
                    action={FORM_ENDPOINT}
                    method="POST"
                    onSubmit={handleSubmit}
                    id="reservation-request"
                >
                    <div className="reservation-request-col">
                        <h1 id="reservation-request-header">Request Booking</h1>
                    </div>
                    <div className="reservation-request-col">
                        <label className="reservation-request-label" htmlFor="reservation-request-input">Email</label>
                        <input name="email" type="email" required id="reservation-request-date-input" placeholder="Enter Your Email" />
                    </div>
                    <div className="reservation-request-col">
                        <label className="reservation-request-label" htmlFor="reservation-request-input">Event</label>
                        <input name="event" type="text" id="reservation-request-time-input" placeholder="Enter Name of Event" />
                    </div>
                    <div className="reservation-request-col">
                        <label className="reservation-request-label" htmlFor="reservation-request-input">Date</label>
                        <input name="date" type="text" required id="reservation-request-date-input" placeholder="Enter Date of Event" />
                    </div>
                    <div className="reservation-request-col">
                        <label className="reservation-request-label" htmlFor="reservation-request-input">Time</label>
                        <input name="time" type="text" id="reservation-request-time-input" placeholder="Enter Time of Event" />
                    </div>
                    <div className="reservation-request-col">
                        <button type="submit" id="reservation-request-submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReservationRequest;