"use strict";
const db = require("./db");

function testFunction() {
    const sql = `SELECT * FROM PLANS`;
    const stmt = db.prepare(sql);
    const result = stmt.all();
    return result;
}
// TODO LIST: add views for each metric param (length,width,sidewalllength / 12, length width sidewalllength % 12) to all every search function

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
       FROM plans WHERE length BETWEEN @upper AND @lower`;
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
       AS sidewallLengthIn FROM plans WHERE heatedCooledSQF BETWEEN @upper * 12 AND @lower * 12`;
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
    testFunction
}