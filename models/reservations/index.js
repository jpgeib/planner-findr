const getAllReservations = `SELECT r.id, r.uid, first_name, last_name, text, rating, date, image FROM users u JOIN reservations r ON u.id = r.uid WHERE rating >= ? ORDER BY date DESC;`;
const getReservationById = `SELECT r.id, r.uid, first_name, last_name, text, rating, date, image FROM users u JOIN reservations r ON u.id = r.uid WHERE r.id = ?;`;
const addUserReservation = `INSERT INTO reservations (uid, text, rating, date, image) VALUES (?);`;
const deleteUserReservation = `DELETE FROM reservations WHERE id = ? AND uid = ?;`;
const updateUserReservation = `UPDATE reservations SET text = ?, rating = ?, image = ? WHERE id = ? AND uid = ?;`;

module.exports = {
    getAllReservations,
    getReservationById,
    addUserReservation,
    deleteUserReservation,
    updateUserReservation
};