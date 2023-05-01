"use strict"
const planModel = require("../Models/planModel");
/*
    3/31/2023: 
*/
 async function searchByOp(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,sidewallLengthUpper,sidewallLengthLower,beds,baths,floors,searchOperation} = req.query;
    const operation = req.query.searchOperation;
    SQFTUpper = parseInt(SQFTUpper);
    SQFTLower = parseInt(SQFTLower);
    widthUpper = parseInt(widthUpper) * 12;
    widthLower = parseInt(widthLower) * 12;
    lengthUpper = parseInt(lengthUpper) * 12;
    lengthLower = parseInt(lengthLower) * 12;
    sidewallLengthUpper = parseInt(sidewallLengthUpper) * 12;
    sidewallLengthLower = parseInt(sidewallLengthLower) * 12;
    beds = parseInt(beds);
    baths = parseInt(baths);
    floors = parseInt(floors);
    console.log(operation);
    console.log(req.query);
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
        console.log("your code doesn't work... YET!!\n");
        return res.sendStatus(404);
        
    }
    console.log(result);

    if(!result) {
        return res.sendStatus(400);
    }
    res.json(result);
}

// function databaseTest(req,res) {
//     const operation = req.params.searchOperation;
//     let result;
//     if (operation === "searchBySQFT") {
//         result = planModel.testFunction();
//     } else if (operation === "searchByWidth") {
//         result = planModel.testFunction();
//     } else if (operation === "searchByLength") {
//         result = planModel.testFunction();
//     } else if (operation === "searchBySidewallLength") {
//         result = planModel.testFunction();
//     } else if (operation === "searchByBeds") {
//         result = planModel.testFunction();
//     } else if (operation === "searchByFloors") {
//         result = planModel.testFunction();
//     } else if (operation === "searchByBaths") {
//         result = planModel.testFunction();
//     } else {
//         console.log("your code doesn't work... YET!!\n");
//         return res.sendStatus(404);
        
//     }
//     console.log(result);

//     if(!result) {
//         return res.send(result);
//     }
//     res.send(result);


// }

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
    // databaseTest

}

