var helpmode = false;
var keyboardmode = true;

$(document).ready(function() {
	$(document).on('keyup', function(evt) {
		if (keyboardmode) {
			processKeyUp(evt.which);
		}
	});
});

var processKeyUp = function(key) {
	console.log(key);
	// 27: Esc key
	if (helpmode && key == 27) {
		helpmode = false;
		$('.help-modal').modal('hide');
	}
	// 72: 'h' key
	else if (key == 72) {
		console.log('aaa');
		helpmode = true;
		$('.help-modal-1').modal({'backdrop': 'static'});

		$('.help-modal .close').on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();

			helpmode = false;
			$('.help-modal').modal('hide');
			return false;
		});
	}
	else if (!helpmode) {
		if (userData[key]) {
			// 27: Esc key
			if (key !== 27) {
				if (userData[key]['targetUrl']) {
					var currentUrl = window.location.href;
					var lastSlash = currentUrl.lastIndexOf('/');
					var currentUrl = currentUrl.substring(0,lastSlash);
					window.location.href = currentUrl + userData[key]['targetUrl'];
				}
			}
		}
	}
};

var userData = {
	// '1' key
	'49': {
		id: 'person_a_chart',
		targetUrl: '/myChart.html?id=person_a_chart'
	},
	// '2' key
	'50': {
		id: 'person_b_chart',
		targetUrl: '/myChart.html?id=person_b_chart'
	},
	// '3' key
	'51': {
		id: 'person_c_chart',
		targetUrl: '/myChart.html?id=person_c_chart'
	}
}
