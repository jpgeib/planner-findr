/*
eventRoutes: Establishes the network of event routes.
- 
require(): Imports an npm module from local package.json to be used in the file.
- 
require(“express”).Router(): Establishes a new Router instance to contain a
bundle of express routes. Saved in a variable called “router”
.
- 
router.post(): Uses the POST method to create and send data to the database to
create the respective record(s) its controller is meant to make.
- 
router.get(): Uses the GET method to extract whatever data the controller is
meant to retrieve.
- 
router.delete(): Uses the DELETE method to delete the targeted record(s) from
the database with its appropriate controller function.
- 
router.update(): Uses the PUT method to update the target record(s) from the
database with its appropriate controller function
*/

const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/eventController");
const { authenticateToken, authorizeOrganizer } = require("../../middleware/authMiddleware"); // Middleware for auth and authorization

// Get all events (accessible to all authenticated users)
router.get("/events", authenticateToken, eventController.getEvents);

// Get a specific event (accessible to all authenticated users, but authorization may apply)
router.get("/events/:id", authenticateToken, eventController.getEvent);

// Add a new event (only accessible to authenticated users)
router.post("/events", authenticateToken, eventController.addEvent);

// Delete an event (only the event organizer can delete it)
router.delete("/events/:id", authenticateToken, authorizeOrganizer, eventController.deleteEvent);

// Update an event (only the event organizer can update it)
router.put("/events/:id", authenticateToken, authorizeOrganizer, eventController.updateEvent);

module.exports = router;