const { body, matchedData, validationResult } = require("express-validator");

const { ValidationError } = require("../../utils/appErrors");


const getRequestData = (req) => {
    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
        handleValidationResult(vResult.array());
    }

    const data = {}
    data["body"] = matchedData(req, { locations: ["body"] });

    return data;
}

const handleValidationResult = (validationResult) => {
    const fieldsError = {}

    validationResult.forEach((error, index) => {
        const fieldName = error["path"];
        const errorMessage = error["msg"];

        fieldsError[fieldName] = errorMessage;
    });

    throw new ValidationError({
        message: "Validation Error",
        statusCode: 400,
        fields: fieldsError,
    });
}

module.exports = {
    getRequestData,
}