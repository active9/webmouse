var express = require('express');
var app = express();
var exec = require('shelljs').exec;
var webmouse = require('./lib/webmouse.js');

app.use(express.static('./html'));

app.get("/request/*:url", function(req, res) {
	var url = req.params.url + req.params[0];
	exec("casperjs webmouse "+ url, function(code, output) {
		res.send(output);
	});
})

app.get("/*:xyurl", function(req, res) {
	var xy = req.params.xyurl.split("/")[0];
	var url = req.params.xyurl.replace(req.params.xyurl.split("/")[0], "") + req.params[0];

	exec("casperjs webmouse "+ xy +" "+ url, function(code, output) {
		res.send(output);
	});
})

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Web Mouse listening at http://%s:%s', host, port);

});