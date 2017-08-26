var express = require("express");
var router = express.Router();

var Article = require("../models/Article");
var Note = require("../models/Note");
var scraper = require("../controller/scraper");

//home page route
router.get("/", function(req, res){
    Article.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

//scrape articles from FloridaMan
router.get("/scrape", function(req, res) {
    scraper.scrapeWeb(function(){
        res.redirect('/');
    });
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

//delete note
router.delete("/articles/:id", function(req, res){

});


module.exports = router;