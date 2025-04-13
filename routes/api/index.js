const router = require("express").Router();
const authRoutes = require("./authRoutes");
const reviewRoutes = require("./reviewRoutes");
const eventRoutes = require("./eventRoutes");
const reservationRoutes = require("./reservationRoutes");
const providerRoutes = require("./providerRoutes");
const uploadRoutes = require("./uploadRoutes");
const testRoutes = require("./testRoutes");

router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);
router.use("/events", eventRoutes);
router.use("/reservations", reservationRoutes);
router.use("/providers", providerRoutes);
router.use("/test", testRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;