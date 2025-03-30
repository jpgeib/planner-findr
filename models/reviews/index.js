const getAllReviews = `SELECT id, uid, text, rating, date FROM reviews WHERE rating >= ? ORDER BY date DESC;`;

const getReviewById = `SELECT id, uid, text, rating, date FROM reviews WHERE id = ?;`;

const addUserReview = `INSERT INTO reviews (uid, text, rating, date) VALUES (?, ?, ?, ?);`;

const deleteUserReview = `DELETE FROM reviews WHERE id = ? AND uid = ?;`;

const updateUserReview = `UPDATE reviews SET text = ?, rating = ? WHERE id = ? AND uid = ?;`;

module.exports = {
    getAllReviews,
    getReviewById,
    addUserReview,
    deleteUserReview,
    updateUserReview
};