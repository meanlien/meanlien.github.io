//and example of how to listen for p13AfterDelivery custom event.
//.promo-row is the parent that holds the p13 calls
// $('.promo-row').on('p13nAfterDelivery', '.promo', function (e, data) {
	// do something here
// }

$(document).ready(function () {

	//check user local to see if a redirect modal should be displayed
	localeNotice.init($('#locale-notice'));

	// $content is referenced in many scripts below
	var $content = $('#content');

	var vertAlignCounter = 0;
	var vertAlignCheck = setInterval(function() {
		if ($('.vert-align-col').length > 0) {
			vertAlignCol('.vert-align-col');
			vertAlignCheck != false;
				
			$(window).on('resize',function () {
				vertAlignCol('.vert-align-col');
				if (vertAlignCheck != false) {
					clearInterval(vertAlignCheck);
					vertAlignCheck = false;
				}
			});
		}


		if (vertAlignCounter < 10) {
			vertAlignCounter++;
		} else {
			if (vertAlignCheck != false) {
				clearInterval(vertAlignCheck);
				vertAlignCheck = false;
			}
		}
	},500);

	/*
	//initialize vert align of columns
	if ($('.vert-align-col').length) {
		
		var vertAlignCounter = 0;
		var vertAlignInterval = setInterval(function () {
			vertAlignCol('.vert-align-col');
			
			if (vertAlignCounter < 10) {
				vertAlignCounter++;
			} else {
				if (vertAlignInterval != false) {
					clearInterval(vertAlignInterval);
					vertAlignInterval = false;
				}
			}
		},500);
		
		$(window).on('resize',function () {
			vertAlignCol('.vert-align-col');
			if (vertAlignInterval != false) {
				clearInterval(vertAlignInterval);
				vertAlignInterval = false;
			}
		});
	}
	*/

	/*
	 * Initialize droptab when need
	 */
	if ($content.find('.drop-tab').length > 0) {
		droptabs.init($content.find('.drop-tab'), '#content');
		easytabsCallbacks($content);
	}

	var horzCarouselCount = 0;
	var horzCarouselCheck = setInterval(function() {
		if ($('.horz-carousel').length > 0) {
			//stop checking for the horz-carousel
			clearInterval(horzCarouselCheck);
			$.when(
				$.ajax({
					url: '/js/global/horz-carousel.js',
					cache: 'true',
					dataType: 'script'
				})
			).then(function(script) {
				initHorzCarousel();
			});
		}
		
		//stop checking for the video carousel after 5 seconds
		if (horzCarouselCount < 10) {
			horzCarouselCount++;
		} else {
			clearInterval(horzCarouselCheck);
		}
	},500);
	
	/*
	 * Picture Element
	 */
	// check if picture element is on page, if so, load picturefill plugin to add support if browser needs it
	if ($('picture').length > 0) {
		pictureEl.init($('html'));
	}
	// check for the pictureEl when p13AfterDelivery happens
	$(document).on('p13nAfterDelivery', function (e, data) {
		if ($('picture').length > 0) {
			pictureEl.init($('html'));
		}
	});

	/*
	 * Background Image Show
	 */
	//remove the BG from the container on pages with bg-slideshow-container
	var $bgSlideshowContainer = $('.bg-slideshow-container');
	if ($bgSlideshowContainer.length) {
		$bgSlideshowContainer.closest('#container').css('background-image','none');
	}
	var bgSlideShowCount = 0;
	var bgSlideShowCheck = setInterval(function() {
		var $bgSlideshowItem = $('.bg-slideshow-item');
		if ($bgSlideshowItem.length > 0) {
			//stop checking for the bg-slideshow
			clearInterval(bgSlideShowCheck);

			var $bgSlideshow = $('.bg-slideshow'),
			    bgSlideshowIndex = 0;

			// set the id for image and link 
			$bgSlideshowItem.each(function () {
				$(this).find('img').attr('id', 'bg-slide-img-' + bgSlideshowIndex);
				$(this).find('a').attr('id', 'bg-slide-link-' + bgSlideshowIndex);
				bgSlideshowIndex++;
			});

			//remove focus from the background slide link
			$bgSlideshowItem.find('a').on('click',function() {
				$(this).trigger('blur');
			});

			//initialize jCycle when there are multiple slides in the bg-slideshow
			if ( $bgSlideshowItem.length > 1 && typeof $.fn.cycle == 'function' ) {
				$bgSlideshow.cycle({
					fx: 'fadeout',
					swipe: true,
					speed: 1000,
					manualSpeed: 1000,
					pauseOnHover: true,
					timeout: 5000,
					//autoHeight: false,
					slides: '> .bg-slideshow-item',
					prev: '~ .bg-slideshow-prev',
					next: '~ .bg-slideshow-next',
					pager: '~ .bg-slideshow-nav',
					pagerTemplate: '<a href="#">&#9679;</a>',
					log: false
				});

				if ($bgSlideshow.parent().hasClass('not-ready')) {
					$bgSlideshow.parent().removeClass('not-ready');
				}
			}
		}
		//stop checking for the video carousel after 5 seconds
		if (bgSlideShowCount < 100) {
			bgSlideShowCount++;
		} else {
			clearInterval(bgSlideShowCheck);
		}
	},50);
	
	//initialize jCycle when there are multiple slides in the slideshow
	if ( $('.slideshow > img').length > 1 ) {
		initSlideShow($('.slideshow'));
	}

	//initialize video gallery
	if( $('.video-container').length > 0 ) {
		initVideoGallery($('.video-container'));
	}

	//sticky bar
	var counterStickybar = 0;
	var checkStickybar = setInterval(function () {
		if ($('.sticky-bar').length > 0) {
			//stop checking for sticky-bar
			clearInterval(checkStickybar);

			var $stickyBar = $('.sticky-bar'),
				$stickyWrapper = $stickyBar.closest('.sticky-wrapper'),
				$stickyWrapperParent = $stickyWrapper.parent(),
				stickyHeight = $stickyBar.height();
				stickyPosition = $stickyWrapper.offset().top,
				browserScrollPosition = $(window).scrollTop(),
				stopPosition = ($stickyWrapperParent.offset().top + $stickyWrapperParent.outerHeight()) - stickyHeight;
			
			//set the min-height to reserve the space within the dom
			$stickyWrapper.css('min-height',stickyHeight);
			
			$(window).on('resize',function () {
				stickyHeight = $stickyBar.height();
				$stickyWrapper.css('min-height',stickyHeight);
			});

			$(window).on('scroll resize',function () {

				browserScrollPosition = $(window).scrollTop();
				stopPosition = ($stickyWrapperParent.offset().top + $stickyWrapperParent.outerHeight()) -  stickyHeight;

				if (browserScrollPosition > stickyPosition) {
					$stickyBar.addClass('fixed');

					if (browserScrollPosition < stopPosition) {
						$stickyBar.removeClass('stop');
					} else {
						$stickyBar.addClass('stop');
					}

				} else {
					$stickyBar.removeClass('fixed');
				}

			});
		}
		
		//stop checking for sticky-bar after 5 seconds
		if (counterStickybar < 10) {
			counterStickybar++;
		} else {
			clearInterval(checkStickybar);
		}

	}, 500); 

	//Hide the special offers button if the button is hidden in the header
	if (localeData == undefined || localeData == null) {
		$(document).on('getLocale', function () {
			// hide special offers button at bottom of the page
			if (localeData.specialOffers == 'true' && hasLoggedIn()) {
				$('.article-aside').find('.special-offers-holder').addClass('hidden').prev('.col-sm-6').removeClass('col-sm-6');

				$('.article-aside').on('p13nAfterDelivery', function (e, data) {
					$('.article-aside').find('.special-offers-holder').addClass('hidden').prev('.col-sm-6').removeClass('col-sm-6');
				});
			}
		});
	} else {
		// hide special offers button at bottom of the page
		if (localeData.specialOffers == 'true' && hasLoggedIn()) {
			$('.article-aside').find('.special-offers-holder').addClass('hidden').prev('.col-sm-6').removeClass('col-sm-6');

			$('.article-aside').on('p13nAfterDelivery', function (e, data) {
				$('.article-aside').find('.special-offers-holder').addClass('hidden').prev('.col-sm-6').removeClass('col-sm-6');
			});
		}
	}


	// update the display of the special offers button based on specialOffersFlag
	specialOffersClick.init($('.article-container'));
	specialOffersClick.init($('.article-aside'));
	// also check after p13 has fired
	$('.article-container, .article-aside').on('p13nAfterDelivery', function (e, data) {
		specialOffersClick.init($(this));
	});
		
	/*
	 * Align Floating Cards
	 */

	if ($('.floating-cards').length > 0) {
			
		$('.floating-cards').each(function () {
			var $floatingCards = $(this);
			
			$(window).on('resize', function () {
				alignFloatingCards($floatingCards);
			});

			var floatingCardsCounter = 0;
			var floatingCardsCheck = setInterval(function() {
				alignFloatingCards($floatingCards);

				if (floatingCardsCounter < 10) {
					floatingCardsCounter++;
				} else {
					clearInterval(floatingCardsCheck);
				}
			},500);
		});
	}


	if ($('.rwd-accordion-wrapper').length > 0) {
		loadAccordion();
	}


	/*
	 * Lightboxes - custom call back to initialize a scripts for easytabs, accordions, vertical-align
	 */
	$('body').on('mfpAjaxContentAdded', function (e) {
		var magnificPopup = $.magnificPopup.instance;
		
		if (magnificPopup.content.find('.rwd-accordion-wrapper').length) {
			loadAccordion();
		}

		if (magnificPopup.content.find('.slideshow').length) {
			initSlideShow($('.slideshow'));
		}

		if (magnificPopup.content.find('.vert-align-col').length) {
			var lightboxVertAlignCount = 0;
			var lightboxVertAlignCheck = setInterval(function() {
				vertAlignCol('.vert-align-col');
				//stop checking for vert-align changes after 5 seconds
				if (lightboxVertAlignCount < 100) {
					lightboxVertAlignCount++;
				} else {
					clearInterval(lightboxVertAlignCheck);
				}
			},50);
		}
		
		if (magnificPopup.content.find('.drop-tab').length > 0 && magnificPopup.content.find('.drop-tab').data('easytabs') == true) {
			easytabsCallbacks($('.popupContainer'));
		}

	});


	/*
	 * For any link within the content of the page with the class of special-offers-click, 
	 * bind the click event to trigger a click on the special offers button in the header
	 */
	$(document).on('click', '.article-container .special-offers-click, #article-container .special-offers-click, .article-aside .special-offers-click', function (e) {
		e.preventDefault();
		$('#navbar').find('.navbar-special-offers')[0].click();
	});

	/*
	 * Scroll the browser when a user clicks on an achor link.
	 */
	$(document).on('click', '.anchor-scroll, .anchor-btn', function (e) {
		e.preventDefault();
		//call function to scroll browser window to the #id
		anchorScrollTo($($(this).attr('href')));
	});
	$(document).on('change', '.anchor-scroll', function (e) {
		e.preventDefault();
		//capture the target
		var target = $(this).val();
		//if the target begins with #, scroll to the anchor point. Otherwise, direct the browser to a new page
		if (target.indexOf('#') == 0) {
			//call function to scroll browser window to the #id
			anchorScrollTo($($(this).val()));
		} else {
			window.location = target; // redirect
		}
		//on change, remove focus from the select element, and then change the selected option to default
		$(this).trigger('blur').find('option:eq(0)').prop('selected',true);
	});
	// scroll page after p13 loads
	$('#content').on('p13nAfterDelivery', function (e, data) {
		var hash = window.location.hash;
		// need to make sure we filter out addThis url hash since it begins with a '.'
		if (hash != '' && hash.charAt(1) != '.') {
			anchorScrollTo($(hash));
		}
	});
	
	/*
	 * Check for panorama
	 */
	if ($('#panorama-view').length > 0) {
		initPanorama($('#panorama-view'));
	}

	/*
	 * Give WebOps the ability to control which pages will have the auto special offers lightbox
	 */
	if ($content.data('autoSpo') == true) {
		var delay = $content.data('autoSpoDelay'),     //number of milliseconds 
		    code = $content.data('autoSpoCode'),       //WWWSPCLOFR (default)
		    section = $content.data('autoSpoSection'), //learn,cruise-destinations
		    trade = $content.data('autoSpoTrade');     //will remove destinations options from popup
		//if code is not provided, throw an error and stop
		if (typeof code == 'undefined' || code == '') {
			return false;
		}
		//if section is not provided, throw an error and stop
		if (typeof section == 'undefined' || section == '') {
			return false;
		}
		//run the call to begin the auto special offers 
		autoOpenSpecialOffers.init(delay,code,section,trade);
	}

	// for site search on the 404 page. to be updated later when we implement site search
	var $siteSearchForm = $('.site-search-form');
	if ($siteSearchForm.length > 0) {
		siteSearchForm.init($('#site-search-field'));
	}

	// initialize feedbackify when the script is not on the page
	if (typeof fby == 'undefined' && window.location.pathname != '/' && window.location == window.parent.location) {
		//feedbackify.init('4896');
	}

});	

// show special offers in stickybar if the user is not logged in and eligible for Special Offers
function displaySpecialOffersClick($stickyBar) {
	if (localeData.specialOffers == 'true' && !hasLoggedIn()) {
		$stickyBar.find('.special-offers-click, .cbn-special-offers').css({'visibility':'visible'}).next().css({'visibility':'visible'});
	} else {
		$stickyBar.find('.special-offers-click, .cbn-special-offers').addClass('hidden').next().css({'visibility':'visible'});
	}
}


// show special offers in stickybar if the user is not logged in and eligible for Special Offers
var specialOffersClick = {
	init: function ($container) {
		if (localeData == undefined || localeData == null) {
			// wait for getLocale to run is localeData is undefined
			$(document).on('getLocale', function () {
				specialOffersClick.test($container);
			});
		} else {
			specialOffersClick.test($container);
		}
	},
	test: function ($container) {
		if (localeData.specialOffers == 'true') {
			var guestInfoObj = guestProfile.getInfo();

			if (guestInfoObj == null) {
				// always show the specialOffers button (by using N) if guestInfo is not available
				specialOffersClick.display($container, 'N');
			} else {
				specialOffersClick.display($container, guestInfoObj.specialOffersFlag);
			}
		}
	},
	display: function ($container,specialOffersFlag) {
		var $specialOffersBtn = $container.find('.special-offers-click, .cbn-special-offers');
		
		$specialOffersBtn.each(function () {
			var $thisBtn = $(this);
			// hide button if specialOffersFlag is Y
			if (specialOffersFlag === 'Y') { 
				$thisBtn.addClass('hidden');
				// display other buttons in sticky bar
				if ($thisBtn.parent().hasClass('sticky-bar')) {
					$thisBtn.next().css({'visibility':'visible'});
				}
				// center other content in grey box when special offers is hidden
				if ($thisBtn.parent().hasClass('special-offers-holder')) {
					$thisBtn.closest('.special-offers-holder').addClass('hidden').prev('.col-sm-6').removeClass('col-sm-6');
				}
			} else {
				// display all buttons in sticky bar
				if ($thisBtn.parent().hasClass('sticky-bar')) {
					$thisBtn.css({'visibility':'visible'}).next().css({'visibility':'visible'});
				}
			}
		});
	}
}

function initPanorama($panorama) {
	if(!$.fn.panorama360){
		$.when(
			$.ajax({
				url: '/css/global/lightbox-panorama.css',
				cache: 'true',
				dataType: 'text'
			}),
			$.ajax({
				url: '/js/global/jquery/plugins/panorama/jquery.panorama.js',
				cache: 'true',
				dataType: 'script'
			})
		).then(function(css,js) {
			$("head").append("<style>" + css + "</style>");
			$panorama.panorama360();
		});
	}else{
		$panorama.panorama360();
	}
}

function loadAccordion(){
	if (typeof accordion == 'undefined') {
		$.loadScript('/js/global/jquery/plugins/princess-accordion/accordion.js', true, function () {
			initAccordion();
		});
	} else {
		initAccordion();
	}
}

function initAccordion() {
	accordion.init({
		'wrapper' : '.rwd-accordion-wrapper',
		'item' : '.rwd-accordion',
		'header' : '.rwd-accordion-header',
		'content' : '.rwd-accordion-content',
		'autoScroll' : false
	});
}

function initSlideShow($slideshow) {
	$slideshow.cycle({
		fx: 'scrollHorz',
		swipe: true,
		speed: 1000,
		manualSpeed: 1000,
		pauseOnHover: true,
		timeout: 5000,
		prev: '~ .slideshow-prev',
		next: '~ .slideshow-next',
		pager: '.slideshow-thumb-nav',
		pagerTemplate: '',
		caption: '> .slideshow-caption',
		captionTemplate: '{{alt}}', 
		log: false
	});

	if ($slideshow.closest('.slideshow-row').hasClass('not-ready')) {
		$slideshow.closest('.slideshow-row').removeClass('not-ready');
	}
}

function initVideoGallery($gallery) {
	//load new video with video-thumb-link is clicked
	$gallery.on('click','.video-thumb-link', function (e) {
		$gallery.find('.video-thumb').removeClass('active');
		$(this).closest('.video-thumb').addClass('active');
		loadVideo($(this));
	});

	//click the first thumbnail to load video
	$gallery.find('.video-thumb-link').eq(0).trigger('click');

	//activate video arrows when there is more than one video
	var videoThumbCount = $('.video-thumb').length;

	if (videoThumbCount > 1) {
		$gallery.find('.video-row').removeClass('not-ready');

		$gallery.on('click', '.video-controls', function (e) {
			var $videoControlBtn = $(this),
				activeIndex = $gallery.find('.video-thumb.active').index();

			//select previous video
			if ($videoControlBtn.hasClass('video-prev')) {
				if (activeIndex == 1) {
					$gallery.find('.video-thumb-link').eq(videoThumbCount-1).trigger('click');
				} else {
					$gallery.find('.video-thumb.active').prev().find('.video-thumb-link').trigger('click');
				}
			}

			//select next video
			if ($videoControlBtn.hasClass('video-next')) {
				if (activeIndex == videoThumbCount) {
					$gallery.find('.video-thumb-link').eq(0).trigger('click');
				} else {
					$gallery.find('.video-thumb.active').next().find('.video-thumb-link').trigger('click');
				}
			}
		});
	}
}

function loadVideo($videoThumbLink){
	var id = $videoThumbLink.data('video-id'),
		title = '<h2>' + $videoThumbLink.data('video-title') + '</h2>',
		content = $videoThumbLink.data('video-caption');

	$('#gallery-main-video').data('video-id',id).find('iframe').prop('src','//www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autohide=1&wmode=transparent');
	
	$('#video-caption').html(title + content);
}

function initAddThis(){
	if (window.addthis) {
		addthis.toolbox('.addthis_toolbox');
		addthis.counter('.addthis_counter');
	}
	else{
		$.getScript('//s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4fc673615553b316#async=1');
	}
}

function vertAlignCol(vertAlignRow) {
	var widthCat = windowCat($(window).width());

	$(vertAlignRow).each(function () {
		var $row = $(this),
			maxHeight = 0;

		//find the max col height
		$row.children('div').each(function () {
			if ($(this).outerHeight() > maxHeight) {
				maxHeight = $(this).outerHeight();
			}
		});

		//apply margin-top to vertical-align column
		$row.children('div').each(function () {
			var $col = $(this),
				t = 0;

			if ($col.outerHeight() < maxHeight && !$col.hasClass('col-' + widthCat + '-12') && !$col.hasClass('col-' + widthCat + '-no-vert-align')) {
				t = (maxHeight - $col.outerHeight()) / 2;
			}

			$col.css('margin-top',t);				
		});

	});
}

/*
 * [anchorScrollTo] - Instead of jumping to the element, this will scroll the browser to the element
 *
 * @param {Object} $anchor object - element being scrolled too
 */
function anchorScrollTo($anchor) {
	if ($anchor.length > 0) {
		if ($anchor.closest('.mfp-wrap').length > 0) {
			var anchorOffsetTop = $anchor.offset().top,
				mfpwrapOffsetTop = $('.mfp-wrap').offset().top,
				adjOffsetTop = anchorOffsetTop - mfpwrapOffsetTop;
			$('.mfp-wrap').stop().animate({scrollTop: (adjOffsetTop)-10 }, 500);
		} else {
			$('html,body').stop().animate({scrollTop: ($anchor.offset().top)-20 }, 500);
		}
	}
}

/**
* Used to evaluate the height of $element(s) and set a min-height based on the tallest element
*
* @param {Object} $floating-cards object
*/
function alignFloatingCards($floatingCards) {
	var widthCat = windowCat($(window).width()),
		setMinHeight = true;

	if ($floatingCards.find('.card-col').hasClass('col-' + widthCat + '-12')) {
		setMinHeight = false;				
	}
	if ($floatingCards.find('.card-title').length > 0) {
		equalHeight($floatingCards.find('.card-title'), setMinHeight);
	}
	if ($floatingCards.find('.card-content').length > 0) {
		equalHeight($floatingCards.find('.card-content'), setMinHeight);
	}
	if ($floatingCards.find('.card').length > 0) {
		equalHeight($floatingCards.find('.card'), setMinHeight);	
	}
	if ($floatingCards.find('.article-caption').length > 0) {
		equalHeight($floatingCards.find('.article-caption'), setMinHeight);	
	}
}


/**
 * [equalHeight] - Evaluate the height of a group of elements to set a min-height based on the tallest element
 *
 * @param {jQuery Object} $elements to adjust min-height
 * @param {Boolean} when setMinHeight is true, function will scan all $element(s) to find maxHeight
 */
function equalHeight($elements,setMinHeight) {
	$elements.css('min-height', 0);
	if (setMinHeight) {
		var maxHeight = findMaxHeight($elements);
		maxHeight = Math.round(maxHeight) + 1;
		$elements.css('min-height', maxHeight);
	} 
}

/**
 * [findMaxHeight] - Return the height of the tallest item within a group of elements
 * @param  {jQuery Object} $elements to find max height out of group
 * @return {number} returns the max-height of all the elements
 */
function findMaxHeight($elements) {
	var maxHeight = 0;
	$elements.each(function () {
		var currentHeight = $(this).outerHeight();
		if (currentHeight > maxHeight) {
			maxHeight = currentHeight;
		}
	});
	return maxHeight;
}

function easytabsCallbacks($container) {
	
	//pause the photo gallery when switching to another tab
	$container.on('easytabs:before', function (e, $clicked, $targetPanel, settings) {
	
		var $currentTab = $('.easy-tabs-panels > .active');

		//if ($currentTab.find('#photo-content').length) {
		if ($currentTab.find('.slideshow').length) {
			$('.slideshow').cycle('pause');
		}

	});

	//un-pause when the user returns to the photo gallery
	$container.on('easytabs:after', function (e, $clicked, $targetPanel, settings) {
	
		//if ($targetPanel.find('#photo-content').length) {
		if ($targetPanel.find('.slideshow').length) {
			$('.slideshow').cycle('resume');
		}

		//set the min-height after each tab is loaded
		$targetPanel.closest('.article-container').css({'min-height': $targetPanel.outerHeight() });

	});

	var isFirstTabLoaded = false;

	//initalize galleries when content is loaded
	$container.on('easytabs:ajax:complete', function (e, $clicked, $targetPanel, response, status, xhr) {

		//if ($targetPanel.find('#photo-content').length) {
		if ($targetPanel.find('.slideshow').length) {
			initSlideShow($('.slideshow'));
		}

		//if ($targetPanel.find('#video-content').length) {
		if ($targetPanel.find('.video-container').length) {
			initVideoGallery($('.video-container'));
		}

		//set the min-height for when the first tab is loaded
		if (!isFirstTabLoaded) {
			isFirstTabLoaded = true;
			$targetPanel.closest('.article-container').css({'min-height': $targetPanel.outerHeight() });
		}

	});
}


/*

$(document).ready(function () {
		
	if($('#slideshow').length > 0){
	$('#slideshow').cycle();
			
	// Sequential image loading to reduce amount of data transfered on load 
	$('#slideshow').on( 'cycle-before', function(e, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
		nextImg = $('#slideshow img').eq(optionHash.nextSlide + 1);
		if ( nextImg.attr("src") == "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="){
			nextImg.attr("src", nextImg.attr("data-img"));
		}	
	});
}
	
});

*/

var localeNotice = {

	init: function ($container) {
		var checkingLocale = setInterval(function () {
			//make sure loc has been defined, before running locale check
			if (typeof loc != 'undefined') {
				clearInterval(checkingLocale);
				//if the check comes back as false, trigger the locale notice modal window
				if (localeNotice.check($container) == false) {
					localeNotice.display($container);
				}
			}
		}, 50);
	},
	
	check: function ($container) {
		//check if localeContainer is on page
		if ($container.length > 0) {
			//check if path matches url provided in $container
			if (window.location.pathname == $container.data(country.toLowerCase()) ) {
				$container.trigger('localeNotice.true');
				return true;
			} else {
				$container.trigger('localeNotice.false');
				return false;
			}
		} else {
			return;
		}
	},

	display: function ($container) {
		$.magnificPopup.open({
			items: {
				src: $container.html()
			},
			type: 'inline',
			removalDelay: 300,
			modal: true,
			mainClass: 'border-box-sizing local-alert',
			overflowY: 'scroll',
			callbacks: {
				elementParse: function(item) {
					var $source = $(item.src),
					    localeURL = $container.data(loc.toLowerCase());

					//if a locale url is not available for user's locale, hide the green button
					if (typeof localeURL == 'undefined') {
						$source.find('.title').text($container.data('altTitle'));
						$source.find('.message').text($container.data('altMessage'));
						$source.find('.cta-btn').parent('div').addClass('hidden');
						$source.find('.link-btn').text($container.data('altLinkText')).attr('href', $container.data('altLinkUrl'));
					} else {
						$source.find('.title').text($container.data('title'));
						$source.find('.message').text($container.data('message'));
						$source.find('.cta-btn').text($container.data('ctaText')).attr('href', localeURL);
						$source.find('.link-btn').text($container.data('linkText')).attr('href', $container.data('link-url'));
					}

					//pass the update lightbox markup to the plugin
					item.src = $source;
				}
			}
		});
	}

}

//Swiftype Install Code - Beacon. This script notifies the Swiftype crawler when a page has been updated.
loadJS('//s.swiftypecdn.com/cc/wtsyxuhuynEBbpajna-R.js');