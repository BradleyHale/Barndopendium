"use strict";
const db = require("./db");
/*
    functions with single inputs may have to go to double, depends on if refresh is needed
*/

function searchByLength(upper, lower) {
    const sql = `SELECT * FROM Plans WHERE length / 12 BETWEEN @upper * 12 AND @lower * 12`
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchBySidewallLength(upper,lower) {
    const sql = `SELECT * FROM Plans WHERE length / 12 BETWEEN @upper * 12 AND @lower * 12`
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "upper":upper,
        "lower":lower
    });
    return result;
}

function searchByWidth(upper, lower) {
    const sql = `SELECT * FROM Plans WHERE width / 12 BETWEEN @upper * 12 AND @lower * 12`
    const stmt = db.prepare(sql);
    const result = stmt.get({
       "upper":upper,
       "lower":lower
    });
    return result;

}

function searchByBeds(beds) {
    const sql = `SELECT * FROM Plans WHERE beds=@beds`
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "beds":beds
    });
    return result;

}

function searchBySQFT(upper, lower) {
    const sql = `SELECT * FROM Plans WHERE heatedCooledSQF BETWEEN @upper * 12 AND @lower * 12`
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "upper":upper,
        "lower":lower
    });
    return result;

}

function searchByFloors(floors) {
    const sql = `SELECT * FROM Plans WHERE floors=@floors`;
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "floors":floors
    });
    return result;

}

function searchByBaths(baths) {
    const sql = `SELECT * FROM Plans WHERE baths=@baths`
    const stmt = db.prepare(sql);
    const result = stmt.get({
        "baths":baths
    });
    return result;
}


 function addToDatabase() {
    const sql = `INSERT INTO PLANS (
        planID, overallSQFT, heatedCooledSQF, length, width, sidewallLength, stories, bedrooms, bathrooms, halfBaths, saferoom) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
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
    addToDatabase
}