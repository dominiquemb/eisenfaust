var currentKeypanel = false;
var currentModal = false;
var helpmode = false;
var keyboardmode = true;

$(document).ready(function() {
	$(document).on('keyup', function(evt) {
		if (keyboardmode) {
			processKeyUp(evt.which);
		}
	});

	$('.inputbar .textarea').on('focus', function() {
		keyboardmode = false;
	});

	$('.inputbar .textarea').on('blur', function() {
		keyboardmode = true;
	});
});

var focusPanel = function(key) {
	$('.filter-backdrop').addClass('show');
	$('.keypanel.' + panelData[key]['class']).removeClass('filtered').addClass('focused');
	$('.keypanel:not(.' + panelData[key]['class'] + ')').addClass('filtered');
}

var unfocusAllPanels = function() {
	$('.keypanel').removeClass('filtered').removeClass('focused');
	$('.filter-backdrop').removeClass('show');
}

var processKeyUp = function(key) {
	if (helpmode && key == 27) {
		helpmode = false;
		$('.help-modal').modal('hide');
	}
	else if (key == 112) {
		if (key == 112 && !currentKeypanel && !currentModal) {
			helpmode = true;
			$('.help-modal-1').modal({'backdrop': 'static'});
		}
		else if (key == 112 && currentKeypanel && !currentModal) {
			helpmode = true;
			$('.help-modal-2 .modal-body').html('<p>You have selected ' + panelData[currentKeypanel]['panel']  + '.</p><p>Press a number key to go to one of the features of this level.</p><p>Features and numbers can be seen on the left side of the box.</p><p>Press Esc to dismiss this window.</p>');
			$('.help-modal-2').modal({'backdrop': 'static'});
		}
		$('.help-modal .close').on('click', function(evt) {
			evt.preventDefault();
			evt.stopPropagation();

			helpmode = false;
			$('.help-modal').modal('hide');
			return false;
		});
	}
	else if (!helpmode) {
		if (panelData[key]) {
			currentKeypanel = key;

			focusPanel(key);
		}
		else if (panelData[currentKeypanel]) {
			if (key !== 27) {
				if (panelData[currentKeypanel]['modalTitles'][key]) {
					currentModal = key;
					var title = $('.keypanel-modal .modal-title').html(getModalTitle(currentKeypanel, key));
					var body = $('.keypanel-modal .modal-body').html(getModalBody(currentKeypanel, key));
					if (title && body) {
						$('.keypanel-modal').modal({'backdrop': 'static'});
						$('.keypanel-modal .close').on('click', function(evt) {
							evt.preventDefault();
							evt.stopPropagation();

							if (currentModal) {
								currentModal = false;
								$('.keypanel-modal').modal('hide');
							}
							else if (!currentModal) {
								unfocusAllPanels();
								currentKeypanel = false;
							}
							return false;	
						});
					}
				}
				else if (panelData[currentKeypanel]['targetUrls'][key]) {
					var currentUrl = window.location.href;
					var lastSlash = currentUrl.lastIndexOf('/');
					var currentUrl = currentUrl.substring(0,lastSlash);
					window.location.href = currentUrl + panelData[currentKeypanel]['targetUrls'][key];
				}
			}
			else if (key == 27 && currentModal) {
				currentModal = false;
				$('.keypanel-modal').modal('hide');
			}
			else if (key == 27 && !currentModal) {
				unfocusAllPanels();
				currentKeypanel = false;
			}
		}
	}
};

var panelData = {
	'66': {
		panel: 'Basecamp',
		class: 'basecamp',
		modalTitles: {
			'49': 'Projects',
			'50': 'Finances',
			'51': 'Resources',
			'52': 'Planning',
			'53': 'Reports'
		},
		modalBodies: {
			'49': '',
			'50': '',
			'51': '',
			'52': '',
			'53': ''
		}
	},
	'80': {
		panel: 'Power Climb',
		class: 'powerclimb',
		modalTitles: {
		//	'49': 'Foresight Loading/Capacity',
			'50': 'Visual Issues',
			'51': 'Altitude Dashboards',
			'52': 'PHD Timesheet'
		},
		targetUrls: {
			'49': '/foresight/foresight.html',
		},
		modalBodies: {
			/*'49': '',*/
			'50': '',
			'51': '',
			'52': ''
		}
	},
	'83': {
		panel: 'Summit',
		class: 'summit',
		modalTitles: {
			'49': 'Intelligent Issues',
			'50': 'Cascading Effects Simulator',
			'51': 'Special Forces Team',
			'52': 'Big Data Analytics'
		},
		modalBodies: {
			'49': '',
			'50': '',
			'51': '',
			'52': ''
		}
	}
	
};

var getModalTitle = function(panel, key) {
	if (panelData[panel]) {
		if (panelData[panel]['modalTitles']) {
			if (panelData[panel]['modalTitles'][key]) {
				return panelData[panel]['modalTitles'][key];
			}
		}
	}
	return false;
};

var getModalBody = function(panel, key) {
	if (panelData[panel]) {
		if (panelData[panel]['modalBodies']) {
			if (panelData[panel]['modalBodies'][key]) {
				return panelbodies[panel]['modalBodies'][key];
			}
		}
	}
	return false;
};
