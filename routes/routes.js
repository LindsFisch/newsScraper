var express = require("express");
var router = express.Router();

var Article = require("../models/Article");
var Note = require("../models/Note");
var scraper = require("../controller/scraper");

//home page route - find all articles in db
router.get("/", function (req, res) {
    Article.find({}, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            var hbsObject = {
                article: doc
              };
              res.render("index", hbsObject);
        }
    });
});

//scrape articles from FloridaMan
router.get("/scrape", function (req, res) {
    scraper.scrapeWeb(function () {
        res.redirect('/');
    });
});

//get articles that were saved
router.get("/save", function (req, res) {
    Article.find({ "saved": 1 }, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            var hbsObject = {
                article: doc
              };
              res.render("savedarticles", hbsObject);
        }
    });

});

//get specific article by id for note
router.get("/save/:id", function (req, res) {
    Article.findOne({"_id": req.params.id})
    .populate("note")
    .exec(function(error, doc){
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

//create new note or replace
router.post("/save/:id", function (req, res) {

    var newNote = new Note(req.body);

    newNote.save(function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc.id })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});

//delete article
router.post("/delete/:id", function (req, res) {
    Article.findOneAndUpdate({"_id": req.params.id}, {"saved": 0})
    .exec(function(err, doc){
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });

    Article.save(function(error, update){
        if (error) {
            console.log(error);
        } else {
            res.redirect('/save');
        }
    });

});


module.exports = router;