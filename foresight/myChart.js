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
	// 27: Esc key
	if (helpmode && key == 27) {
		helpmode = false;
		$('.help-modal').modal('hide');
	}
	// 72: 'h' key
	else if (key == 72) {
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
		// 27: Esc key
		if (key == 27) {
			var currentUrl = window.location.href;
			var lastSlash = currentUrl.lastIndexOf('/');
			var currentUrl = currentUrl.substring(0,lastSlash);
			window.location.href = currentUrl + '/foresight.html';
		}
	}
};
