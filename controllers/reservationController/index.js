const db = require("../../config");
const jwt = require("jsonwebtoken");
const {
    getAllReservations,
    getReservationById,
    addUserReservation,
    deleteUserReservation,
    updateUserReservation
} = require("../../models/reservations");

module.exports = {
    getReservations: (req, res) => {
        console.log("getting all reservations");
        db.query(getAllReservations, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },
    getReservation: (req, res) => {
        console.log("getting reservation by id");
        db.query(getReservationById, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(req.params.id);
            return res.status(200).json(data[0]);
        });
    },
    addReservation: (req, res) => {
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
            
            console.log("adding reservation with " + values);

            db.query(addUserReservation, [values], (err) => {
                if (err) return res.status(500).json(err);
                return res.json("Reservation added");
            });
        });
    },
    deleteReservation: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const reservationId = req.params.id;

            console.log("deleting reservation with id " + reservationId + " and user id " + userInfo.id);

            db.query(deleteUserReservation, [reservationId, userInfo.id], (err) => {
                if (err) return res.status(500).json("You can only delete your own reservations!");
                return res.json("Reservation deleted");
            });
        });
    },
    updateReservation: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid.");

            const reservationId = req.params.id;
            const values = [req.body.text, req.body.rating, req.body.image];

            console.log("updating reservation with id " + reservationId + " and uid " + userInfo.id);
            console.log(values);

            db.query(updateUserReservation, [...values, reservationId, userInfo.id], (err) => {
                console.log(updateUserReservation);
                if (err) return res.status(500).json(err);
                return res.json("Reservation updated");
            });
        });
    }
};