const getUserByEmail = `SELECT * FROM users WHERE email = ?`;
const getUserById = `SELECT * FROM users WHERE user_id = ?`;
const getUserIds = `SELECT user_id FROM users`;
const setUserData = `INSERT INTO users (user_id, first_name, last_name, email, password) VALUES (?)`;
const getUser = `SELECT * FROM users WHERE email = ? OR (first_name = ? AND last_name = ?)`;
const resetUserPassword = `UPDATE users SET password = ? WHERE id = ?`;

module.exports = {
    getUserByEmail,
    getUserById,
    getUserIds,
    setUserData,
    getUser,
    resetUserPassword
};