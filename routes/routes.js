var express = require("express");
var router = express.Router();

var Article = require("../models/Article");
var Note = require("../models/Note");

//home page route
router.get("/", function(req, res){


});

//scrape articles from FloridaMan
router.get("/scrape", function(req, res) {

});

//get articles that were scraped
router.get("/articles", function(req, res){

});

//get specific article by id
router.get("/articles/:id", function(req, res){

});

//create new note or replace
router.post("/articles/:id", function(req, res){

});

router.delete("/articles/:id", function(req, res){

});
