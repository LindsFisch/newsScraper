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
    scraper.scrapeWeb(function(data) {
        console.log(data);
        res.redirect("/");
    });
});

//save article to save page
router.get("/save/:id", function (req, res) {
    Article.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            //change save to false
            doc.saved = true;

            doc.save(function (error, update) {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/save');
                }
            });
        }
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
router.get("/new/:id", function (req, res) {
    Article.findOne({ "_id": req.params.id })
        .populate("note")
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

//create new note or replace
router.post("/new/:id", function (req, res) {

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

//delete article from saved
router.get("/delete/:id", function (req, res) {
    Article.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            //change save to false
            doc.saved = 0;

            doc.save(function (error, update) {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('/save');
                }
            });
        }
    });
});


module.exports = router;