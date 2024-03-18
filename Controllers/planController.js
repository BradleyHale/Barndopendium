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
    // if field is undefined, initialize as default (1 for max, 0 for min) else, PARSE INPUTS AS INTEGERS!!
    // in previous testing, forgot that was what this block did, which is V E R Y important!
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
    if (typeof req.query.halfBaths === 'undefined') {
        halfBaths = 0;
    }
    // log search operation and req.query to console for debugging
    console.log(operations);
    console.log(req.query);
    let results;
    results = planModel.generalSearch(req.query);
    // let results = [];
    // // for each search operation in the array "operations", apply one of several pre-defined search operations, and concatenate "currentResults"
    // // into an array called "results". the syntax [...foo, ...bar] allows results to be added into an array while ignoring duplicates. 
    // for(let i = 0; i < operations.length; i++) {
    //     let currentResults;
    //     if (operations[i] === "searchBySQFT") {
    //         currentResults = planModel.searchBySQFT(SQFTLower,SQFTUpper);
    //     } else if (operations[i] === "searchByWidth") {
    //         currentResults = planModel.searchByWidth(widthLower,widthUpper);
    //     } else if (operations[i] === "searchByLength") {
    //         currentResults = planModel.searchByLength(lengthLower,lengthUpper);
    //     } else if (operations[i] === "searchBySidewallLength") {
    //         currentResults = planModel.searchBySidewallLength(sidewallLengthLower,sidewallLengthUpper);
    //     } else if (operations[i] === "searchByBeds") {
    //         currentResults = planModel.searchByBeds(beds);
    //     } else if (operations[i] === "searchByFloors") {
    //         currentResults = planModel.searchByFloors(floors);
    //     } else if (operations[i] === "searchByBaths") {
    //         currentResults = planModel.searchByBaths(baths);
    //     } else {
    //         // if not a valid search results, return 404
    //         console.log(results);
    //         return res.sendStatus(404);
            
    //     }
    //     results = [...results, ...currentResults];
    // }
    
    // output results of search to the console
    console.log(results);
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

