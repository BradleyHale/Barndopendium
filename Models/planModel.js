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

function generalSearch(params, searchOperations = []) {
    let { SQFTLower, SQFTUpper, lengthUpper, lengthLower, widthUpper, widthLower, sidewallLengthUpper, sidewallLengthLower, floors, baths, beds } = params;
    let conditions = [];
    let args = {};
    console.log(params);
    
    // Add conditions based on search operations
    searchOperations.forEach(operation => {
        switch (operation) {
            case 'searchBySQFT':
                if (SQFTLower !== undefined && SQFTUpper !== undefined) {
                    conditions.push(`overallSQF <= @SQFTUpper`);
                    conditions.push(`overallSQF >= @SQFTLower`);
                    args['@SQFTLower'] = SQFTLower;
                    args['@SQFTUpper'] = SQFTUpper;
                }
                break;
            case 'searchByWidth':
                if (widthLower !== undefined && widthUpper !== undefined) {
                    conditions.push(`width <= @widthUpper`);
                    conditions.push(`width >= @widthLower`);
                    args['@widthLower'] = widthLower * 12; // Convert feet to inches
                    args['@widthUpper'] = widthUpper * 12; // Convert feet to inches
                }
                break;
            case 'searchByLength':
                if (lengthLower !== undefined && lengthUpper !== undefined) {
                    conditions.push(`length <= @lengthUpper`);
                    conditions.push(`length >= @lengthLower`);
                    args['@lengthLower'] = lengthLower * 12; // Convert feet to inches
                    args['@lengthUpper'] = lengthUpper * 12; // Convert feet to inches
                }
                break;
            case 'searchBySidewallLength':
                if (sidewallLengthLower !== undefined && sidewallLengthUpper !== undefined) {
                    conditions.push(`sidewallLength <= @sidewallLengthUpper`);
                    conditions.push(`sidewallLength >= @sidewallLengthLower`);
                    args['@sidewallLengthLower'] = sidewallLengthLower * 12; // Convert feet to inches
                    args['@sidewallLengthUpper'] = sidewallLengthUpper * 12; // Convert feet to inches
                }
                break;
            case 'searchByBeds':
                if (beds !== undefined) {
                    conditions.push(`bedrooms = @beds`);
                    args['@beds'] = beds;
                }
                break;
            case 'searchByFloors':
                if (floors !== undefined) {
                    conditions.push(`stories = @floors`);
                    args['@floors'] = floors;
                }
                break;
            case 'searchByBaths':
                if (baths !== undefined) {
                    conditions.push(`bathrooms = @baths`);
                    args['@baths'] = baths;
                }
                break;
        }
    });

    // Construct the WHERE clause
    let whereClause = '';
    if (conditions.length > 0) {
        whereClause = 'WHERE ' + conditions.join(' AND ');
    }

    // Prepare and execute SQL query
    const sqlQuery = `SELECT * FROM plans ${whereClause}`;
    const stmt = db.prepare(sqlQuery);
    const result = stmt.all(args);

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


//  function addToDatabase() {
//     const sql = `INSERT INTO plans (
//         planID, overallSQFT, heatedCooledSQF, length, width, sidewallLength, stories, bedrooms, bathrooms, halfBaths, saferoom) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
//     const stmt = db.prepare(sql); 
//     const result = stmt.get({
//         // placeholder
//     });
// }

/* 
    function searchByFeature() {
        use "LIKE" keyword to search for all feature strings
        that contain the input
    }
*/

module.exports = {
    searchByLength,
    searchByWidth,
    searchBySidewallLength,
    searchByBeds,
    searchBySQFT,
    searchByFloors,
    searchByBaths,
    //addToDatabase,
    getPlanByID,
    testFunction,
    generalSearch
}