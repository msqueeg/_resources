/*******************************************************************************

	CSS on Sails Framework
	Title: Malone University
	Author: XHTMLized (http://www.xhtmlized.com/)
	Date: April 2011

*******************************************************************************/

var Malone_JS = {
	
	init: function() {
		this.initPlaceholders();
		this.initDropdownNavigation();
		this.initScrollables();
		this.initSpotlight();
		this.initCurrentPage();
		this.initCurrentSection();
		this.initEmailObfuscation();
	},
	
	initPlaceholders: function() {
		$("input[type=text].placeholder").each(function() {
			var id = $(this).attr('id');
			var $label = $("label[for="+id+"]");
			if ($label) {				
				$(this).addClass("placeholder-applied");
				$(this).val($label.text());
				$(this).focus(function() {
					if ($(this).val() == $label.text()) {
						$(this).val("");
					}
				})
				$(this).blur(function() {
					if ($(this).val() == "") {
						$(this).val($label.text());
					}
				})
			}
			
		})
	},
	
	initDropdownNavigation: function() {
	
		$("#navigation > ul > li").hover(function () {			
			$dropdown = $(this).find(".dropdown-navigation");
			pos = $(this).position();
			$dropdown.find("div").css("margin-left", pos.left + "px");
			$dropdown.fadeIn(100);
		}, function() {
			$dropdown.fadeOut(100);
		});
	
	},
	
	initScrollables: function() {
		
		// Initialize sidebar banner rotator
		$("#promotions .scrollable").scrollable({circular: true});
		//modified mrm - removed autoscroll
		
		// Initialize home page hero rotator
		if ($("#hero").size() > 0) {
			var page_height = $(document).height() - 250;
			var n = $("#hero").find(".items li").size();
			var content_height = n * 202;
			while (content_height < page_height / 2) {
				$("#hero").find(".items li").each(function() {
					$(this).clone().appendTo("#hero ul.items");
				});
				content_height *= 2;
			}
			
			$("#hero").css("height", (page_height + 404) + "px");
			$("#hero").scrollable({
				circular: true,
				vertical: true
			}).autoscroll({ interval: 10000 });			
			
			$("#hero ul.items li:gt(1)").each(function() {
				$(this).clone().appendTo("#hero ul").addClass("cloned");
			})
			
			// Hack to make the strip behave
			$("#hero").css("margin-top", "-404px");			
			$("#hero ul").css("top", "-202px");
			
			// When everything is ready, show the rotator
			$("#hero").fadeIn("fast");
			 
		}
		
		// Prevent default action after clicking the link
		$(" #promotions .prev, #promotions .next, #hero-controls a").click(function(e) {
			e.preventDefault();
		})
	},
	
	//mrm added
	initSpotlight: function () {
		var url = $.url();
		$(".student-spotlight").click(function(){
			//alert(url.attr('directory'));
			window.location = url.attr('directory')+"pioneer.php";
			});
		$(".student-spotlight").css('cursor','pointer');
	},
	
	initCurrentPage: function () {
		var url = $.url();
		var path = url.attr('path');
		var directory = url.attr('directory');
		var phpPath = path + ".php";
		var indexPath = url.attr('directory') + "index.php";
		
		if (path) {
			if (path.indexOf('.php') == -1) {
			$('#interior-nav li a[href$="'+indexPath+'"]').parent().addClass('active selected');
			$('#sidebar #audience li a[href$="'+indexPath+'"]').parent().addClass('active selected');
			} else {
			$('#interior-nav li a[href$="'+path+'"]').parent().addClass('active selected');
			$('#sidebar #audience li a[href$="'+path+'"]').parent().addClass('active selected');
			}
		}
		//hide empty submenu divs
		$('ul').not(':has(li)').parent('.submenu').hide()
	},
	
	initCurrentSection: function () {
		var url = $.url();
		var path = url.attr('path');
		var isAbout = /about/i;
		var isAdmissions = /admissions/i;
		var isWhyMalone = /why-malone/i;
		var isAcademics = /academics/i;
		var isStudentLife = /student-life/i;
		var isAlumni = /alumni/i;
		var isNews = /news-and-events/i;
		
		if (isAbout.test(path)) {
			//alert(result);
			$('#nav_about').addClass('active');
		}
		else if (isAdmissions.test(path)){
			//alert(result);
			$('#nav_admission').addClass('active');
		}
		else if (isWhyMalone.test(path)){
			//alert(result);
			$('#nav_why').addClass('active');
		}
		else if (isAcademics.test(path)){
			//alert(result);
			$('#nav_academics').addClass('active');
		}
		else if (isStudentLife.test(path)){
			//alert(result);
			$('#nav_student').addClass('active');
		}
		else if (isAlumni.test(path)){
			//alert(result);
			$('#nav_alumni').addClass('active');
		}
		else if (isNews.test(path)){
			//alert(result);
			$('#nav_news').addClass('active');
		}
		else {
			$('#navigation li').removeClass('active');
		}
	},
	
	initEmailObfuscation: function () {
		$("[class='mail']").each(function(){
			var map = rot13init();
			var htmls = $(this).html();
			var address = htmls.replace(/([a-z0-9._%-]+)\+([a-z0-9._%-]+)\+([a-z.]+)/i, '$1' + '@' + '$2' + '.' + '$3');
			$(this).replaceWith('<a style="text-decoration: none;" href="/_resources/php/email/email_obfuscation_form.php?email='+htmls+'" rel="facebox">'+str_rot13(address,map)+'</a>');
		});
	}
}

function rot13init() {
	var map = new Array();
	var s = "abcdefghijklmnopqrstuvwxyz";
	for (var i = 0 ; i < s.length ; i++)
		map[s.charAt(i)] = s.charAt((i+13)%26);
	for (var i = 0 ; i < s.length ; i++)
		map[s.charAt(i).toUpperCase()] = s.charAt((i+13)%26).toUpperCase();
	return map;
}

function str_rot13(a,map) {
	var s = "";
	for (var i = 0 ; i < a.length ; i++) {
		var b = a.charAt(i);
		s += (b>='A' && b<='Z' || b>='a' && b<='z' ? map[b] : b);
	}
	return s;
}
	
$(document).ready(function() {

	Malone_JS.init();
	
	$('a[rel*=facebox]').facebox() //facebox for email pop-up form
	
	//Track Navigation Links With Analytics on Click
	$('#navigation  a[href^="/"]').live('click', function(e) {
		//Create opt_label
		var aText = $(this).html(); //Link Text
		var aCategory = $(this).closest("#navigation > ul > li").attr("id"); // Link Category
		var opt_label = aCategory + " > " + aText;
		//Create category
		var pageTitle = $("title").html(); //Page title
		var location = window.location;
		var category = location + " > " + pageTitle;
		//Push Event to Analytics
		_gaq.push(['_trackEvent', category, 'main-nav', opt_label]);
	});
	
	$('#secondary-navigation  a').live('click', function(e) {
		//Create opt_label
		var aText = $(this).html(); //Link Text
		var opt_label = aText;
		//Create category
		var pageTitle = $("title").html(); //Page title
		var location = window.location;
		var category = location + " > " + pageTitle;
		//Push Event to Analytics
		_gaq.push(['_trackEvent', category, 'main-nav', opt_label]);
	});

});


