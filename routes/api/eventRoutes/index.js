const router = require("express").Router();
const { addEvent, getEvents, getEvent, updateEvent, deleteEvent } = require("../../../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

module.exports = router;