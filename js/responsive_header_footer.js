$(document).ready(function(){

	var touchMenu = $('#touch-menu'),
		princessHeader = $('#princess-header'),
		mainNav = $('#nav'),
		mainScrollPos = 0,
		mainWindowWidth = $(window).width();

	// Trigger the menu when user clicks the menu icon
	$(touchMenu).on('click',function(e){
		e.preventDefault();
		if(princessHeader.hasClass('isActive')){
			$('html,body').stop().scrollTop(mainScrollPos);
			menuHeight = 0;
			setTimeout(function(){
				mainNav.find('.open').removeClass('open').addClass('closed').find('.show').css('height',0).removeClass('show');
			},300);
		}else{
			mainScrollPos = $(window).scrollTop();
			$('html,body').stop().scrollTop(0);
			menuHeight = getNavHeight(1);
		}
		princessHeader.toggleClass('isActive');
		mainNav.css('height',menuHeight);
	});

	var sfwithul = $('.sf-with-ul');
	var subULs = sfwithul.find('ul');

	// Add the closed class to all sfwithul elements in the nav
	sfwithul.addClass('closed');

	// sub menu click behavior
	mainNav.on('click','.sf-with-ul > a',function(e){
		if($(window).width() >= 768){
			return;
		} else {
			e.preventDefault();
		}
		var target = $(this),
			subHeight = 0;
		if(target.next().hasClass('show') == true){
			// hiding an open sub menu
			target.next().css('height',0).removeClass('show');
		}else{
			// showing a new sub menu
			//$('#nav').find('.sf-menu ul').css('height',0).removeClass('show');
			// calculate height or the opening subnav
			/*
			target.next().find('li').each(function() {
            	subHeight += $(this).outerHeight(true);
            });
			*/

			// set height of the sub nav
			/*
			if(mainNav.find('.open').length > 0){
				// sub menu elements have the open class, wait for the closing animation to finish
				setTimeout(function(){
					target.next().css('height',subHeight).addClass('show');
				},300);
			}else{
				target.next().css('height',subHeight).addClass('show');
			}
			*/

			//target.next().css('height',subHeight).addClass('show');
			target.next().css('height','auto').addClass('show');

			// move viewport to the top of the newly opened subnav

			/*
			setTimeout(function(){
				$('body,html').animate({
					scrollTop: (target.offset().top - 50)
				},300);
			},100);
			*/
		}

		// Opening and closing subnav item
		if($(this).closest('.sf-with-ul').hasClass('open') == true){
			// closing an open sub menu
			$(this).closest('.sf-with-ul').removeClass('open').addClass('closed');
			setTimeout(function(){
				menuHeight = getNavHeight();
				// Apply height to #nav
				mainNav.css('height',menuHeight);
			},100)
		}else{
			// closing an open sub menu, remove any open class and add closed class, then add open class to the clicked element
			//sfwithul.removeClass('open').addClass('closed');
			$(this).closest('.sf-with-ul').removeClass('closed').addClass('open');
			setTimeout(function(){
				menuHeight = getNavHeight();
				// Apply height to #nav
				mainNav.css('height',menuHeight);
			},100)
		}
	});

	// Fallback for logo on non-svg devices

	// If user resizes window (orientation), fix styles to fit new size
	$(window).resize(function() {
        windowWidth = $(this).width();
		if(windowWidth == mainWindowWidth){
			return;
		} else {
			mainWindowWidth = windowWidth;
		}
		setHeaderTopSpacing(windowWidth,alertCheck());
		if(princessHeader.hasClass('isActive')){
			princessHeader.removeClass('isActive');
			princessHeader.find('#nav').css('height',0);
			princessHeader.find('.header-site-search').removeClass('mobile-visible').find('.form-field').removeClass('label-stack');
		}
		if(windowWidth < 768){
			princessHeader.find('#nav').css('height',0);
		} else {
			princessHeader.find('#nav').css('height','auto');
			princessHeader.find('.header-site-search').removeClass('mobile-visible').find('.form-field').removeClass('label-stack');
		}
    });

	$('#nav-sign-in').on('click',function(e){
		e.preventDefault();
		$('#signin-signout a').trigger('click');
	});

	var checkForAlerts = setInterval(function(){
		setHeaderTopSpacing($(window).width(),alertCheck());
	},1000);

	setTimeout(function(){
		if(($('#koi-alert').length == 0) && ($('#important-update').length == 0)){
			clearInterval(checkForAlerts);
		}
	},10000);


	$('#footer-feedback').on('click',function(e){
		e.preventDefault();
		$('#feedbackify').find('a').trigger('click');
	});
});



function alertCheck(){
	var alertCat = 0,
		alertKoi = 0,
		alertUpd = 0;
	if($('#koi-alert').length > 0){
		alertKoi = 1;
	}
	if($('#important-update').length > 0){
		alertUpd = 1;
	}
	if(alertKoi == 0 && alertUpd == 0){
		alertCat = 0;
	}
	if(alertKoi == 1 && alertUpd == 0){
		alertCat = 1;
	}
	if(alertKoi == 0 && alertUpd == 1){
		alertCat = 2;
	}
	if(alertKoi == 1 && alertUpd == 1){
		alertCat = 3;
	}
	return alertCat;
}

function setHeaderTopSpacing(windowWidth,alertCat){
	var container = $('#container');
	if(windowWidth > 767){
		container.css('padding-top',0).find('.headerbar').css('padding-top',0).find('.container').css('top',0);
		container.find('.header-site-search').removeAttr('style');
		return;
	}else{
		switch(alertCat){
			case 0:
				container.find('.headerbar').css('padding','');
				break;
			case 1:
				var extraHeight = $('#koi-alert').outerHeight(true);
				container.find('.headerbar').css('padding-top',extraHeight + $('.headerbar .container').outerHeight(true)).find('.container').css('top',extraHeight);
				container.find('.header-site-search').css('top',extraHeight + $('.headerbar .container').outerHeight(true));
				break;
			case 2:
				var extraHeight = $('#important-update').outerHeight(true);
				container.css('padding-top',extraHeight).find('.headerbar').css('padding-top',50).find('.container').css('top',extraHeight);
				container.find('.header-site-search').css('top',extraHeight + $('.headerbar .container').outerHeight(true));
				break;
			case 3:
				var extraHeight = $('#koi-alert').outerHeight(true) + $('#important-update').outerHeight(true);
				container.css('padding-top',$('#important-update').outerHeight(true)).find('.headerbar').css('padding-top',extraHeight).find('.container').css('top',extraHeight);
				container.find('.header-site-search').css('top',extraHeight + $('.headerbar .container').outerHeight(true));
				break;
		}
	}
}

function getNavHeight(){
	var nav = $('#nav'),
		menuCats = $('.sf-menu > li'),
		menuHeight = 0;

	menuCats.each(function() {
		if ($(this).is(':visible')) {
			menuHeight += $(this).outerHeight(true);
		}
	});
	menuHeight += 10; /* Create a 10px space between menu and content */

	return menuHeight;
}
