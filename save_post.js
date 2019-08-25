var express = require("express");
var myParser = require("body-parser");
var app = express();

app.use(myParser.urlencoded({
	extedned : true
}));

app.post("/placeorder", function(req, res) {
	console.log(req.body);
});

app.listen(8080);