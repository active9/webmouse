var express = require('express'),
    path = require('path'),
    app = express(),
    exec = require('shelljs').exec,
    webmouse = require('./lib/webmouse.js'),
    cors = require('cors'),
    webmousebin = __dirname +"/bin/webmouse";
    webmouserunner = __dirname +"/bin/webmouserunner";

app.use(cors());
app.use(express.static(path.resolve(__dirname +'/html')));

app.get("/request/*:url", function(req, res) {
	var url = req.params.url + req.params[0];
	var child = exec("casperjs "+ webmousebin +" "+ url, {async:true});
	var writebuffer = "";
	child.stdout.on('data', function(data) {
		writebuffer += data;
	});
	child.stdout.on('end', function() {
		res.send(writebuffer);
	});
});

app.get("/runner/*:json", function(req, res) {
	var json = req.params.json + req.params[0];
	var child = exec("casperjs "+ webmouserunner +" "+ json, {async:true});
	var writebuffer = "";
	child.stdout.on('data', function(data) {
		writebuffer += data;
	});
	child.stdout.on('end', function() {
		res.send(writebuffer);
	});
});

app.get("/*:xyurl", function(req, res) {
	var xy = req.params.xyurl.split("/")[0];
	var url = req.params.xyurl.replace(req.params.xyurl.split("/")[0], "") + req.params[0];
	var child = exec("casperjs "+ webmousebin +" "+ xy +" "+ url, {async:true});
	var writebuffer = "";
	child.stdout.on('data', function(data) {
		writebuffer += data;
	});
	child.stdout.on('end', function() {
		res.send(writebuffer);
	});
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Web Mouse listening at http://%s:%s', host, port);
});