const getAllReviews = `SELECT r.id, r.uid, first_name, last_name, profile_image, text, rating, date, image FROM users u JOIN reviews r ON u.id = r.uid WHERE rating >= ? ORDER BY date DESC;`;
const getReviewById = `SELECT r.id, r.uid, first_name, last_name, profile_image, text, rating, date, image FROM users u JOIN reviews r ON u.id = r.uid WHERE r.id = ?;`;
const addUserReview = `INSERT INTO reviews (uid, text, rating, date, image) VALUES (?);`;
const deleteUserReview = `DELETE FROM reviews WHERE id = ? AND uid = ?;`;
const updateUserReview = `UPDATE reviews SET text = ?, rating = ?, image = ? WHERE id = ? AND uid = ?;`;

module.exports = {
    getAllReviews,
    getReviewById,
    addUserReview,
    deleteUserReview,
    updateUserReview
};