const express = require("express");
const { PORT } = require("./config");

const main = async () => {
    const app = express();

    app.listen(PORT, () => {
        console.log(`======= App running on port ${PORT} =======`);
    });
}

main();