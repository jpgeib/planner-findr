const router = require("express").Router();
const authRoutes = require("./authRoutes");
const reviewRoutes = require("./reviewRoutes");
const uploadRoutes = require("./uploadRoutes");
const testRoutes = require("./testRoutes");

router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);
router.use("/test", testRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;