const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");
const prisma = require("../database/prisma/client");


const clearAllSchemas = async () => {
    try {
        // await prisma.record.deleteMany({});
        // await prisma.book.deleteMany({});
        // await prisma.reservation.deleteMany({});
        await prisma.user.deleteMany({});
    } catch(error) {
        console.log(`Error clearing schema: ${error}`);
    }
}


const excludeFields = (user, keys) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
}

const formatResponse = (res, statusCode, data={}, headers={}) => {
    return res.status(statusCode).json({ data });
}


const generateJwtSignature = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "2 days", algorithm: "HS256" });
}


const generateSalt = async (saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);

    return salt;
}


const hashPassword = async (password) => {
    const salt = await generateSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}


const verifyPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);

    return match;
}


module.exports = {
    clearAllSchemas,
    excludeFields,
    formatResponse,
    generateJwtSignature,
    hashPassword,
    verifyPassword,
}