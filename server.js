var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();

var routes = require("./routes/routes");


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json());

app.use(express.static("public"));

//set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes
app.use('/', routes);

//start app
var port = process.env.PORT || 3000;

app.listen(port, function()
{
  console.log('Running on port: ' + port);
});
