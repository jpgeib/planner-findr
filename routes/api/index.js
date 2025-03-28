const router = require("express").Router();
const authRoutes = require("./authRoutes");
const reviewRoutes = require("./reviewRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);
// router.use("/upload", uploadRoutes);

module.exports = router;