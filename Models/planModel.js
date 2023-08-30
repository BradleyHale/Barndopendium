"use strict";
const db = require("./db");
// NOTE: views aren't used anywhere, but are still in place in order to help debugging in code editor

function testFunction() {
    const sql = `SELECT * FROM PLANS`;
    const stmt = db.prepare(sql);
    const result = stmt.all();
    return result;
}


function searchByLength(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
      sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 AS sidewallLengthIn
       FROM plans WHERE length BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchBySidewallLength(upper,lower) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
      sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 AS sidewallLengthIn
       FROM plans WHERE sidewallLength BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;
}

function searchByWidth(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt,
     length % 12 AS lengthIn, width / 12 AS widthFt, width % 12 AS widthIn,
      sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 AS sidewallLengthIn
       FROM plans WHERE width BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchByBeds(beds) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn, 
    width / 12 AS widthFt, width % 12 AS widthIn, 
    sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 
    AS sidewallLengthIn FROM plans WHERE bedrooms=@beds`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "beds":beds
    });
    console.log("beds:", beds);
    return result;

}

function searchBySQFT(upper, lower) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
      sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12
       AS sidewallLengthIn FROM plans WHERE heatedCooledSQF BETWEEN @upper AND @lower`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByFloors(floors) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn, 
    width / 12 AS widthFt, width % 12 AS widthIn, 
    sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 
    AS sidewallLengthIn FROM plans WHERE stories=@floors`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "floors":floors
    });
    return result;

}

function searchByBaths(baths) {
    const sql = `SELECT *, length / 12 AS lengthFt, length % 12 AS lengthIn,
     width / 12 AS widthFt, width % 12 AS widthIn,
      sidewallLength / 12 AS sidewallLengthFt, sidewallLength % 12 AS sidewallLengthIn
       FROM plans WHERE bathrooms=@baths`;
    const stmt = db.prepare(sql);
    const result = stmt.all({
        "baths":baths
    });
    return result;
}

function getPlanByID(planID) {
    const sql = 'SELECT * FROM plans WHERE planID=@planID';
    const stmt = db.prepare(sql);
    const row = stmt.get({planID});
    return row;
}


 function addToDatabase() {
    const sql = `INSERT INTO plans (
        planID, overallSQFT, heatedCooledSQF, length, width, sidewallLength, stories, bedrooms, bathrooms, halfBaths, saferoom) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    const stmt = db.prepare(sql); 
    const result = stmt.get({
        // placeholder
    });
}

module.exports = {
    searchByLength,
    searchByWidth,
    searchBySidewallLength,
    searchByBeds,
    searchBySQFT,
    searchByFloors,
    searchByBaths,
    addToDatabase,
    getPlanByID,
    testFunction
}