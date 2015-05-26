$(document).ready(function() {

	var currentURL = "";

	function showLoader() {
		$("#go").html('<img src="img/loader.gif" >');
		$("#footerprogress").fadeIn('slow');
	}

	function hideLoader() {
		$("#go").html('&gt;');
		$("#footerprogress").fadeOut('fast');
	}

	function greenLoader() {
		$("#progbar").removeClass("progress-bar-info");
		$("#progbar").addClass("progress-bar-success");
	}

	function blueLoader() {
		$("#progbar").removeClass("progress-bar-success");
		$("#progbar").addClass("progress-bar-info");
	}

	function parseURL(url) { 
	    var hr = document.createElement('a');
	    hr.href = url;
	    return hr;
	}

	function withinBounds(x,y,xa,ya,width,height) {
		if (((x>=xa) & (x<=xa+width)) & ((y>=ya) & (y<=ya+height))) {
			return true;
		} else {
			return false;
		}
	}

	function domClickable(x,y,go) {
		var elementlist = $("#elementJSON").text();
		elementlist = JSON.parse(elementlist);
		for (el in elementlist) {
			if (withinBounds(x,y,elementlist[el].x,elementlist[el].y,elementlist[el].width,elementlist[el].height)) {
				if (go) {
					return elementlist[el].attributes.href;
				} else {
					return true;
				}
			}
		}
		return false;
	}

	$("#go").click(function() {
		request($("#urlbox").val());
	});

	$("#mouseclick").click(function(e) {
        	var x = e.pageX - this.offsetLeft;
        	var y = e.pageY - this.offsetTop;
		var scrollTo = window.pageYOffset;
		y = y - scrollTo;

		if (domClickable(x,y,false)) {
			var url = domClickable(x,y,true);
			if (url[0]=="/") {
				var parsedurl = parseURL(currentURL);
				url = parsedurl.protocol + "//"+ parsedurl.hostname + url;
			}
			greenLoader();
			showLoader();
			$.get( "/"+ x +"x"+ y +"x"+ scrollTo +"/"+ url, function( data ) {
				hideLoader();
				request(data);
				$("#urlbox").val(data);
				currentURL = url;
			});
		} else {
			var url = $("#urlbox").val();
			greenLoader();
			showLoader();
			$.get( "/"+ x +"x"+ y +"x"+ scrollTo +"/"+ url, function( data ) {
				hideLoader();
				request(data);
				$("#urlbox").val(data);
				currentURL = data;
			});
		}
	});

	function request(url) {
		blueLoader();
		showLoader();
		$.get( "/request/"+ url, function( data ) {
			data = data.split("|WEBMOUSE|");
			$("#elementJSON").text(data[0]);
			$("#mousevision").attr('src', "data:image/png;base64,"+ data[1]);
			hideLoader();
			$("#urlbox").val(url);
			currentURL = url;
		});
	}

	request("http://www.npmjs.com/webmouse");

});