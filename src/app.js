const express = require("express");
const cors = require("cors");
const configSwagger = require("./utils/swagger");

const {
    AuthRouter, BookRouter, UserRouter
} = require("./api/routes");

module.exports = () => {

    const app = express();

    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded());
    app.use(cors());

    configSwagger(app);

    app.use("/auth", AuthRouter);
    app.use("/books", BookRouter);
    app.use("/users", UserRouter);

    return app
}