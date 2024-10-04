const express = require("express");

const app = require("./app");
const { PORT } = require("./config");

const main = async () => {
    app.listen(PORT, () => {
        console.log(`======= App running on port ${PORT} =======`);
    });
}

main();