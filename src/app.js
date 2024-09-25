const express = require("express");
const cors = require("cors");
const configSwagger = require("./utils/swagger");

const {
    AdminRouter, AuthRouter,
    BookRouter, UserRouter
} = require("./api/routes");

module.exports = (app) => {

    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded());
    app.use(cors());

    configSwagger(app);

    app.use("/auth", AuthRouter);
    app.use("/admin", AdminRouter);
    app.use("/user", UserRouter);
}