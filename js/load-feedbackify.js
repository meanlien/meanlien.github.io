/*
 * Initalize Feedbackify
 */

var feedbackify = {
	init: function (fbyID, fbyDisplay) {
		//exit if current window is not the parent. we don't want the feedbackify opening in lightboxes.
		if (self!=top) {
			return false;
		}

		//for feedbackify to work properly, fby must be in the global scope.
		fby = '',
		fby = fby || [];

		//default to "standard form" if a form id is not set
		if (typeof fbyID == 'undefined' || fbyID == '') {
			var fbyID = '4896';
		}

		feedbackify.pushSettings(fbyID, fbyDisplay);
		feedbackify.loadScript();
		if(!fbyDisplay){
			feedbackify.openWin(fbyID)
		}
	},
	pushSettings: function (fbyID, fbyDisplay) {
		//push default settings
	if(fbyDisplay){
		fby.push(['showTab', {id: fbyID, position: 'right', color: '#0054A0'}]);
	}
		//if mouseflow is in use for current user, send mouseflow service # for cross reference bewteen systems
		if (typeof getMFCookie == 'function' && getMFCookie('mf_record_user') && typeof mouseflow == 'object') {
			if (mouseflow.isRecording == true) {
				fby.push(["customData", "service_number", mfServiceNu() ]);
			}
		}
	},
	loadScript: function () {
		//load feedbackify script into dom
		var f = document.createElement('script'); f.type = 'text/javascript'; f.async = true;
		f.src = '//cdn.feedbackify.com/f.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(f, s);
	},
	openWin: function (fbyID) {
		$('#feedback-btn').click(function(){
			fby.push(['showForm', fbyID]);
		}).closest('.toolbar-feedback').removeClass('hidden');
	}
};
