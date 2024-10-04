const express = require("express");

const configureApp = require("./app");
const { PORT } = require("./config");

const main = async () => {
    const app = configureApp();

    app.listen(PORT, () => {
        console.log(`======= App running on port ${PORT} =======`);
    });
}

main();