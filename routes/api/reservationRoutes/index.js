const router = require("express").Router();
const { addReservation, getReservations, getReservation, updateReservation, deleteReservation } = require("../../../controllers/reservationController");

router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", addReservation);
router.delete("/:id", deleteReservation);
router.put("/:id", updateReservation);

module.exports = router;