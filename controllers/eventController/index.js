const db = require("../../config");
const jwt = require("jsonwebtoken");
const {
    getAllEvents,
    getEventById,
    addUserEvent,
    deleteUserEvent,
    updateUserEvent
} = require("../../models/events");

module.exports = {
    getEvents: (req, res) => {
        console.log("getting all events");
        db.query(getAllEvents, [3], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },
    getEvent: (req, res) => {
        console.log("getting event by id");
        db.query(getEventById, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(req.params.id);
            return res.status(200).json(data[0]);
        });
    },
    addEvent: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const values = [
                userInfo.id,
                req.body.text,
                req.body.rating,
                req.body.date,
                req.body.image 
            ];
            
            console.log("adding event with " + values);

            db.query(addUserEvent, [values], (err) => {
                if (err) return res.status(500).json(err);
                return res.json("event added");
            });
        });
    },
    deleteEvent: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const eventId = req.params.id;

            console.log("deleting event with id " + eventId + " and user id " + userInfo.id);

            db.query(deleteUserEvent, [eventId, userInfo.id], (err) => {
                if (err) return res.status(500).json("You can only delete your own Events!");
                return res.json("Event deleted");
            });
        });
    },
    updateEvent: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid.");

            const eventId = req.params.id;
            const values = [req.body.text, req.body.rating, req.body.image];

            console.log("updating event with id " + eventId + " and uid " + userInfo.id);
            console.log(values);

            db.query(updateUserEvent, [...values, eventId, userInfo.id], (err) => {
                console.log(updateUserEvent);
                if (err) return res.status(500).json(err);
                return res.json("Event updated");
            });
        });
    }
};