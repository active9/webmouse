var express = require('express'),
    path = require('path'),
    app = express(),
    exec = require('shelljs').exec,
    webmouse = require('./lib/webmouse.js'),
    cors = require('cors'),
    webmousebin = __dirname +"/bin/webmouse";

app.use(cors());
app.use(express.static(path.resolve(__dirname +'/html')));

app.get("/request/*:url", function(req, res) {
	var url = req.params.url + req.params[0];
	exec("casperjs "+ webmousebin +" "+ url, function(code, output) {
		res.send(output);
	});
})

app.get("/*:xyurl", function(req, res) {
	var xy = req.params.xyurl.split("/")[0];
	var url = req.params.xyurl.replace(req.params.xyurl.split("/")[0], "") + req.params[0];

	exec("casperjs "+ webmousebin +" "+ xy +" "+ url, function(code, output) {
		res.send(output);
	});
})

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Web Mouse listening at http://%s:%s', host, port);

});