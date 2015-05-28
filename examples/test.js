var jsondata = require('./examples/active9test.json')[0];
var webmouse = require('./lib/webmouse.js')(jsondata,function(data) {
	console.log("Capture Complete.");
});