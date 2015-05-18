$(document).ready(function() {

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

	$("#go").click(function() {
		request($("#urlbox").val());
	});

	$("#mouseclick").click(function(e) {
        	var x = e.pageX - this.offsetLeft;
        	var y = e.pageY - this.offsetTop;
		var scrollTo = window.pageYOffset;
		y = y - scrollTo;
		var url = $("#urlbox").val();
		//$("#debug").text("DEBUG: x"+ x +" y"+ y +" scrollby"+ scrollTo +"");
		greenLoader();
		showLoader();
		$.get( "/"+ x +"x"+ y +"x"+ scrollTo +"/"+ url, function( data ) {
			var cheese = data.split("||");
			//$( "#mousevision" ).attr('src', 'data:image/jpeg;base64,'+ cheese[1]);
			hideLoader();
			request(cheese[0]);
			$("#urlbox").val(cheese[0]);
		});
	});

	function request(url) {
		blueLoader();
		showLoader();
		$.get( "/request/"+ url, function( data ) {
			$("#mousevision").attr('src', "data:image/jpeg;base64,"+ data);
			hideLoader();
			$("#urlbox").val(url);
		});
	}

	request("http://www.npmjs.com/webmouse");

});