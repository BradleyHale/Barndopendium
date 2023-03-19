"use strict";
require("dotenv").config;
const path = require('path');
// const { app, BrowserWindow } = require('electron');
const express = require("express");
const app = express();

app.use(express.static("public", {index: "index.html", extensions: ["html"]}));

// require validators
const planValidator = require("./Validators/planValidator");

// require controller
const planController = require("./Controllers/planController");

// endpoints


// index GET:
 app.get("/", (req, res) => {
    res.render("index");
    res.send("this is a test");
    console.log("this is a test");
});

 // GET - retrieve data from database
 app.get("/api/search/:searchOperation", (req,res) => {
    planController.searchByOp(req,res);

 })

 // POST - insert new plans into database
// app.post("/api/insert",
//    planValidator.validateRegisterBody,
//    planController.addPlan
// );

app.listen(8080)