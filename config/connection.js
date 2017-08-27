var mongoose = require("mongoose");

mongoose.Promise = Promise;

//set up mongoose connection
mongoose.connect(
  // "mongodb://localhost/newsScrape"
  "mongodb://heroku_rwlxgk3m:c2mi2stac0mc4ttrtrkl28n3ug@ds157873.mlab.com:57873/heroku_rwlxgk3m"
);

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

module.exports = db;
