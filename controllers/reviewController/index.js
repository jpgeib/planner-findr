const db = require("../../config");
const queries = require("../../models/reviews");

// Get All Reviews
exports.getAllReviews = (req, res) => {
    const { minRating = 1 } = req.query;

    db.query(queries.getAllReviews, [minRating], (error, results) => {
        if (error) return res.status(500).json({ message: "Server error", error });
        res.status(200).json(results);
    });
};

// Get Review by ID
exports.getReviewById = (req, res) => {
    const { id } = req.params;

    db.query(queries.getReviewById, [id], (error, results) => {
        if (error) return res.status(500).json({ message: "Server error", error });
        if (results.length === 0) return res.status(404).json({ message: "Review not found" });
        res.status(200).json(results[0]);
    });
};

// Add a Review
exports.addUserReview = (req, res) => {
    const { uid, text, rating } = req.body;
    const date = new Date(); // Automatically set current date

    // Validate rating
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    db.query(queries.addUserReview, [uid, text, rating, date], (error, result) => {
        if (error) return res.status(500).json({ message: "Server error", error });
        res.status(201).json({ message: "Review added successfully", reviewId: result.insertId });
    });
};

// Delete a Review
exports.deleteUserReview = (req, res) => {
    const { id, uid } = req.params;

    db.query(queries.deleteUserReview, [id, uid], (error, result) => {
        if (error) return res.status(500).json({ message: "Server error", error });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Review not found or unauthorized" });
        res.status(200).json({ message: "Review deleted successfully" });
    });
};

// Update a Review
exports.updateUserReview = (req, res) => {
    const { id, uid } = req.params;
    const { text, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    db.query(queries.updateUserReview, [text, rating, id, uid], (error, result) => {
        if (error) return res.status(500).json({ message: "Server error", error });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Review not found or unauthorized" });
        res.status(200).json({ message: "Review updated successfully" });
    });
};