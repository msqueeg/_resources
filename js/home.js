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
		$("#promotions .prev, #promotions .next, #hero-controls a").click(function(e) {
			e.preventDefault();
		})
		
	}

}

$(document).ready(function() {

	Malone_JS.init();

});

// gaAddons FREE v1.0, Copyright 2011, Stephane Hamel - http://gaAddons.com
// Licensed under a Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// gaAddons FREE v1.0, Copyright 2011, Stéphane Hamel - http://gaAddons.com
// gaAddons by Stéphane Hamel is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// This code is provided as is, without guarantee or support.

jQuery(document).ready(function($) {
	// _trackDownloads
	// helper function - allow regex as jQuery selector
    $.expr[':'].regex = function(e, i, m) {
        var mP = m[3].split(','),
            l = /^(data|css):/,
            a = {
                method: mP[0].match(l) ? mP[0].split(':')[0] : 'attr',
                property: mP.shift().replace(l, '')
            },
            r = new RegExp(mP.join('').replace(/^\s+|\s+$/g, ''), 'ig');
        return r.test($(e)[a.method](a.property));
    };

    $('a:regex(href,"\\.(zip|mp\\d+|mpe*g|pdf|docx*|pptx*|xlsx*|jpe*g|png|gif|tiff*)")$').live('click', function(e) {
        _gaq.push(['_trackEvent', 'download', 'click', this.href.replace(/^.*\/\//, '')]);
    });
	
	// _trackOutbound
	$('a[href^="http"]:not([href*="//' + location.host + '"])').live('click', function(e) {
        _gaq.push(['_trackEvent', 'outbound', 'click', this.href.match(/\/\/([^\/]+)/)[1]]);
	});
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
	// hero images
	$('#hero a').live('click', function(e) {
		_gaq.push(['_trackEvent', 'Promos', 'click', this.href]);
	});
	// homepage controls - next
	$('#hero-controls a.next').live('click', function(e) {
		_gaq.push(['_trackEvent', 'hero-controls', 'control', 'next']);
	});
	// homepage controls - previous
	$('#hero-controls a.prev').live('click', function(e) {
		_gaq.push(['_trackEvent', 'hero-controls', 'control', 'prev']);
	});
	// banner controls - previous
	$('#promotions a.prev').live('click', function(e) {
		_gaq.push(['_trackEvent', 'banner-controls', 'control', 'next']);
	});
	// banner controls - next
	$('#promotions a.next').live('click', function(e) {
		_gaq.push(['_trackEvent', 'banner-controls', 'control', 'prev']);
	});
	// banners
	$('li[class*=banner] a').live('click', function(e) {
		_gaq.push(['_trackEvent', 'Banners', 'click', this.href]);
	});
});

// _trackError: track 404 - Page not found
if (document.title.search(/Page Not Found/i) !== -1) {
    _gaq.push(['_trackPageview', '/vpv/404/' + location.host + location.pathname + '?from=' + document.referrer]);
}

