const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PG_DATABASE_URL: process.env.PG_DATABASE_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    PORT: 5003,
}