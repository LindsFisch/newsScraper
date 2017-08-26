var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var db = require ("../config/connection");

// var scrapeWeb = require ("../controller/scraper");

var ArticleSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    link: {
        type: String,
        required: true
    }, 
    note: {
        type: Schema.Types.ObjectId, 
        ref:"Note"
    },
    save: {
        type: Boolean,
        default: 0
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;