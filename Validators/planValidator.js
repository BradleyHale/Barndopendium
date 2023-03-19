"use strict";
const joi = require("joi");

const validateOpts = {
    abortEarly: false,
    stripUnknown: true,
    errors: {
        escapeHtml: true
    }
};

const planSchema = joi.object({
    input: joi.number()
    .integer()
})

function validateInputBody(req, res, next) {
    const {value, error} = planSchema.validate(req.body, validateOpts);
    if(error) {
        const errorMessages = error.details.map( detail => detail.message);
        return res.status(400).json({"errors": errorMessages});
    }
    req.body = value;
    next();
}

module.exports = (
    validateInputBody
)