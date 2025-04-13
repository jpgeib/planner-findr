const getAllProviders = "SELECT * FROM providers";
const getProviderById = "SELECT * FROM providers WHERE id = ?";

module.exports = {
    getAllProviders,
    getProviderById
}