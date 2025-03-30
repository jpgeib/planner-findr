/*

eventController: Contains all CRUD procedures for functionality regarding event
management.

getEvents(): Retrieves all event records from the events table, joining with select
columns from users, reservations, and providers. These will only be visible to
organizers of the event, and other relevant parties.
- 
getEvent(): Retrieves a specific event record based on the req.params.id of the
client request matching with the record id, to then allow that specific event’s data
to be displayed on the front-end, but will only be visible to the authorized users.
- 
addEvent(): Adds a new record to the events table with the following data: name,
type, date, location, and budget. This data will later be extracted by getEvents()
and getEvent(). The user’s accessToken from login() must be present for this
function to take effect.
- 
deleteEvent(): Deletes a user’s event where the event id and event uid of the
main owner both match the targeted event’s id and the current user’s id. The
user’s accessToken created from login() must be present for this function to work.
- 
updateEvent(): Updates a user’s event where the event id and event uid of the
main owner both match the targeted event’s id and the current user’s id, inserting
new values for one of or all of the following columns: name, type, date, location,
and budget. The user’s accessToken created from login() must be present for this
function to work.

*/

const db = require("../../config"); // MySQL connection
const jwt = require("jsonwebtoken");

module.exports = {
    // Get all events (only visible to event organizers and relevant parties)
    getEvents: (req, res) => {
        // Verify user authentication using JWT
        const userId = req.user.user_id;

        const query = `
            SELECT events.id, events.name, events.type, events.date, events.location, events.budget,
                   users.name AS organizer_name, reservations.status AS reservation_status, providers.name AS provider_name
            FROM events
            JOIN users ON events.organizer_id = users.id
            LEFT JOIN reservations ON events.id = reservations.event_id
            LEFT JOIN providers ON events.provider_id = providers.id
            WHERE events.organizer_id = ? OR reservations.user_id = ? OR providers.user_id = ?;
        `;
        
        db.query(query, [userId, userId, userId], (err, results) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            res.json(results);
        });
    },

    // Get a specific event (only visible to authorized users)
    getEvent: (req, res) => {
        const eventId = req.params.id;
        const userId = req.user.user_id;

        const query = `
            SELECT events.id, events.name, events.type, events.date, events.location, events.budget,
                   users.name AS organizer_name, reservations.status AS reservation_status, providers.name AS provider_name
            FROM events
            JOIN users ON events.organizer_id = users.id
            LEFT JOIN reservations ON events.id = reservations.event_id
            LEFT JOIN providers ON events.provider_id = providers.id
            WHERE events.id = ? AND (events.organizer_id = ? OR reservations.user_id = ? OR providers.user_id = ?);
        `;
        
        db.query(query, [eventId, userId, userId, userId], (err, results) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            if (results.length === 0) 
                return res.status(404).json({ message: "Event not found or access denied" });
            res.json(results[0]);
        });
    },

    // Add a new event (user must be authenticated)
    addEvent: (req, res) => {
        const { name, type, date, location, budget } = req.body;
        const organizerId = req.user.user_id; // Get user from JWT

        if (!name || !type || !date || !location || !budget) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const query = `
            INSERT INTO events (name, type, date, location, budget, organizer_id)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        db.query(query, [name, type, date, location, budget, organizerId], (err, result) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            res.status(201).json({ message: "Event added successfully", eventId: result.insertId });
        });
    },

    // Delete an event (user must be the event's organizer)
    deleteEvent: (req, res) => {
        const eventId = req.params.id;
        const userId = req.user.user_id;

        const query = "DELETE FROM events WHERE id = ? AND organizer_id = ?";

        db.query(query, [eventId, userId], (err, result) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) 
                return res.status(404).json({ message: "Event not found or unauthorized" });
            res.json({ message: "Event deleted successfully" });
        });
    },

    // Update an event (user must be the event's organizer)
    updateEvent: (req, res) => {
        const eventId = req.params.id;
        const userId = req.user.user_id;
        const { name, type, date, location, budget } = req.body;

        const query = `
            UPDATE events SET name = ?, type = ?, date = ?, location = ?, budget = ?
            WHERE id = ? AND organizer_id = ?;
        `;

        db.query(query, [name, type, date, location, budget, eventId, userId], (err, result) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            if (result.affectedRows === 0) 
                return res.status(404).json({ message: "Event not found or unauthorized" });
            res.json({ message: "Event updated successfully" });
        });
    }
};
