const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library Management System",
            description: "CRUD API for managing libraries",
            version: "1.0.0",
        },
    },
    apis: ["./src/api/docs/*.yaml", "./src/api/routes/*.routes.js"]
    
}



module.exports = (app) => {

    const openapiSpec = swaggerJsDoc(swaggerOptions);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
}