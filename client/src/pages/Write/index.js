import React, { useState, useEffect } from "react";
import { Header, Rating, Image } from "semantic-ui-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import OtherReviews from "../../components/OtherReviews";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Write = (props) => {

    const { whichWebsite } = props;
    const { currentUser, notAuthorized } = props.auth;
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const site = whichWebsite(window.location.href, "zuse", "acp", "union");
    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("writeFile", file);
            const res = await axiosInstance.post(`${site}/upload`, formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleRate = async () => {
        const reviewRating = document.getElementById("write-review-rating");
        Object.keys(reviewRating.children).forEach(key => {
            reviewRating.children[key].addEventListener("click", () => {
                setRating(reviewRating.children[key].getAttribute("aria-posinset"));
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            const res = await axiosInstance.post(`${site}/reviews`, {
                rating: rating,
                text: text,
                date: moment().format("YYYY-MM-DD"),
                image: imgUrl.url
            });
            setSubmitted(true);
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        if (!currentUser) {
            alert("You must be logged in to write a review.");
            navigate("/reviews");
        }
    }, [currentUser]);

    useEffect(() => {
        handleRate();
    }, [rating]);

    if (submitted) {
        return (
            <>
                <OtherReviews />
            </>
        );
    }

    return (
        <div id="write-container">
            <Header as="h1" id="write-header">Tell Us How We Did</Header>
            <p className="write-text">
                We appreciate your feedback. Please take a moment to rate and write a review of your experience with us.
            </p>
            <form id="write-form">
                <div id="write-form-container">
                    <div className="write-form-col">
                        <label id="rating-label" htmlFor="write-rating">Rating:</label>
                        <Rating id="write-review-rating" name="rating" value={rating} maxRating={5} rating={rating} icon="star" size="huge" />
                    </div>
                    <div className="write-form-col">
                        <label id="write-upload-label" htmlFor="writeFile">Upload Product Image:</label>
                    </div>
                    <div className="write-form-col">
                        <input type="file" id="write-file" name="writeFile" accept=".png, .jpg, .jpeg" required onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="write-form-col">
                        <label id="write-review-label" htmlFor="write-text">Review:</label>
                        <br />
                        <br />
                        <textarea id="write-review" name="write-text" placeholder="Write a review..." value={text} onChange={(e) => setText(e.target.value)} required />
                    </div>
                    <div className="write-form-col">
                        <button onClick={handleSubmit} type="submit" id="write-submit-btn">Submit Review</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Write;