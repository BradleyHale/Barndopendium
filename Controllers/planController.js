"use strict"
const planModel = require("../Models/planModel");

/*make all of this ONE method
look at the request body, key is request type, value is string of desired search request.
if it matches a certain string, call that search function and return the results.
value strings are static.
need to change it bc search operation is not apart of the request body
*/
async function searchByOp(req,res) {
    const operation = req.params.searchOperation;
    const {upperSQFT,lowerSQFT,upperLength,upperWidth,lowerWidth,lowerSidewallLength,upperSidewallLength,Beds,Floors,Baths} = req.query; // all parameters go into this one line
    let result;

    if (operation === "searchBySQFT") {
        result = await planModel.searchBySQFT(upperSQFT,lowerSQFT);
    } else if (operation === "searchByWidth") {
        result = await planModel.searchByWidth(upperWidth,lowerWidth);
    } else if (operation === "searchByLength") {
        result = await planModel.searchByLength(upperLength,upperWidth);
    } else if (operation === "searchBySidewallLength") {
        result = await planModel.searchBySidewallLength(upperSidewallLength,lowerSidewallLength);
    } else if (operation === "searchByBeds") {
        result = await planModel.searchByBeds(Beds);
    } else if (operation === "searchByFloors") {
        result = await planModel.searchByFloors(Floors);
    } else if (operation === "searchByBaths") {
        result = await planModel.searchByBaths(Baths);
    } else {
        console.log("your code doesn't work... YET!!\n");
        return res.sendStatus(404);
        
    }

    if(!result) {
        return res.sendStatus(400);
    }
    res.sendStatus(201);
}

// async function getByLength(req,res) {
//     const {upper,lower} = req.body;
//     const input = await planModel.searchByLength(upper,lower);
//     if(!input) {
//         return res.sendStatus(404);
//     }
//     res.sendStatus(201);

// }

// async function getByBeds(req,res) {
//     const beds = req.body;
//     const input = await planModel.searchByBeds(beds);
//     if(!input) {
//         return res.sendStatus(404);
//     }
//     res.sendStatus(201);
// }

// async function getByFloors(req,res) {
//     const {floors} = req.body;
//     const input = await planModel.searchByFloors(floors);
//     if(!input) {
//         return res.sendStatus(404);
//     }
//     res.sendStatus(201);
// }

// async function getByBaths(req,res) {
//     const {baths} = req.body;
//     const input = await planModel.searchByBaths(baths);
//     if(!input) {
//         return res.sendStatus(404);
//     }
//     res.sendStatus(201);
// }

// async function addPlan(req,res) {
//     const {plan} = req.body;
//     const input = await planModel.addToDatabase(plan);
//     if(!input) {
//         return res.sendStatus(404);
//     }
//     res.sendStatus(201);
// }

/*
    look at the request body, key is request type, value is string of desired search request.
    if it matches a certain string, call that search function and return the results.
    value strings are static.
    need to change it bc search operation is not apart of the request body
*/

module.exports = {
    searchByOp

}

