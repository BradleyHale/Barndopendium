"use strict"
const planModel = require("../Models/planModel");
/*
    if it doesn't send a response, restart your pc
*/
 async function searchByOp(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,sidewallLengthUpper,sidewallLengthLower,beds,baths,floors,searchOperation} = req.query;
    const operation = req.query.searchOperation;
    // if field is undefined, initialize as default (1 for max, 0 for min) else, parse input as an integer
    if (typeof req.query.SQFTUpper === 'undefined') {
        SQFTUpper = 1;
    }
    else {
        SQFTUpper = parseInt(SQFTUpper);
    }
    if (typeof req.query.SQFTLower === 'undefined') {
        SQFTLower = 0;
    }
    else {
        SQFTLower = parseInt(SQFTLower);
    }
    if (typeof req.query.widthUpper === 'undefined') {
        widthUpper = 1;
    }
    else {
        widthUpper = parseInt(widthUpper) * 12;
    }
    if(typeof req.query.widthLower === 'undefined') {
        widthLower = 0;
    }
    else {
        widthLower = parseInt(widthLower) * 12;
    }
    if (typeof req.query.lengthUpper === 'undefined') {
        lengthUpper = 1;
    }
    else {
        lengthUpper = parseInt(lengthUpper) * 12;
    }
   if (typeof req.query.lengthLower === 'undefined') {
    lengthLower = 0;
   }
   else {
    lengthLower = parseInt(lengthLower) * 12;
   }
    if(typeof req.query.sidewallLengthUpper === 'undefined') {
        sidewallLengthUpper = 1;
    }
    else {
        sidewallLengthUpper = parseInt(sidewallLengthUpper) * 12;
    }
    if(typeof req.query.sidewallLengthLower === 'undefined') {
        sidewallLengthLower = 0;
    }
    else {
        sidewallLengthLower = parseInt(sidewallLengthLower) * 12;
    }
    if (typeof req.query.beds === 'undefined') {
        beds = 0;
    }
    else {
        beds = parseInt(beds);
    }
    if(typeof req.query.baths === 'undefined') {
        baths = 0;
    }
    else {
        baths = parseInt(baths);
    }
    if (typeof req.query.floors === 'undefined') {
        floors = 0;
    }
    else {
        floors = parseInt(floors);
    }
    console.log(operation);
    console.log(req.query
        );
    let result;
// the new problem is in the Models file. the model functions for searching by length, width, and sidewallLength do not work correctly
    if (operation === "searchBySQFT") {
        result = planModel.searchBySQFT(SQFTLower,SQFTUpper);
    } else if (operation === "searchByWidth") {
        result = planModel.searchByWidth(widthLower,widthUpper);
    } else if (operation === "searchByLength") {
        result = planModel.searchByLength(lengthLower,lengthUpper);
    } else if (operation === "searchBySidewallLength") {
        result = planModel.searchBySidewallLength(sidewallLengthLower,sidewallLengthUpper);
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

