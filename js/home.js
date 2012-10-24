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


