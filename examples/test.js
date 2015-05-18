var mouse = require('mouse');
var casper = require('casper');

var jsondata = require('./active9test.json')[0];
var webmouse = require('../lib/webmouse.js')(jsondata,mouse,casper,function(data) {
	console.log("Capture Complete.");
});