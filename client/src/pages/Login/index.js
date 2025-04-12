import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Header, Message } from "semantic-ui-react";

import "./style.css";

const Login = (props) => {

    const { currentUser, notAuthorized, alreadyLoggedIn, login } = props.auth;
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [err, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        };
    };

    // useEffect(() => {
    //     notAuthorized();
    // }, [currentUser]);

    useEffect(() => {
        alreadyLoggedIn();
    }, [currentUser]);

    return (
        <div id="login-container">
            <Header id="login-header" as="h1">Log In</Header>
            <form onSubmit={handleSubmit} id="login-form">
                <div className="login-form-col">
                    <input id="login-email-input" required onChange={handleChange} value={inputs.email} name="email" type="email" placeholder="Email" />
                </div>
                <div className="login-form-col">
                    <input id="login-password-input" required onChange={handleChange} value={inputs.password} name="password" type="password" placeholder="Password" />
                </div>
                <div className="login-form-col">
                    <Button id="login-submit-btn" fluid type="submit">Log In</Button>
                </div>
                <div className="login-form-col">
                    <Message id="reg-msg">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </Message>
                </div>
                <div className="login-form-col">
                    {err ? <Message id="err-msg" error>{err}</Message> : null}
                </div>
            </form>
        </div>
    );
};

export default Login;