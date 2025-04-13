import React from "react";
import { Button } from "semantic-ui-react";

import "./style.css";

const ReservationRequest = () => {
    return (
        <>
            <div id="reservation-request-container">
                <div id="reservation-request">
                    <div className="reservation-request-col">
                        <h1 id="reservation-request-header">Request Booking</h1>
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
                        <Button id="reservation-request-submit-btn">Submit</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationRequest;