"use strict"
const planModel = require("../Models/planModel");
/*
    ~~if it doesn't send a response, restart your pc~~
    you don't have to do this. most likely you have another process running on this port. kill whatever process is on this port and restart
*/
 async function searchByOp(req,res) {
    let {SQFTUpper,SQFTLower,widthUpper,widthLower,lengthUpper,lengthLower,sidewallLengthUpper,sidewallLengthLower,beds,baths,floors,halfBaths,searchOperations} = req.query; // need to implement half baths
    let operations = req.query.searchOperations;
    //checkboxes only return values as an array of objets if more than one box is checked: this converts single-box checks into arrays
    // in order to make sure it enters the loop below
    if (typeof operations != "object") {
        operations = [operations]
    }

    SQFTUpper = parseInt(SQFTUpper);
    SQFTLower = parseInt(SQFTLower);
    lengthUpper = parseInt(lengthUpper);
    lengthLower = parseInt(lengthLower);
    widthUpper = parseInt(widthUpper);
    widthLower = parseInt(widthLower);
    sidewallLengthLower = parseInt(sidewallLengthLower);
    sidewallLengthUpper = parseInt(sidewallLengthUpper);
    floors = parseInt(floors);
    // log search operation and req.query to console for debugging
    console.log("search operations: ",operations);
    let results;
    results = planModel.generalSearch(req.query,operations);
    
    // output results of search to the console,
    //console.log("search results: ",results);
    // if results is undefined, return 404. 
    if(!results) {
        return res.sendStatus(404);
    }
    // render search results
    res.render("results", {"results": results});
    // send the search results as a JSON response
    // res.json(results);
}

function renderSingleResult(req,res) {
    const plan = planModel.getPlanByID(req.params.planID);
    if (!plan) {
        // if plan isn't found, send status 404
        return res.sendStatus(404);
    }
    res.render("singlePlanPage", {"plan": plan});
}


module.exports = {
    searchByOp,
    renderSingleResult
    // databaseTest

}

