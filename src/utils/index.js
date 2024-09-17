const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");


const formatResponse = (res, statusCode, data={}, headers={}) => {
    return res.status(statusCode).json({ data });
}


const generateJwtSignature = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}


const generateSalt = async (saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);

    return salt;
}


const hashPassword = async (password) => {
    const salt = await generateSalt(10);
    const hash = await bcrypt.hash(password, salt);
}


const verifyPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);

    return match;
}


module.exports = {
    formatResponse,
    generateJwtSignature,
    hashPassword,
    verifyPassword,
}