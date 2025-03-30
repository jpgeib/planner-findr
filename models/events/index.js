/*

events
- 
id PRIMARY KEY AUTO INCREMENT
- 
event_id VARCHAR(36) NOT NULL
- 
name VARCHAR(45) NOT NULL
- 
type VARCHAR(32) NOT NULL
- 
date DATETIME NOT NULL
- 
location VARCHAR(45) NOT NULL
- 
budget DECIMAL NOT NULL
- 

*/

// SQL queries for event management
const getAllEvents = `SELECT events.id, events.name, events.type, events.date, events.location, events.budget,
                              users.first_name AS organizer_name
                       FROM events
                       JOIN users ON events.organizer_id = users.user_id
                       ORDER BY events.date DESC`;

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