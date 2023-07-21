// NOTE: THIS VERSION D O E S  N O T COMPATIBLE WITH ELECTRON
"use strict";
require("dotenv").config();
const path = require('path');
// const { app, BrowserWindow } = require('electron'); | will implement at the end
// TODO LIST: parse req.query
const express = require("express");
const server = express();
server.use(express.static("public", {
   index: "index.html",
   extensions: ['html']
}));

// app.use(express.static("public", {index: "index.html", extensions: ["html"]}));

// require validators
const planValidator = require("./Validators/planValidator");

// require controller
const planController = require("./Controllers/planController");

// endpoints ------------------------------------


// // index GET: test to see if the server is working on localhost
 server.get("/", (req, res) => {
    console.log("this is a test");
});

 // GET - retrieve data from database
 server.get("/api/search", planController.searchByOp);

 // POST - insert new plans into database
// server.post("/api/insert",
//    planValidator.validateRegisterBody,
//    planController.addPlan
// );

const {PORT} = process.env;
server.listen(PORT, () => {
   console.log(`Listening on http://localhost:${PORT}`)
})
module.exports = {
   server
};