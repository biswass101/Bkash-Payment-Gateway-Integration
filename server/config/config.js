require('dotenv').config();
const config = {
    port: process.env.port,
    db: process.env.db_url,
}

module.exports = config;