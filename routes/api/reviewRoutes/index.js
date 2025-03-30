const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/reviewController");
const { authenticateUser } = require("../../middlewares/authMiddleware");

// Routes
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", authenticateUser, reviewController.addUserReview);
router.delete("/:id/:uid", authenticateUser, reviewController.deleteUserReview);
router.put("/:id/:uid", authenticateUser, reviewController.updateUserReview);

module.exports = router;