
const getAllEvents = `SELECT * FROM events`;

const getEventById = `SELECT events.id, events.name, events.type, events.date, events.location, events.budget,
                             users.first_name AS organizer_name
                      FROM events
                      JOIN users ON events.organizer_id = users.user_id
                      WHERE events.id = ?`;

const addEvent = `INSERT INTO events (event_id, name, type, date, location, budget, organizer_id)
                  VALUES (?, ?, ?, ?, ?, ?, ?)`;

const deleteEvent = `DELETE FROM events WHERE id = ? AND organizer_id = ?`;

const updateEvent = `UPDATE events SET name = ?, type = ?, date = ?, location = ?, budget = ?
                    WHERE id = ? AND organizer_id = ?`;

module.exports = {
    getAllEvents,
    getEventById,
    addEvent,
    deleteEvent,
    updateEvent
};