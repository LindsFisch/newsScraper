var mongoose = require("mongoose");

mongoose.Promise = Promise;

//set up mongoose connection
mongoose.connect("mongodb://localhost/newsScrape");

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
