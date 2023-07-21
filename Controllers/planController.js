"use strict"
const planModel = require("../Models/planModel");
/*
    if it doesn't send a response, restart your pc
*/
 async function searchByOp(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,sidewallLengthUpper,sidewallLengthLower,beds,baths,floors,searchOperation} = req.query;
    const operation = req.query.searchOperation;
    // if field is undefined, initialize as default (1 or 0) else, parse input as an integer
    if (!req.query.SQFTUpper) {
        SQFTUpper = 1;
    }
    else {
        SQFTUpper = parseInt(SQFTUpper);
    }
    if (!req.query.SQFTLower) {
        SQFTLower = 0;
    }
    else {
        SQFTLower = parseInt(SQFTLower);
    }
    if (!req.query.widthUpper) {
        widthUpper = 1;
    }
    else {
        widthUpper = parseInt(widthUpper) * 12;
    }
    if(!req.query.widthLower) {
        widthLower = 0;
    }
    else {
        widthLower = parseInt(widthLower) * 12;
    }
    if (!req.query.lengthUpper) {
        lengthUpper = 1;
    }
    else {
        lengthUpper = parseInt(lengthUpper) * 12;
    }
   if (!req.query.lengthLower) {
    lengthLower = 0;
   }
   else {
    lengthLower = parseInt(lengthLower) * 12;
   }
    if(!req.query.sidewallLengthUpper) {
        sidewallLengthUpper = 1;
    }
    else {
        sidewallLengthUpper = parseInt(sidewallLengthUpper) * 12;
    }
    if(!req.query.sidewallLengthLower) {
        sidewallLengthLower = 0;
    }
    else {
        sidewallLengthLower = parseInt(sidewallLengthLower) * 12;
    }
    if (!req.query.beds) {
        beds = 0;
    }
    else {
        beds = parseInt(beds);
    }
    if(!req.query.baths) {
        baths = 0;
    }
    else {
        baths = parseInt(baths);
    }
    if (!req.query.floors) {
        floors = 0;
    }
    else {
        floors = parseInt(floors);
    }
    console.log(operation);
    console.log(req.query
        );
    let result;

    if (operation === "searchBySQFT") {
        result = planModel.searchBySQFT(SQFTUpper,SQFTLower);
    } else if (operation === "searchByWidth") {
        result = planModel.searchByWidth(widthUpper,widthLower);
    } else if (operation === "searchByLength") {
        result = planModel.searchByLength(lengthUpper,lengthLower);
    } else if (operation === "searchBySidewallLength") {
        result = planModel.searchBySidewallLength(sidewallLengthUpper,sidewallLengthLower);
    } else if (operation === "searchByBeds") {
        result = planModel.searchByBeds(beds);
    } else if (operation === "searchByFloors") {
        result = planModel.searchByFloors(floors);
    } else if (operation === "searchByBaths") {
        result = planModel.searchByBaths(baths);
    } else {
        console.log(result);
        return res.sendStatus(404);
        
    }
    console.log(result);

    if(!result) {
        return res.sendStatus(404);
    }
    res.json(result);
}



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
    // databaseTest

}

