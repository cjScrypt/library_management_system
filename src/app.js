const express = require("express");
const cors = require("cors");

const { AuthRouter } = require("./api/routes");

module.exports = (app) => {

    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded());
    app.use(cors());

    app.use("/auth", AuthRouter);
}