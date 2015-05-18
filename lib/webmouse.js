var path = require('path')
var fs = require('fs');
var jsonopt = require('../config.json');

var clickWebPage = function(x,y,queryselector) {
	if (typeof queryselector !="undefined") {
		casper.then(function() {
			this.click(queryselector);
		});
	} else {
		casper.then(function() {
			this.click(x,y);
		});
	}
}

var clickWebPage = function(queryselector) {
	casper.then(function(queryselector) {
		document.querySelector(queryselector);
	});
}

var webmouse = function(jsondata,mouse,casper,fn) {
	var casper = casper.create(jsonopt);
	mouse.create(casper);

	var output = false;
	var select = "*";
	for(json in jsondata) {
		var key = json;
		var value = jsondata[json];

		if (key=="name") {
			console.log("Running Operation: ", value);
		}
		if (key=="output") {
			console.log("Output To: ", value);
			output = value;
		}
		if (key=="select") {
			console.log("Selected: ", value);
			select = value;
		}
		if (key=="start") {
			var startValue = value;
			var outputValue = output;
			var start = function(startValue,outputValue) {
			casper.start(startValue, function(response) {
				var headers = response.headers;
				console.log("Starting Capture:", startValue, outputValue);
				this.captureSelector(outputValue, select, {
					format: 'jpg',
					quality: 93
				});
			});
			};
			start(startValue,outputValue);
		}
		if (key=="base") {
			var startValue = value;
			var outputValue = output;
			var start = function(startValue,outputValue) {
			casper.start(startValue, function(response) {
				var headers = response.headers;
				console.log("Starting Capture:", startValue, outputValue);
				fn(this.captureBase64('png', select));
			});
			};
			start(startValue,outputValue);
		}
		if (key.match(/click\b|click\w(\d|\w)/i)) {
			var clickValue = value;
			casper.then(function() {
				console.log("Clicking:", clickValue);
				this.click(""+ clickValue +"");
			});
		}
		if (key.match(/open/i)) {
			var openValue = value;
			if (openValue.link != "") {
				casper.then(function() {
					console.log("Opening:", openValue.link);
					this.thenOpen(openValue.link);
				});
			}
		}
		if (key.match(/capture\b|capture\w(\d|\w)/i)) {
			var captureOutput = jsondata[json].output;
			var captureSelect = jsondata[json].select;
			if (captureOutput && captureSelect) {
				var cap = function(captureOutput, captureSelect) {
					casper.then(function() {
						casper.waitForSelector("body", function() {
							this.wait(3000, function() {
								console.log("Capturing:", JSON.stringify(captureOutput));
								this.captureSelector(""+captureOutput+"", ""+captureSelect+"", {
									format: 'jpg',
									quality: 93
								});
							});
						});
					});
				};
				cap(captureOutput, captureSelect);
			}
		}
		if (key.match(/save\b|save\w(\d|\w)/i)) {
			var saveOutput = jsondata[json].output;
			var saveSelect = jsondata[json].select;
			if (saveOutput && saveSelect) {
				var save = function(saveOutput, saveSelect) {
				casper.then(function() {
					console.log("Saving:",  saveOutput);
					var elements = this.getElementsInfo(saveSelect);
					var html = this.getHTML(saveSelect);
					var title = this.getTitle();
					var meta = this.get;
					//var writeFileData = this.getHTML(saveSelect).toString();
					this.download(this.getCurrentUrl(),saveOutput);

				});
				};
				save(saveOutput, saveSelect);
			}
		}
		if (key=="exit") {
			casper.then(function() {
				console.log("Exiting");
				this.exit();
			});
		}
	}

	casper.run(function() {
		this.exit();
	});
}
module.exports = webmouse;