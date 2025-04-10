const db = require("../../config");
const jwt = require("jsonwebtoken");
const {
    getAllReviews,
    getReviewById,
    addUserReview,
    deleteUserReview,
    updateUserReview
} = require("../../models/reviews");

module.exports = {
    getReviews: (req, res) => {
        console.log("getting all reviews");
        db.query(getAllReviews, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },
    getReview: (req, res) => {
        console.log("getting review by id");
        db.query(getReviewById, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(req.params.id);
            return res.status(200).json(data[0]);
        });
    },
    addReview: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const values = [
                userInfo.id,
                req.body.text,
                req.body.rating,
                req.body.date,
                req.body.image 
            ];
            
            console.log("adding review with " + values);

            db.query(addUserReview, [values], (err) => {
                if (err) return res.status(500).json(err);
                return res.json("Review added");
            });
        });
    },
    deleteReview: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const reviewId = req.params.id;

            console.log("deleting review with id " + reviewId + " and user id " + userInfo.id);

            db.query(deleteUserReview, [reviewId, userInfo.id], (err) => {
                if (err) return res.status(500).json("You can only delete your own reviews!");
                return res.json("Review deleted");
            });
        });
    },
    updateReview: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid.");

            const reviewId = req.params.id;
            const values = [req.body.text, req.body.rating, req.body.image];

            console.log("updating review with id " + reviewId + " and uid " + userInfo.id);
            console.log(values);

            db.query(updateUserReview, [...values, reviewId, userInfo.id], (err) => {
                console.log(updateUserReview);
                if (err) return res.status(500).json(err);
                return res.json("Review updated");
            });
        });
    }
};