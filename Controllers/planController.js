const planModel = require("../Models/planModel");


async function getBySQFT(req,res) {
    const {upper,lower, operation} = req.query;
    let result;

    if (operation === "searchBySqft") {
        result = await planModel.searchBySQFT(upper,lower);

    } else {
        result = await planModel.searchByWidth(upper,lower);
    }

    if(!result) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);
}

async function getByLength(req,res) {
    const {upper,lower} = req.body;
    const input = await planModel.searchByLength(upper,lower);
    if(!input) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);

}

async function getByBeds(req,res) {
    const beds = req.body;
    const input = await planModel.searchByBeds(beds);
    if(!input) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);
}

async function getByFloors(req,res) {
    const {floors} = req.body;
    const input = await planModel.searchByFloors(floors);
    if(!input) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);
}

async function getByBaths(req,res) {
    const {baths} = req.body;
    const input = await planModel.searchByBaths(baths);
    if(!input) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);
}

async function addPlan(req,res) {
    const {plan} = req.body;
    const input = await planModel.addToDatabase(plan);
    if(!input) {
        return res.sendStatus(404);
    }
    res.sendStatus(201);
}

/*
    look at the request body, key is request type, value is string of desired search request.
    if it matches a certain string, call that search function and return the results.
    value strings are static.
    need to change it bc search operation is not apart of the request body
*/
async function findMethod(req,res) {
    const {operation} = req.params.searchOperation;
    if(!operation) {
        return res.sendStatus(404);
    }

    if (operation === "getByWidth") {
        getByWidth(req,res);
        res.sendStatus(201);
    }
    else if (operation === "getByLength") {
        getByLength(req,res);
        res.sendStatus(201);
    }
    else if (operation === "getBySQFT") {
        getBySQFT(req,res);
        res.sendStatus(201);
    }
    else if (operation === "getByFloors") {
        getByFloors(req,res);
        res.sendStatus(201);
    }
    else if (operation === "getByBeds") {
        getByBeds(req,res);
        res.sendStatus(201);
    }
    else if (operation === "getByBaths") {
        getByBaths(req,res);
        res.sendStatus(201);
    }
    else {
        res.sendStatus(404);
    }
}

module.exports (
    getByLength,
    getByWidth,
    getBySQFT,
    getByBeds,
    getByBaths,
    getByFloors,
    addPlan,
    findMethod

)

