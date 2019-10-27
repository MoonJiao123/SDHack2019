var wW;
var wH;
var transitionPageDelay = 800 + 50;

var scrollTop;
var currentPage;
var currentPageClass;
var currentProjectClass;
var brandPage = $('.navbar-brand .sub-page');
var footer = $('.footer');
var footerHeight;

var currentItem;
var currentScrollTop;
var projectItemClone;

var borderWidth;
var firstTime = true;

var touch = typeof window.ontouchstart !== 'undefined';
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
var $browser;


$(document).ready(function(){

	history.scrollRestoration = 'manual';

	initHeaderFooter = function(){

		$('.navbar-brand, #menu a').on('click', function(e){

			var rel = $(this).prop('rel');
			if (rel == "external") {
				return;
			}

			e.preventDefault();
			var target = $(this);
			var targetURL = target.attr('href');

			if (target.is('.navbar-brand')) {
				$('.home-link').addClass('active');
			}

			if ($('body').hasClass('openPopup')) {
				$('.popup .btn-close').trigger('click');
			}

			if ($('body').hasClass('showProject')) {
				$('body').removeClass('showProject');
			}

			if ($('body').hasClass('hideNav')) {
				$('body').removeClass('hideNav');
			}

			if ($('body').hasClass('addedProject')) {
				$('body').removeClass('addedProject');
			}

			if ($('body').hasClass('menuOpen')) {
				$('.navbar-toggle').trigger('click').delay(150).queue(function(){
					loadPage(targetURL);
					history.pushState({page:targetURL}, null, targetURL);
					$(this).dequeue();
				})
			} else {
				loadPage(targetURL);
				history.pushState({page:targetURL}, null, targetURL);
			}

			TweenLite.to(window, 0.3, {scrollTo: {y: 0}, ease: Power3.easeInOut});


		})

		var loaderTL = new TimelineMax({repeat:-1});
		loaderTL.set(".loaderpath", {drawSVG:"0%"})
		.to(".loaderpath", 0.8, {drawSVG:"0% 70%", ease:Power3.easeIn})
		.to(".loaderpath", 0.1, {drawSVG:"10% 80%", ease:Power3.easeNone})
		.to(".loaderpath", 0.1, {drawSVG:"20% 90%", ease:Power3.easeNone})
		.to(".loaderpath", 0.1, {drawSVG:"30% 100%", ease:Power3.easeOut})
		.to(".loaderpath", 0.8, {drawSVG:"100% 100%", ease:Power3.easeOut});

		$('.navbar-toggle').on('click', function(e){

			e.preventDefault();
			$('body').toggleClass('menuOpen');

			if(!$('body').hasClass('menuOpen')) {
				$(".navbar-toggle").trigger('mouseleave');
				if (is_iPad) { $('html').css({overflow:'auto', height:'auto'}); }
			} else {
				if (is_iPad) { $('html').css({overflow:'hidden', height:'100%'}); }
			}
		})

		$(".navbar-toggle").hover( function (e) {
		    $('body').toggleClass('menuHover', e.type === 'mouseenter');
		});

		$('.scrolltop').on('click', function(e){
			e.preventDefault();
			TweenLite.to(window, 0.8, {scrollTo: {y:0, autoKill:false}, ease: Power3.easeInOut});
		});

		$('.menuColor').on('click',function(e){
			$('.navbar-toggle').trigger('click');
		})

		$('.close-project').on('click', function(e){

			e.preventDefault();

			var target = $(this);
			var targetURL = target.attr('href');
			history.pushState({page:targetURL}, null, targetURL);

			if ($('body').hasClass('single-project')) {

				tlProject.reverse(0).timeScale(3);
				loadPage(targetURL);

			} else {

				var targetURL   = $( '.page-projects .close-project' ).attr( 'href' );
			    var new_title = $( '.page-projects .close-project' ).data( 'wp-title' );
				history.pushState({page:targetURL}, null, targetURL);

			    tlProject.reverse().timeScale(1.5);
				TweenLite.to(window, 0.7, {scrollTo: {y:0, autoKill:false}, ease: Power3.easeInOut, onComplete: function(){

					$('body').addClass('loadProject');
				    /*projectItemClone.show().css({top:0});
				    projectItemClone.find('.media.image').css({'transform':'translateY(0px)'});
				    projectItemClone.find('.fade').remove();*/

					$.ajax({ type: "GET",
					    url: targetURL,
					    success : function(data)
					    {

						    console.log('loaded Project');

						    var dataListProjects = $(data).find('main.page');
						    var new_title = dataListProjects.data( 'wp-title' );

							document.title = "Wokine. "+new_title;
							$('.page-container .page').remove();
						    $('body').removeClass('showProject '+currentProjectClass).removeClass('loadProject');

						    $('.page-container').append(dataListProjects).delay(30).queue(function(){
							   TweenLite.set(window, {scrollTo: {y:currentScrollTop}, autoKill:false, onComplete: function(){

							   		$('body').removeClass('hideNav addedProject');
							   		projectItemClone.removeClass('active').delay(800).queue(function(){
								   		$(this).remove().dequeue();
								   		initProjects();
							   		})

						   		}});

								$(this).dequeue();
							});

					    }
					});
				}});

			}

		})

		TweenLite.ticker.addEventListener("tick", onScroll);

		function onScroll() {

			scrollTop = $(window).scrollTop();

			if ( scrollTop > wH && !$('.scrolltop').hasClass('showed') ) {
			 	$('.scrolltop').addClass('visible');
			} else {
				$('.scrolltop').removeClass('visible');
			}


			 if (scrollTop > $('.page-container').outerHeight() - window.innerHeight + borderWidth - 60) {

			    if (wW > 768) {
				    TweenLite.set($('footer .briefLink'), { y: - footerHeight * 1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 1) , ease: Linear.easeNone });
					TweenLite.set($('footer .contact'), { y: - footerHeight * 0.5 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.5) , ease: Linear.easeNone });
					TweenLite.set($('footer .credits'), { y: - footerHeight * 0.1 + ((scrollTop - ($('.page-container').outerHeight() - window.innerHeight)) * 0.1) , ease: Linear.easeNone });
				}
			    TweenLite.set($('.scrolltop'), { y: - ( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth - 60)), ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'), { y: - ( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth - 60)), ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'), {css:{ opacity : 1 - (( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)) * 0.01)}});
				TweenLite.set($('.scrolltop'), {css:{ opacity : 1 - (( scrollTop - ($('.page-container').outerHeight() - window.innerHeight + borderWidth)) * 0.01)}});

				/*if (!$('.footer').hasClass('show')) {
					$('.footer').addClass('show');
					footerTl.restart(0);
				};*/

			} else {
				if (wW > 768) {
					TweenLite.set($('footer .briefLink'),{ y: - footerHeight * 1 , ease: Linear.easeNone });
					TweenLite.set($('footer .contact'),{ y: - footerHeight * 0.5 , ease: Linear.easeNone });
					TweenLite.set($('footer .credits'),{ y: - footerHeight * 0.1 , ease: Linear.easeNone });
				}
				TweenLite.set($('.scrolltop'),{ y: 0 , ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'),{ y: 0 , ease: Linear.easeNone });
				TweenLite.set($('.scrolldown'),{css:{ opacity :1}});
				TweenLite.set($('.scrolltop'),{css:{ opacity :1}});

				/*if ($('.footer').hasClass('show')) {
					$('.footer').removeClass('show');
				};*/

			}


		}

	};

	var tlHello;
	var tlPreambule;
	var preambuleText;
	var preambuleLines;
	var tlVision;
	var tlCreativity;
	var tlHomeIdeas;
	initHome = function(){

		console.log('Home Page initialised');
		$('body').addClass('showHello');

		///ANIMATIONS PREAMBULE
		tlHello = new TimelineLite({ paused: true});
		tlHello.staggerFrom($("#hello_h > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, 0.8);
		tlHello.staggerFrom($("#hello_e > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "-=0.7");
		tlHello.staggerFrom($("#hello_l1 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1.2");
		tlHello.staggerFrom($("#hello_l2 > *"), 0.6, {drawSVG:"0%", ease:Power3.easeOut},  0.4, "-=1");
		tlHello.staggerFrom($("#hello_o > *"), 1.2, {drawSVG:"0%", ease:Power3.easeOut},  0.2, "-=1.2");
		tlHello.staggerFrom($("#hello_dot > *"), 0.6, {scale:0, transformOrigin:"50% 50%", ease:Power3.easeOut },  0.2, "-=0.8");
		tlHello.staggerFrom($(".hello-scrolldown"), 1.2, {bottom:-50, ease:Power3.easeOut },  0.2, "-=0.8");

		if($browser.name == "Safari" && $browser.version < 10) {
			tlHello.progress(1, false);
		} else {
			tlHello.play().timeScale(1);
		}

		tlPreambule= new TimelineLite({ paused: true});
		preambuleText = new SplitText(".preambule p", {type:"lines"});
		preambuleLines = preambuleText.lines;
		for(var i = 0; i<preambuleLines.length; i++){
		  preambuleLines[i].innerHTML = '<span>'+preambuleLines[i].innerHTML+'</span>';
		}
		tlPreambule.from(".preambule .block-title svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlPreambule.from(".preambule .block-title .mskd", 1, {x:"-20%", opacity:0, ease:Power3.easeOut}, "-=0.60");
		tlPreambule.staggerFrom($(preambuleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.05, "-=1.6");

		var prllxVideoContainer = TweenLite.to(".video-container img", 1, { yPercent: 50, ease: Linear.easeNone, paused: true });

		//ANIMATIONS VISION
		tlVision = new TimelineLite({ paused: true});
		var visionTitleText = new SplitText(".vision h2 .txt", {type:"lines"});
		var visionTitleLines = visionTitleText.lines;
		for(var i = 0; i<visionTitleLines.length; i++){
		  visionTitleLines[i].innerHTML = '<span>'+visionTitleLines[i].innerHTML+'</span>';
		}
		var visionIntroText = new SplitText(".vision .block-content p.intro", {type:"lines"});
		var visionIntroLines = visionIntroText.lines;
		for(var i = 0; i<visionIntroLines.length; i++){
		  visionIntroLines[i].innerHTML = '<span>'+visionIntroLines[i].innerHTML+'</span>';
		}
		tlVision.from(".vision h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlVision.staggerFrom($(visionTitleLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlVision.staggerFrom($(visionIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlVision.from(".vision .block-content p.intro + p", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		tlVision.from(".vision .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=0.8")

		TweenLite.set(".vision .skills-container", {y: '25%'});
		var prllxVisionSills = TweenLite.to(".vision .skills-container", 1, { y: '-25%', ease: Linear.easeNone, paused: true });


		//ANIMATIONS CREATIVITY
		tlCreativity = new TimelineLite({ paused: true});
		var creaTitleText = new SplitText(".creativity h2 .txt", {type:"lines"});
		var creaTitleLines = creaTitleText.lines;
		for(var i = 0; i<creaTitleLines.length; i++){
		  creaTitleLines[i].innerHTML = '<span>'+creaTitleLines[i].innerHTML+'</span>';
		}
		var creaIntroText = new SplitText(".creativity .block-content p.intro", {type:"lines"});
		var creaIntroLines = creaIntroText.lines;
		for(var i = 0; i<creaIntroLines.length; i++){
		  creaIntroLines[i].innerHTML = '<span>'+creaIntroLines[i].innerHTML+'</span>';
		}
		tlCreativity.from(".creativity h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlCreativity.staggerFrom($(creaTitleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlCreativity.staggerFrom($(creaIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlCreativity.from(".creativity .block-content p.intro + p", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		tlCreativity.from(".creativity .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")

		TweenLite.set(".creativity .block-content", {y: '25%'});
		var prllxCreaContent = TweenLite.to(".creativity .block-content", 1, { yPercent: -25, ease: Linear.easeNone, paused: true });
		var prllxVisuelProject = TweenLite.to(".project-container .project-visual img", 1, { yPercent: -50, ease: Linear.easeNone, paused: true });


		//ANIMATIONS IDEAS
		tlHomeIdeas = new TimelineLite({ paused: true});
		var ideasTitleText = new SplitText(".ideas h2 .txt", {type:"lines"});
		var ideasTitleLines = ideasTitleText.lines;
		for(var i = 0; i<ideasTitleLines.length; i++){
		  ideasTitleLines[i].innerHTML = '<span>'+ideasTitleLines[i].innerHTML+'</span>';
		}
		var ideasIntroText = new SplitText(".ideas .block-content p.intro", {type:"lines"});
		var ideasIntroLines = ideasIntroText.lines;
		for(var i = 0; i<ideasIntroLines.length; i++){
		  ideasIntroLines[i].innerHTML = '<span>'+ideasIntroLines[i].innerHTML+'</span>';
		}
		tlHomeIdeas.from(".ideas h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5)
		tlHomeIdeas.staggerFrom($(ideasTitleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlHomeIdeas.staggerFrom($(ideasIntroLines).find('> span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlHomeIdeas.staggerFrom(".ideas .block-content p.intro ~ p", 0.8, {y:60, opacity:0, ease:Power3.easeOut},  0.08, "-=1")
		tlHomeIdeas.from(".ideas .block-content a", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1")
		var prllxIdeasVisuel = TweenLite.to(".ideas .visuel-container img", 1, { yPercent: -50, ease: Linear.easeNone, paused: true });

		$('.animated').viewportChecker({
	  	  	repeat:false,
	  	  	offset:-100,
	  	  	callbackFunction: function(elem, action){

		  	  	if (elem.is('.vision')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlVision.play().timeScale(1);
					}
				}

				if (elem.is('.creativity')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlCreativity.play().timeScale(1);
					}
				}

				if (elem.is('.ideas')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlHomeIdeas.play().timeScale(1);
					}
				}

	  	  	}
  	  	});

		TweenLite.ticker.addEventListener("tick", onScroll);
		function onScroll() {

			if(!$('body').hasClass('page-home')) return;

			scrollAmount = $(window).scrollTop();

			//ANIMATION PREAMBULE
			if (scrollAmount > 10 && $('body').hasClass('showHello')) {
				$('body').removeClass('showHello');
				tlPreambule.play().timeScale(1);
			} else if (scrollAmount <= 10 && !$('body').hasClass('showHello')){
				$('body').addClass('showHello');
				tlPreambule.reverse().timeScale(2);
			}

			if ( !$('body').hasClass('page-home') || wW < 768  ) {
				return;
			};

			//PRLLX PREAMBULE

			if (scrollAmount < $('.preambule').outerHeight() + wH) {
				$('.hello, .preambule').show();
			} else {
				$('.hello, .preambule').hide();
			}

			if (scrollAmount > $('.preambule').outerHeight() && scrollAmount < $('.preambule').outerHeight() + wH ) {

				TweenLite.to($('.hello'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 0.6 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y:  -  ( scrollAmount - $('.preambule').outerHeight() ) * 0.4 , ease: Linear.easeNone });
			} else {

				TweenLite.to($('.hello'), 0, { y: 0 , ease: Linear.easeNone });
				TweenLite.to($('.preambule'), 0, { y: 0 , ease: Linear.easeNone });
			}

			//PRLLX VIDEOCONTAINER
			var minVideo = $(".video-container").offset().top;
			var maxVideo = $(".video-container").offset().top + $(".video-container").outerHeight();
			var normVideo = clamp(normalize(window.pageYOffset, minVideo, maxVideo), 0, 1);
			prllxVideoContainer.progress(normVideo);

			//PRLLX SKILLS
			var minSkills = $(".vision .skills-container").offset().top - wH;
			var maxSkills= $(".vision .skills-container").offset().top + $(".vision .skills-container").outerHeight();
			var normSkills = clamp(normalize(window.pageYOffset, minSkills, maxSkills), 0, 1);
			prllxVisionSills.progress(normSkills);

			//PRLLX CREA CONTENT
			var minCrea = $(".creativity .block-content").offset().top - wH;
			var maxCrea= $(".creativity .block-content").offset().top + $(".creativity .block-content").outerHeight();
			var normCrea = clamp(normalize(window.pageYOffset, minCrea, maxCrea), 0, 1);
			prllxCreaContent.progress(normCrea);

			var minProject = $(".project-container .project-visual").offset().top - wH;
			var maxProject= $(".project-container .project-visual").offset().top + $(".project-container .project-visual").outerHeight();
			var normProject = clamp(normalize(window.pageYOffset, minProject, maxProject), 0, 1);
			prllxVisuelProject.progress(normProject);

			//PRLLX IDEAS VISUEL
			var minIdeas = $(".ideas .visuel-container").offset().top - wH;
			var maxIdeas = $(".ideas .visuel-container").offset().top + $(".ideas .visuel-container").outerHeight();
			var normIdeas = clamp(normalize(window.pageYOffset, minIdeas, maxIdeas), 0, 1);
			prllxIdeasVisuel.progress(normIdeas);

		}

	};

	var tlProjects;
	initProjects = function(){

		console.log('Projects Page initialised');

		$('.list-projects .project-item').on('mouseenter touchstart', function(){
			var descHeight = $(this).find('.project-intro').outerHeight();
			TweenLite.set($(this).find('.inner'), {y : -descHeight });
		})

		$('.list-projects .project-item').on('mouseleave', function(){
			TweenLite.set($(this).find('.inner'), {y : 0 });
		})

		$('.list-projects .project-item a').on('click', function(e){

			e.preventDefault();
			itemColor = $(this).data("color");
			TweenLite.set($('.loader .color'), {"background-color":itemColor});

		});

		$('.animated').viewportChecker({
	  	  	repeat:false,
	  	  	offset:"-15%",
  	  	});

		//ANIMATIONS INTRO
		tlProjects= new TimelineLite({ paused: true});
		var projetcsIntroTxt = new SplitText("section.intro p.intro", {type:"lines"});
		var projetcsIntroLines = projetcsIntroTxt.lines;
		for(var i = 0; i<projetcsIntroLines.length; i++){
		  projetcsIntroLines[i].innerHTML = '<span>'+projetcsIntroLines[i].innerHTML+'</span>';
		}
		tlProjects.from("section.intro h1 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlProjects.staggerFrom($('section.intro h1 .msk').find('span'), 0.8, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlProjects.staggerFrom($(projetcsIntroLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, "-=1");
		tlProjects.from("section.intro .intro + p", 0.8, {y:60, opacity:0, ease:Power3.easeOut}, "-=1");
		tlProjects.staggerFrom(".list-projects > *", 1.2, {y:"50%", ease:Power3.easeOut},0.1, "-=0.8");

		tlProjects.play().timeScale(1);

	};

	var tlProject;
	initProject = function(){

		console.log('Single Project');

  	tlProject= new TimelineLite({ paused: true});
  	var projetcIntroTitle = new SplitText(".project-intro h1", {type:"lines"});
		var projetcIntroTitleLines = projetcIntroTitle.lines;
		for(var i = 0; i<projetcIntroTitleLines.length; i++){
		  projetcIntroTitleLines[i].innerHTML = '<span>'+projetcIntroTitleLines[i].innerHTML+'</span>';
		}
		var projetcIntroTxt = new SplitText(".project-intro .project-baseline", {type:"lines"});
		var projetcIntroLines = projetcIntroTxt.lines;
		for(var i = 0; i<projetcIntroLines.length; i++){
		  projetcIntroLines[i].innerHTML = '<span>'+projetcIntroLines[i].innerHTML+'</span>';
		}

		tlProject.from($('.project-type span'), 1.2, {y:"100%", ease: Power3.easeInOut}, 0);
		tlProject.staggerFrom($(projetcIntroTitleLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, 0.1);
		tlProject.staggerFrom($(projetcIntroLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, 0.2);
		tlProject.staggerFrom($('.project-intro .row > * > *'), 1.2, {y:20, opacity:0, ease: Power3.easeInOut},  0.05, 0.8);

  	  	$('.animated').viewportChecker({
	  	  	repeat:false,
	  	  	offset:"-15%",
  	  	});

  	  	if(!$('body').hasClass('hideNav')) {
	  	  	$('body').addClass('hideNav');
	  	}

		$('.project').removeClass('waiting').delay(600).queue(function(){
			tlProject.play().timeScale(1);
			$(this).dequeue();
		});

		setTimeout(function () { $('video').not('.plyr').get(0).play(); }, 1000);
		plyr.setup(document.querySelectorAll('.plyr'));

		if($('.block--slider').length > 0) {

			$(".swiper-container").each(function(index, element){
			    var $this = $(this);
			    var swiper = new Swiper(this, {
				    direction: 'horizontal',
					speed:800,
					watchSlidesVisibility:true,
					preloadImages: false,
					lazy: {
						loadPrevNext: true,
						loadPrevNextAmount:2
					},
					navigation: {
					    nextEl: $this.find(".swiper-button-next")[0],
					    prevEl: $this.find(".swiper-button-prev")[0],
					}
				})

			});

		}

		var TLPrllxs = [];
		var prllxs = $(".project").find('*[data-prllx]');
		$.each( prllxs, function( index, item ) {
			  var prllxTL = new TimelineMax({ paused: true});
			  TweenMax.set(item, { y: -1 * item.dataset.prllx });
	  	      prllxTL.to(item, 1, { y:item.dataset.prllx, ease:Power0.easeNone });
			  TLPrllxs.push(prllxTL);
		});

		function onScroll() {

			if (!$('body').hasClass('showProject'))	return;

			$.each( prllxs, function( index, item ) {
		      var norm = clamp(normalize(scrollTop,  $(item).offset().top - window.innerHeight ,  $(item).offset().top + $(item).outerHeight(true) ), 0, 1);
			  TLPrllxs[index].progress(norm);
		    });


			    if (scrollTop > $('.project-visuel').offset().top + $('.project-visuel').outerHeight() - $('.navbar-brand').position().top - $('.navbar-brand').outerHeight() && !$('.navbar-brand').hasClass('dark')) {
				    $('.navbar-brand').addClass('dark');
				    $('.close-project').addClass('dark');
			    } else if (scrollTop < $('.project-visuel').offset().top + $('.project-visuel').outerHeight() - $('.navbar-brand').position().top - $('.navbar-brand').outerHeight() && $('.navbar-brand').hasClass('dark')) {
				    $('.navbar-brand').removeClass('dark');
				    $('.close-project').removeClass('dark');
			    }

				if ($('.project-awards').length > 0) {

					if (scrollTop > $('.project-visuel').offset().top + $('.project-visuel').outerHeight() - window.innerHeight + 40 && scrollTop < $('.project-awards').offset().top - window.innerHeight + 40) {
					    $('.scrolldown').addClass('dark');
					    $('.scrolltop').addClass('dark');
				    } else {
					    $('.scrolldown').removeClass('dark');
					    $('.scrolltop').removeClass('dark');
				    }


				} else {

					if (scrollTop > $('.project-visuel').offset().top + $('.project-visuel').outerHeight() - window.innerHeight + 40) {
					    $('.scrolldown').addClass('dark');
					    $('.scrolltop').addClass('dark');
				    } else {
					    $('.scrolldown').removeClass('dark');
					    $('.scrolltop').removeClass('dark');
				    }


				}


		}

		TweenLite.ticker.addEventListener("tick", onScroll);

	};

	var tlIdeas;
	var tlPres;
	var tlRefs;
	var tlContact;
	initIdeas = function(){

		console.log('Ideas Page initialised');

		tlIdeas= new TimelineLite({ paused: true});
		var introIntroTxt = new SplitText(".intro p.intro", {type:"lines"});
		var introIntroTxtLines = introIntroTxt.lines;
		for(var i = 0; i<introIntroTxtLines.length; i++){
		  introIntroTxtLines[i].innerHTML = '<span>'+introIntroTxtLines[i].innerHTML+'</span>';
		}

		tlIdeas.from(".intro h1 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlIdeas.staggerFrom($('.intro h1 .msk').find('span'), 0.8, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlIdeas.staggerFrom($(introIntroTxtLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, "-=1");
		tlIdeas.staggerFrom(".intro p:not(.intro)", 1.2, {y:150, opacity:0, ease: Power3.easeOut},  0.1, "-=1");
		tlIdeas.staggerFrom(".intro a", 1.2, {y:150, opacity:0, ease: Power3.easeOut},  0.1, "-=1");

		tlPres = new TimelineLite({ paused: true});
		var presIntroTxt = new SplitText(".presentation h2", {type:"lines"});
		var presIntroTxtLines = presIntroTxt.lines;
		for(var i = 0; i<presIntroTxtLines.length; i++){
		  presIntroTxtLines[i].innerHTML = '<span>'+presIntroTxtLines[i].innerHTML+'</span>';
		}
		tlPres.staggerFrom($(presIntroTxtLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1);
		tlPres.staggerFrom(".presentation .row .col-lg-4", 1.2, {y:150, opacity:0, ease: Power3.easeOut},  0.1, "-=1");

		tlRefs = new TimelineLite({ paused: true});
		var refsTitleTxt = new SplitText(".refs h2 .txt", {type:"lines"});
		var refsTitleTxtLines = refsTitleTxt.lines;
		for(var i = 0; i<refsTitleTxtLines.length; i++){
		  refsTitleTxtLines[i].innerHTML = '<span>'+refsTitleTxtLines[i].innerHTML+'</span>';
		}
		tlRefs.from(".refs h2 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlRefs.staggerFrom($(refsTitleTxtLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, "-=1");
		tlRefs.staggerFrom(".list-refs .list-item", 1.2, {y:50, ease: Power3.easeOut},  0.1, "-=1");
		tlRefs.staggerFrom(".list-refs .list-item img", 2, {opacity:0, ease: Power3.easeOut},  0.1, "-=1");

		tlContact = new TimelineLite({ paused: true});
		var contactTitleTxt = new SplitText(".contact-ideas h2 .txt", {type:"lines"});
		var contactTitleTxtLines = contactTitleTxt.lines;
		for(var i = 0; i<contactTitleTxtLines.length; i++){
		  contactTitleTxtLines[i].innerHTML = '<span>'+contactTitleTxtLines[i].innerHTML+'</span>';
		}
		var contactIntroTxt = new SplitText(".contact-ideas p.intro", {type:"lines"});
		var contactIntroTxtLines = contactIntroTxt.lines;
		for(var i = 0; i<contactIntroTxtLines.length; i++){
		  contactIntroTxtLines[i].innerHTML = '<span>'+contactIntroTxtLines[i].innerHTML+'</span>';
		}

		tlContact.staggerFrom($(contactTitleTxtLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1);
		tlContact.staggerFrom($(contactIntroTxtLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, "-=1");
		tlContact.staggerFrom(".contact-ideas p:not(.intro)", 1.2, {y:150, opacity:0, ease: Power3.easeOut},  0.1, "-=1");
		tlContact.staggerFrom(".contact-ideas a", 1.2, {y:150, opacity:0, ease: Power3.easeOut},  0.1, "-=1");


		$('.animated').viewportChecker({
			repeat:false,
			offset:"5%",
			callbackFunction: function(elem, action){

				if (elem.is('.intro')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlIdeas.play().timeScale(1);
					}

					if( !elem.hasClass('visible') && action == "remove" && elem.hasClass('animating')) {
						elem.removeClass('animating');
						tlIdeas.pause(0);
					}
				}

				if (elem.is('.presentation')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlPres.play().timeScale(1);
					}

					if( !elem.hasClass('visible') && action == "remove" && elem.hasClass('animating')) {
						elem.removeClass('animating');
						tlPres.pause(0);
					}
				}

				if (elem.is('.refs')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlRefs.play().timeScale(1);
					}

					if( !elem.hasClass('visible') && action == "remove" && elem.hasClass('animating')) {
						elem.removeClass('animating');
						tlRefs.pause(0);
					}
				}

				if (elem.is('.contact-ideas')) {
					if( elem.hasClass('visible') && action == "add" && !elem.hasClass('animating') ) {
						elem.addClass('animating');
						tlContact.play().timeScale(1);
					}

					if( !elem.hasClass('visible') && action == "remove" && elem.hasClass('animating')) {
						elem.removeClass('animating');
						tlContact.pause(0);
					}
				}

			}
		})

		TweenLite.set(".visuel-full img", {y: '-25%'});
		var prllxIdeasVisuel = TweenLite.to(".visuel-full img", 1, { yPercent: 25, ease: Linear.easeNone, paused: true });

		TweenLite.ticker.addEventListener("tick", onScroll);
		function onScroll() {

			if ( !$('body').hasClass('page-ideas')) return;

			//PRLLX IDEAS VISUEL
			var min = $(".visuel-full").offset().top - wH;
			var max = $(".visuel-full").offset().top + $(".visuel-full").outerHeight();
			var norm = clamp(normalize(window.pageYOffset, min, max), 0, 1);
			prllxIdeasVisuel.progress(norm);

		}


		tlIdeas.play().timeScale(1);
		$('.intro').delay(600).queue(function(){
	  	  	$(this).addClass('visible').dequeue();
	  	})

	};

	var tlViens;
	initRecrutement = function(){

		console.log('Creers Page initialised');

		tlViens= new TimelineLite({ paused: true});
		tlViens.from(".intro h1 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlViens.staggerFrom($('.intro h1 .msk').find('span'), 0.8, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");

		$('a.offer-link').on('click', function(e){

			e.preventDefault();
			var annonceURL = $(this).attr('href');
			$(this).addClass('disabled');

			$.ajax({ type: "GET",
			    url: annonceURL,
			    async: false,
			    success : function(data)
			    {
				    var annonceData = $(data).filter('#singleAnnonce');
				    console.log(annonceData);
					$('body').addClass('hideNav loadPopup');
				    $('.popup .ajax-content').append(annonceData).delay(10).queue(function(){
				   		$('body').addClass('openPopup');
						initAnnonce();
						$(this).dequeue();
					});

				}
			});

		});
		$('.popup > .btn-close').on('click', function(e){
			e.preventDefault();

			var pageData  = $( document ).find('main.project');

			var targetURL   = $( '.page-careers .popup' ).data( 'href' );
		    var new_title = $( '.page-careers .popup' ).data( 'wp-title' );
			history.pushState({page:targetURL}, null, targetURL);

			$('.offer-link.disabled').removeClass('disabled');
			$('body').removeClass('hideNav loadPopup openPopup').delay(600).queue(function(){
				$('.popup .ajax-content .annonce').remove();
				$(this).dequeue();
			})
		})

  	  	tlViens.play().timeScale(1);
  	  	$('.intro').delay(1200).queue(function(){
	  	  	tlViens.play().timeScale(2);
		  	$('.animated').viewportChecker({
		  	  	repeat:false,
	  	  	});
	  	})

	};

	initAnnonce = function () {

		if ( $( '.annonce' ).length == 0 ) { return; }

		console.log('annonce');

		$( document ).find( '.popup' ).attr( 'data-href', window.location.href );

		autosize($('textarea'));

		var pageData   = $( document ).find('article.annonce');
	    var targetURL    = pageData.data( 'href' );
	    var new_title  = pageData.data( 'wp-title' );
		history.pushState({page:targetURL}, null, targetURL);

		$( '#form-recruitment-candidate' ).parsley();

		$( 'input[type="file"]').on( 'change', function( myfile ){
			var filename      = $( this )[ 0 ].files[ 0 ].name;
			var input_element = $( this ).parent().find( '.file-name' );

			if( filename.length > 20 ){
				filename = filename.substring( 0, 20 ) + '...';
			}

			$(this).parent().addClass('filled');
			input_element.html( filename );

		})

		$( '.custom-file .cross').on( 'click', function(e){
			e.preventDefault();
			var input_custom = $(this).parent().parent().parent();
			var index = input_custom.index();
			var input = input_custom.find( '.custom-file-input' );
			var input_file = input_custom.find( '.file-name' );
			input.val('');
			$(this).parent().parent().parent().removeClass('filled');
			input_file.html('Pièce Jointe '+ (index+1));
		});

		$( '#form-recruitment-candidate' ).submit( function( e ){
			e.preventDefault();
			$("body").css("cursor", "wait");
            $(".messages").hide();

            var form = $(this)
			form.parsley('reset');
			var ajax_url = $( '#form-recruitment-candidate' ).data( 'ajax-url' );

			$.ajax({
	            url: ajax_url,
	            type: 'POST',
    			processData: false,
                data: new FormData( this ),
                processData: false,
                contentType: false,
	            success: function( data ) {
                    $("fieldset").slideUp();
					$(".messages.success").show()
                    $("body").css("cursor", "default");
	            },
	            error: function( data ) {
	            	var decoded = JSON.parse(data.responseText);
                    if (decoded.input != ""){
						var input = $("[name="+decoded.input+"]").parsley();
                        window.ParsleyUI.addError(input, "Form Error", decoded.error);
					} else {
                        $(".messages.error p").html(decoded.error);
                        $(".messages.error").show();
					}
                    $("body").css("cursor", "default");
                },
	        });
		});

	}

	var tlPhilo;
	var tlBlock;
	initPhilo = function () {

		console.log('Philo Page initialised');

		//ANIMATIONS INTRO
		tlPhilo = new TimelineLite({ paused: true});
		var philoIntroTxt = new SplitText("section.intro p.intro", {type:"lines"});
		var philoIntroLines = philoIntroTxt.lines;
		for(var i = 0; i<philoIntroLines.length; i++){
		  philoIntroLines[i].innerHTML = '<span>'+philoIntroLines[i].innerHTML+'</span>';
		}
		tlPhilo.from("section.intro h1 svg > *", 0.8, {drawSVG:"0%", ease:Power3.easeOut}, 0.5);
		tlPhilo.staggerFrom($('section.intro h1 .msk').find('span'), 0.8, {y:"100%", ease: Power3.easeInOut},  0.08, "-=1");
		tlPhilo.from("section.intro .page-content small", 0.8, {y:60, opacity:0, ease:Power3.easeOut});
		tlPhilo.staggerFrom($(philoIntroLines).find('span'), 1.2, {y:"100%", ease: Power3.easeInOut},  0.1, "-=1");
		tlPhilo.play().timeScale(1);

		var animationPrllx = [];
		$('.prllx').each(function(index){
			TweenLite.set($(this), {y: '25%'});
			animationPrllx[index] = TweenLite.to($(this), 1, { yPercent: -25, ease: Linear.easeNone, paused: true });
		})

		var animationPageColor = TweenLite.to('.page-color', 1, { xPercent: 25, ease: Linear.easeNone, paused: true });
		var animationIntroTxt = TweenLite.to('.intro .page-content', 1, { xPercent: 25, ease: Linear.easeNone, paused: true });

		var animationBlockWKN = TweenLite.from('.lien-fort .section-visuel img.brique-wokine', 0.8, {y:-250, ease: Linear.easeNone, paused: true });

		TweenLite.ticker.addEventListener("tick", onScroll);
		function onScroll() {

			if ( !$('body').hasClass('page-philo') || wW < 768 ) {return;};

			$('.prllx').each(function(index) {

				var elm = $(this);
			    var minPRLLX = elm.offset().top - wH;
				var maxPRLLX = elm.offset().top + elm.outerHeight();
				var normPRLLX = clamp(normalize(window.pageYOffset, minPRLLX, maxPRLLX), 0, 1);
				animationPrllx[index].progress(normPRLLX);

		    });

		    var minPAGECOLOR = $('.page-color').offset().top;
			var maxPAGECOLOR= $('.page-color').offset().top + $('.page-color').outerHeight();
			var normPAGECOLOR = clamp(normalize(window.pageYOffset, minPAGECOLOR, maxPAGECOLOR), 0, 1);
			animationPageColor.progress(normPAGECOLOR);
			animationIntroTxt.progress(normPAGECOLOR);

			var minBLOCK = $('.lien-fort').offset().top - $('.lien-fort').outerHeight() * 0.5;
			var maxBLOCK= $('.lien-fort').offset().top + $('.lien-fort').outerHeight() * 0.5;
			var normBLOCK = clamp(normalize(window.pageYOffset, minBLOCK, maxBLOCK), 0, 1);
		    animationBlockWKN.progress(normBLOCK)

		}

	}

	build = function(){

		TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.1});

		var targetURL = $('main.page').data( 'href' );
		history.pushState({page:targetURL}, null, targetURL);

		$browser = checkNavigateur();

		FastClick.attach(document.body);

		$(window).on('resize',function(){
			wW = $(window).width();
			wH = $(window).height();
			footerHeight = footer.outerHeight();
			$('.page-container').css({marginBottom:footerHeight});
			calculBorderSize();
		});
		$(window).trigger('resize');

		initHeaderFooter();
		initAnnonce ();

        currentPage = $('main');
		var targetPageClass = currentPage.data('class');
		currentProjectColor = currentPage.data('color');
		if (currentProjectColor) {
			console.log('projetColor', currentProjectColor);
			TweenLite.set($('.loader .color'), {"background-color":currentProjectColor});
		}
		$('body').addClass(targetPageClass).delay(800).queue(function(){

			TweenLite.set(window, {scrollTo: {y: 0, autoKill:false}, delay:0.3});
			$(window).trigger('resize');
			initPage(targetPageClass);

			$(this).removeClass('loading').delay(800).queue(function(){
				$(this).addClass('loaded');
				$(this).dequeue();
			}).dequeue();

		});

		currentPageClass = targetPageClass;

		$(window).on('popstate', function(event) {
			var state = event.originalEvent.state;
			if (state) {
				loadPage(location.href);
				TweenLite.to(window, 0.3, {scrollTo: {y: 0}, ease: Power3.easeInOut});
			}
		});


		console.log("%cCreated by Wokine","color: #000; padding: 5px 0px;"),console.log("%chttps://wokine.com","color:#ccc");

	}
	build();

	function loadPage(url) {

		$('body').removeClass('loaded loadProject showProject hideNav').addClass('loading').delay(transitionPageDelay).queue(function(){

			$.ajax({ type: "GET",
			    url: url,
			    success : function(data)
			    {

				    var pageData  = $(data).find('main.page');
				    var new_title = pageData.data( 'wp-title' );
					var targetPageClass = pageData.data('class');
					document.title = "Wokine. "+new_title;

				    /*var new_url   = pageData.data( 'href' );
				    history.pushState( { page: targetPageClass }, null, new_url );*/
					//

				    //deleteLastPage;
					$('.page-container > * ').remove();

					var prev = brandPage.find('span');
					if (prev){
						TweenLite.to(prev, 0.6, { y: -10, opacity:0, ease: Power3.easeInOut, onComplete:function(){ prev.remove(); }});
					}

				    //Add NewPage
			        $('.page-container').prepend(pageData);
					currentPage = $('main');

					console.log(targetPageClass);

					if (currentProjectColor && targetPageClass != "page-projects") {
						TweenLite.set($('.loader .color'), {"background-color":""});
					}

					currentProjectColor = currentPage.data('color');
					if (currentProjectColor) {
						TweenLite.set($('.loader .color'), {"background-color":currentProjectColor});
					}

					TweenLite.set(window, {scrollTo: {y: 0}, delay:0.1});

					//PageTransition
					$('body').removeClass(currentPageClass)
					.addClass(targetPageClass)
					.delay(800).queue(function(){
						$(this).removeClass('loading').delay(800).queue(function(){
							$(this).addClass('loaded');

							if (targetPageClass == "page-projects") {
								TweenLite.set($('.loader .color'), {"background-color":""});
							}

							$(this).dequeue();
						});

						initPage(targetPageClass);
						$(this).dequeue();
					});

					currentPageClass = targetPageClass;

			    }
			});

			$(this).dequeue();

		});

	}
	function initPage(pageClass){

		$('.page-container').css({marginBottom:footerHeight});

		if (currentPage.data('page')) {
			var newPageTitle = "<span>"+currentPage.data('page')+"</span>";
			brandPage.append(newPageTitle);
			var current = brandPage.find('span');
			TweenLite.set(current, { y: 10, opacity:0, ease: Power3.easeInOut });
			TweenLite.to(current, 0.6, { y: 0, opacity:1, ease: Power3.easeInOut });
		}

		$('.menu-nav .active').removeClass('active');
		$('.menu-nav li a.'+pageClass+'-link').addClass('active');

		//setupLinksAjax;
		$('main.page a').on('click', function(e){

			if (!$(this).attr('href')) return;

			var rel = $(this).prop('rel');
			if (rel == "external") {
				return;
			}

			if ( $(this).hasClass('offer-link') || $(this).hasClass('btn-close')  || $(this).hasClass('link-project')) {
				return;
			}

			if ($('body').hasClass('openPopup')) {
				$('.popup .btn-close').trigger('click');
			}

			e.preventDefault();
			var target = $(this);
			var targetURL = target.attr('href');

			loadPage(targetURL);
			history.pushState({page:targetURL}, null, targetURL);

		})

		if($('body').hasClass('first')) {
			$('body').delay(250).queue(function(){
				$(this).removeClass('first').dequeue();
			});
		}

		//initCurrentPage;
		switch(pageClass) {
			case 'page-home':
		        initHome();
		        break;
		    case 'page-projects':
		        initProjects();
		        break;
		    case 'single-project':
			    $('body').addClass('showProject');
		        initProject();
		        break;
		    case 'page-careers':
		        initRecrutement();
		        break;
		    case 'page-ideas':
		    	initIdeas();
		        break;
		    case 'page-philo':
		        initPhilo();
		        break;
			case 'single-annonce':
		        initAnnonce();
		        break;
		    default:
		        return;
		}


	}

	function normalize(value, min, max) {
		return (value - min) / (max - min);
	}
	function clamp(value, min, max) {
		return value < min ? min : (value > max ? max : value);
	}
	function calculBorderSize() {

		switch (true) {
	    case (wW >= 1600) :
	        borderWidth =  60;
	    break;
	    case (992 >= 4 && wW < 1600) :
	        borderWidth = 40;
	    break;
	        borderWidth = 20;
	  	}

	};
	function checkNavigateur() {

		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion);
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
			browserName = "Opera";
			fullVersion = nAgt.substring(verOffset+6);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
			browserName = "Microsoft Internet Explorer";
			fullVersion = nAgt.substring(verOffset+5);
		}
		// In Chrome, the true version is after "Chrome"
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
			browserName = "Chrome";
			fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version"
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
			browserName = "Safari";
			fullVersion = nAgt.substring(verOffset+7);
			if ((verOffset=nAgt.indexOf("Version"))!=-1)
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox"
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
			browserName = "Firefox";
			fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
		          (verOffset=nAgt.lastIndexOf('/')) )
		{
			browserName = nAgt.substring(nameOffset,verOffset);
			fullVersion = nAgt.substring(verOffset+1);
		 if (browserName.toLowerCase()==browserName.toUpperCase()) {
		  browserName = navigator.appName;
		 }
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		   fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
		   fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);

		if (isNaN(majorVersion)) {
			fullVersion  = ''+parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion,10);
		}

		return {name : browserName, version : majorVersion};

	}

})
