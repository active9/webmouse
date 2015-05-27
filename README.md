# WebMouse
![WebMouse](https://raw.githubusercontent.com/active9/webmouse/master/html/img/webmouse.png)

Cloud Web Browser

#Requirements

- NodeJS
- Python 2.7.9+
- CasperJS Globally Installed

#Installing Requirements

NodeJS can be downloaded at http://nodejs.org
Python can be downloaded at http://python.org

Installing CasperJS globally can be done by typing:
```bash
npm install casperjs -g
```

#Installing WebMouse

```bash
npm install webmouse -g
```

#Introduction

The WebMouse concept is to create a 100% cloud rendered web browsing experience using only your mouse to navigate by clicking on screen shots of any given web page. Much like digital library news readers WebMouse captures images of a given page and displays it to the client. The client may then click on the page
to navigate around the web. Each web page request will be rendered as an output image. In short WebMouse allows for decentralized cloud based web browsing while interacting with a static image of any given url.

#WHAT WEBMOUSE DOES

- Cloud Web Browsing
- Web Scraping
- Web Crawling

#USING

WebMouse works as a middleware or a stand-alone server. The easiest way to get started is to start the WebMouse server and point your browser to http://localhost.rocks/

To use the webmouse gui server (The Cloudiest Method) just try starting it with:
```bash
webmousegui
```
Now visit http://localhost.rocks/ in  your web browser.

To use webmouse to directly output to the console try:
```bash
casperjs webmouse http://www.active9.com/
```

To use WebMouse as a middleware try:
```bash
npm install webmouse --save
```

Then in your code you can use the following:
```javascript
var mouse = require('mouse');
var casper = require('casper');

var jsondata = require('./active9test.json')[0];
var webmouse = require('../lib/webmouse.js')(jsondata,mouse,casper,function(data) {
	console.log("Capture Complete.");
});
```

Jsondata represents a JSON WebMouse command script to control actions via JSON.

Here is an example Jsondata WebMouse script:
```javascript
[
	{
		"name": "active9",
		"output": "active9.png",
		"start": "http://www.active9.com/",
		"click": "li a",
		"save": {
			"output": "active9.html",
			"select": "*"
		},
		"click": "li a",
		"capture": {
			"output": "active9b.png",
			"select": "body"
		},
		"click_2": "li a",
		"capture_2": {
			"output": "active9c.png",
			"select": "*"
		},
		"exit": true
	}
]
```

This WebMouse script will run a routine to capture screenshots and scrape html from active9.com.

#HOW IT WORKS

WebMouse at it's core utilizes CasperJS to render and interact with web pages. The given web page is rendered to a base64 encoded jpeg and sent to the browser or saved as a file. In server mode webmouse enables a user to directly interact with WebMouse via the included WebMouse gui. This gui will allow you to type in a url of your choosing and interact with the rendered page. In middleware mode you can create your own custom routines to interact with WebMouse.

#KNOWN ISSUES

 - Mobile device clicks do not register the proper element click on the page due to the mobile viewport.

#CONTRIBUTING

We encourage forking. Feel free to fork & pull your new additions, or bug fixes.

#LICENSE
MIT

