require('dotenv').config()

const API_URL = process.env.API_URL
const PORT = process.env.PORT
const REDIS_PORT = process.env.REDIS_PORT

module.exports = {
    API_URL,
    PORT,
    REDIS_PORT
}