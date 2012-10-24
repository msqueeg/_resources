				$(document).ready(function() {
			 
			 	$("[class='mail']").each(function() {
					var htmls = $(this).html();
					$(this).replaceWith('<a style="text-decoration: none;" href="_resources/php/email/email_obfuscation_form.php?email='+htmls+'" rel="facebox"><img style="border:none;" src="_resources/php/email/image3.php?link='+htmls+'" /></a>');
					
			  	})
				});
