
"use strict";
require("dotenv").config();
const path = require('path');
const express = require("express");
const app = express();
app.use(express.static("public", {
   index: "index.html",
   extensions: ['html']
}));

// set view engine
app.set('view engine', 'ejs');
// require validators
const planValidator = require("./Validators/planValidator");

// require controller
const planController = require("./Controllers/planController");


// endpoints ------------------------------------


// // index GET: test to see if the server is working on localhost
 app.get("/", (req, res) => {
    console.log("this is a test");
});

 // GET - retrieve data from database
 app.get("/api/search", planController.searchByOp);

 // POST - insert new plans into database
// app.post("/api/insert",
//    planValidator.validateRegisterBody,
//    planController.addPlan
// );

const {PORT} = process.env;
app.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`)
})
module.exports = {
   app
};