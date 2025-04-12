const db = require("../../config");
const jwt = require("jsonwebtoken");
const {
    getAllProviders,
    getProviderById,
    addUserProvider,
    deleteUserProvider,
    updateUserProvider
} = require("../../models/providers");

module.exports = {
    getProviders: (req, res) => {
        console.log("getting all providers");
        db.query(getAllProviders, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    },
    getProvider: (req, res) => {
        console.log("getting provider by id");
        db.query(getProviderById, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(req.params.id);
            return res.status(200).json(data[0]);
        });
    },
    addProvider: (req, res) => {
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
            
            console.log("adding Provider with " + values);

            db.query(addUserProvider, [values], (err) => {
                if (err) return res.status(500).json(err);
                return res.json("Provider added");
            });
        });
    },
    deleteProvider: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Invalid token!");

            const providerId = req.params.id;

            console.log("deleting Provider with id " + providerId + " and user id " + userInfo.id);

            db.query(deleteUserProvider, [providerId, userInfo.id], (err) => {
                if (err) return res.status(500).json("You can only delete your own providers!");
                return res.json("Provider deleted");
            });
        });
    },
    updateProvider: (req, res) => {
        const token = req.cookies.access_token;
        console.log(token);
        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, process.env.SECRET, (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid.");

            const providerId = req.params.id;
            const values = [req.body.text, req.body.rating, req.body.image];

            console.log("updating provider with id " + providerId + " and uid " + userInfo.id);
            console.log(values);

            db.query(updateUserProvider, [...values, providerId, userInfo.id], (err) => {
                console.log(updateUserProvider);
                if (err) return res.status(500).json(err);
                return res.json("provider updated");
            });
        });
    }
};