var cheerio = require("cheerio");

var request = require("request");

var Article = require("../models/Article");

var scrapeWeb = function () {

    var website = "http://floridaman.com";

    request(website, function (error, response, html) {
       
        var $ = cheerio.load(html);
        
        $("h3").each(function (i, element) {

            
            var result = {};

            
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            var entry = new Article(result);


            entry.save(function (err, doc) {
 
                if (err) {
                    console.log(err);
                }

                else {
                    console.log(doc);
                }
            });

        });
    });

    res.send("Scrape Complete");
};

module.exports = scrapeWeb;