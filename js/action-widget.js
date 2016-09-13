

//Action Toolbar Javascript

//feedbackify part of action toolbar

	$(document).ready(function(){
		var shareBarVisible = false;
		var $hideButton = $("#hide-button");
		var $actionToolbar = $(".action-toolbar");
		var $shareActive = $("#share-active");
		var $showText = $(".show-text");
		var $downChevron = $(".white-downchevron-10");
		var $toggleHide = $(".toolbar-hide");
		var $hideText = $(".toolbar-hide-text");
		//var $toolbarOpacity=$(".toolbar-opacity");
		var addthis_config = {ui_use_css : false};
		var addthis_loaded = false;
		//if session storage isnt set initialized then creates session storage
		function toolbarLoad(){
			$actionToolbar.toggleClass("action-toolbar-lowered");
			$downChevron.toggleClass("white-upchevron-10 upchevron-position");
			$showText.toggleClass("show-box");
			$toggleHide.toggleClass("toolbar-hide-lower");
			$hideText.toggleClass("hide-before hidden");
		}

	if(!sessionStorage.getItem('toolbarHidden')){
		sessionStorage.setItem('toolbarHidden', 'false');
	}
		if(sessionStorage.getItem('toolbarHidden')=='true'){
				toolbarLoad();
				$('.action-toolbar').removeClass('hide');
		}else{
			$.getScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5796297c9cb7080d#async=1');
			addthis_loaded= true;
			$('.action-toolbar').removeClass('hide');
			//load scripts
		}
		$hideButton.click(function(){
			toolbarLoad();
			if(shareBarVisible == true){
				$(".hidden-share-bar").toggleClass("share-bar");
				$actionToolbar.toggleClass("action-toolbar-raised");
				$toggleHide.toggleClass("toolbar-hide-raised");
			}
			if(sessionStorage.getItem('toolbarHidden')== "false"){
				sessionStorage.setItem('toolbarHidden', 'true');
			}else{
				sessionStorage.setItem('toolbarHidden', 'false');
			}
			if(addthis_loaded == false){
				$.getScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5796297c9cb7080d#async=1');
				addthis_loaded=true;
			}
		});
		$shareActive.click(function(){
			$actionToolbar.toggleClass("action-toolbar-raised");
			$(".hidden-share-bar").toggleClass("share-bar");
			$toggleHide.toggleClass("toolbar-hide-raised");
			if(shareBarVisible == false){
				shareBarVisible = true;
			}
			else{
				shareBarVisible = false;
			}
		});

		//when facebook,pinterest, or email icon clicked laods addthis
		$('.share-link').click(function(){
			if(addthis_loaded == false){
				initAddThis();
				addthis_loaded = true;
			}
		});
		function initAddThis(){
			addthis.init();
		}
		$('.toolbar-printer').click(function(){
			window.print();
		});
		$('#hide-button').removeClass('hidden');
		$('.action-toolbar').removeClass('hidden');
		// grabs the URL and title and inputs it in the share URL provided by facebook
			/*
		$('.facebook-link').click(function(){
			var url = window.location.href;
			//var title =  $(document).attr('title');
			var title = $('meta[property="og:title"]').attr('content');
			window.open("https://www.facebook.com/sharer/sharer.php?u="+url+"&t="+title);
		});
		//Grabs the URL, title, and first img on the page and inputs it into the share URL provided by pinterest.
		$('.pinterest-link').click(function(){
			var url = window.location.href;
			var title = $(document).attr('title');
			var image = document.getElementsByTagName('img')[0].src;
			//var imageURI = encodeURI(image);
			window.open("http://pinterest.com/pin/create/bookmarklet/?media="+image+"&url="+url+"&is_video=false&description="+title);
		});*/
		if($('.show-chat').length > 0){
			$('.toolbar-chat').removeClass('hidden');
		}
		if($('.disable-brochure-link').length === 0 && $('.toolbar-brochure').length > 0){
			if(localeData == undefined || localeData == null){
				$(document).on('getLocale', function(){
					initBrochureToolbar($('.action-toolbar'));
				});
			}else{
				initBrochureToolbar($('.action-toolbar'));
			}

	};
	function initBrochureToolbar($container) {
		if (localeData.brochures == 'true') {
			var getBrochureUrl = $('#navbar').find('.navbar-brochure').attr('href');
			//show button and populate the url for the brochure link
			$container.find('.toolbar-brochure').prop('href',getBrochureUrl).closest('.toolbar-item').removeClass('hidden');
			//force the link to open in the parent page when $container is not in top document
			if (window.self !== window.top) {
				$container.find('.toolbar-brochure').prop('target','_parent');
			}
		}
	}

	 // Action Widget

});
	jQuery(document).ready(function ($) {
		if ($('.actions-widget').length > 0) {
			//initialize share drawer
			if ($('.action-share').length > 0) {{

			}
				initShareAction($('#content'));
			}

			//initialize the action widget brochure button if link is in nav, or when brochureReady is triggered.
			if ($('.action-brochure').length > 0) {
				if (localeData == undefined || localeData == null) {
					$(document).on('getLocale', function () {
						initBrochureAction($('.actions-widget'));
					});
				} else {
					initBrochureAction($('.actions-widget'));
				}
			}
			//initialize the action widget special offers button if the link in header, or when specialOffersReady
			if ($('.action-offers').length > 0) {
				if (localeData == undefined || localeData == null) {
					$(document).on('getLocale', function () {
						initSpecialOfferAction($('.actions-widget'));
					});
				} else {
					initSpecialOfferAction($('.actions-widget'));
				}
			}

			$(document).on('click', '.action-item > a, .action-item > button, .action-item > span', function (e) {
				var $actionItem = $(this),
					actionOption = $actionItem.data('actionOption'),
					actionText = $actionItem.find('.text-line, .util-link').text();

				if (typeof dataLayer == 'object') {
					dataLayer.push({
						'event': 'action-widget-click',
						'action-option': String(actionOption),
						'action-text': String(actionText)
					});
				}
				if (actionOption == 'cruise with me' || actionOption == 'search cruises' || actionOption == 'get brochure') {
					e.preventDefault();
					setTimeout(function () {
						window.location.href = $actionItem.attr('href');
					}, 120);
				}
			});
		}
	});
	function initShareAction($container) {
		$container.on('click', '.action-share', function (e) {
			e.preventDefault();
			var $actionShareBtn = $(this);
			$actionShareBtn.toggleClass('active').trigger('blur').closest('.article-header').find('.action-share-drawer').slideToggle(function () {
				var actionStatus = '';
				if ($(this).is(':shareBarVisible')) {
					dataLayer.push({
						'event': 'action-drawer-open',
						'action-drawer-content': String('social share links')
					});
				}
			});
		});

		var addthisUrl = $container.find('.addthis_toolbox').attr('addthis:url');

		if (addthisUrl.substring(0,1) == '/') {
			addthisUrl = window.location.protocol + '//' + window.location.hostname + addthisUrl;
			$container.find('.addthis_toolbox').attr('addthis:url',addthisUrl);
		}
	}

	function initSpecialOfferAction($container) {
		if (localeData.specialOffers == 'true') {
			var guestInfoObj = guestProfile.getInfo();

			if (guestInfoObj == null) {
				// always show the specialOffers button (by using N) if guestInfo is not available
				displaySpecialOfferAction($container, 'N');
			} else {
				displaySpecialOfferAction($container, guestInfoObj.specialOffersFlag);
			}
		}
	}

	function displaySpecialOfferAction($container, specialOffersFlag) {
		if (specialOffersFlag === 'N') {
			var specialOffersUrl = $bookURL + '/captaincircle/specialOfferRegistration.page?popupCondition=special-offers-button-click&pageSection=action-widget&formType=popup';
			//show the special offer button and create a custom click event
			if (window.self === window.top) {
				$container.find('.action-offers').addClass('open-mfp mfp-iframe').prop('href',specialOffersUrl).attr({'data-mfp-width':'640px','data-mfp-height':'690px','data-mfp-main-class':'special-offers'}).closest('.action-item').removeClass('hidden');
			} else {
				$container.on('click','.action-offers', function () {
					e.preventDefault();
					$('.action-offers', window.parent.document).trigger('click');
				});
			}
		}
	}
	function initBrochureAction($container) {
		if (localeData.brochures == 'true') {
			var getBrochureUrl = $('#navbar').find('.navbar-brochure').attr('href');
			//show button and populate the url for the brochure link
			$container.find('.action-brochure').prop('href',getBrochureUrl).closest('.action-item').removeClass('hidden');
			//force the link to open in the parent page when $container is not in top document
			if (window.self !== window.top) {
				$container.find('.action-brochure').prop('target','_parent');
			}
		}
	}
