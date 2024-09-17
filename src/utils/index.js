const bcrypt = require("bcrypt");


const generateSalt = async (saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);

    return salt;
}


const hashPassword = async (password) => {
    const salt = await generateSalt(10);
    const hash = await bcrypt.hash(password, salt);
}


module.exports = {
    hashPassword,
}