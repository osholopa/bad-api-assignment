require('dotenv').config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT
const REDIS_CONFIG = process.env.REDIS_URL || 6379

module.exports = {
    API_URL,
    PORT,
    REDIS_CONFIG
}