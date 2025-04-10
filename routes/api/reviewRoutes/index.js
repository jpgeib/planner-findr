const router = require("express").Router();
const { addReview, getReviews, getReview, updateReview, deleteReview } = require("../../../controllers/reviewController");

router.get("/", getReviews);
router.get("/:id", getReview);
router.post("/", addReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

module.exports = router;