import React, { useState, useEffect } from "react";
import { Header, Rating } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/api";
import moment from "moment";

import "./style.css";

const Edit = (props) => {

    const { whichWebsite } = props;
    const { currentUser, notAuthorized } = props.auth;
    const [review, setReview] = useState({});
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState(null);

    const site = whichWebsite(window.location.href, "zuse", "acp", "union");
    const location = useLocation();
    const navigate = useNavigate();
    const reviewId = location.pathname.split("/")[2];

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
        const reviewRating = document.getElementById("edit-review-rating");
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
            if (currentUser.id !== review.uid) alert("You cannot edit someone else's review!");
            const res = await axiosInstance.put(`${site}/reviews/${reviewId}`, {
                rating: rating,
                text: text,
                date: moment().format("YYYY-MM-DD"),
                image: imgUrl.url
            }, { withCredentials: true });
            navigate("/reviews");
        } catch (err) {
            console.log(err);
        };
    };

    const handleAccess = () => {
        if (userId) {
            if (currentUser.id !== userId) {
                alert("You cannot edit someone else's review!");
                navigate("/reviews");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`${site}/reviews/${reviewId}`);
                setReview(res.data);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [reviewId]);

    useEffect(() => {
        setText(review.text);
        setRating(review.rating);
        setFile(review.image);
        setUserId(review.uid);
    }, [review]);

    useEffect(() => {
        notAuthorized();
    }, [currentUser]);


    useEffect(() => {
        handleRate();
    }, [rating]);

    useEffect(() => {
        handleAccess();
    }, [userId]);

    return (
        <div id="edit-container">
            <Header as="h1" id="edit-header">Need to Change Anything?</Header>
            <p className="edit-text">
                You can adjust your rating, review, or image here.
            </p>
            <form id="edit-form">
                <div id="edit-form-container">
                    <div className="edit-form-col">
                        <label id="rating-label" htmlFor="edit-rating">Rating:</label>
                        <Rating id="edit-review-rating" name="rating" value={rating} maxRating={5} rating={rating} icon="star" size="huge" />
                    </div>
                    <div className="edit-form-col">
                        <label id="edit-upload-label" htmlFor="writeFile">Upload Product Image:</label>
                    </div>
                    <div className="edit-form-col">
                        <input type="file" id="edit-file" name="writeFile" accept=".png, .jpg, .jpeg" required onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className="edit-form-col">
                        <label id="edit-review-label" htmlFor="edit-text">Review:</label>
                        <br />
                        <br />
                        <textarea id="edit-review" name="edit-text" placeholder="Write a review..." value={text} onChange={(e) => setText(e.target.value)} required />
                    </div>
                    <div className="edit-form-col">
                        <button onClick={handleSubmit} type="submit" id="edit-submit-btn">Submit Review</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Edit;