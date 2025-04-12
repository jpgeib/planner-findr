import React, { useEffect, useState } from "react";
import { Header, Button, Message} from "semantic-ui-react";
// import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/api";

import "./style.css";

const ForgotPassword = (props) => {

    const { whichWebsite } = props;
    const { currentUser, notAuthorized } = props.auth;
    const [inputs, setInputs] = useState({ email: "" });
    const [submitted, setSubmitted] = useState(false);
    const [err, setError] = useState(null);
    // const navigate = useNavigate();
    const site = whichWebsite(window.location.href, "zuse", "acp", "union");

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`${site}/auth/forgot`, inputs);
            setSubmitted(true);
        } catch (err) {
            setError(err.response.data);
        };
    };

    // useEffect(() => { 
    //     notAuthorized();
    // }, [currentUser]);

    if (submitted) {
        return (
            <div id="forgot-container">
                <Header as="h1" id="forgot-header">Forgot Password</Header>
                <Message id="forgot-msg">If an account with that email exists, a password reset link has been sent.</Message>
            </div>
        );
    };

    return (
        <div id="forgot-container">
            <Header as="h1" id="forgot-header">Forgot Password</Header>
            <form onSubmit={handleSubmit} id="forgot-form">
                <div className="forgot-form-col">
                    <input id="forgot-email-input" required onChange={handleChange} value={inputs.email} name="email" type="email" placeholder="Email" />
                </div>
                <div className="forgot-form-col">
                    <Button id="forgot-submit-btn" fluid type="submit">Send Reset Link</Button>
                </div>
                <div className="forgot-form-col">
                    {err ? <Message id="err-msg" error>{err}</Message> : null}
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;