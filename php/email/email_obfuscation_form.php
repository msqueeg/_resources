<?php 
$email_add = $_GET["email"];

?>
<script type="text/javascript" src="/_resources/js/jquery.form.js"></script>
<h2>Email Contact Form</h2>
<div id="form_holder">
<h3>Please Fill out the Form Below to send your email.</h3><br>
<form id="obfuscation_form" action="/_resources/php/email/email_obfuscation_form_submit.php">
	<input type="hidden" name="form_submit" value="1">
	<input type="hidden" name="nt" value="1">
	<input type="hidden" name="email_id" value="<?php echo $email_add; ?>">
	<table border="0" cellspacing="0" cellpadding="5" id="form_table">
		<tr>
			<td class='form_label'>
				Name:
			</td>
			<td>
				<input type="text" id="name" name="name" class='required_field' value="">
			</td>
		</tr>
		<tr>
			<td class='form_label' nowrap>
				Email Address:
			</td>
			<td>
				<input type="text" id="email" name="email" class='required_field' value="" >
			</td>
		</tr>	
		<tr>
			<td class='form_label' valign="top">
				Message: 
			</td>
			<td>
				<textarea name="message" style="width:300px;height:100px;"></textarea>
			</td>
		</tr>
		<tr>
			<td colspan="2" style="text-align:center;">
				<div id="submit_holder">
					<input type="submit" value="Submit Form" class="question_submit">
				</div>
			</td>
		</tr>
	</table>
	<br />
</form>
</div>

<script language="javascript">
	$().ready(function(){
		
		submit_line = $("#submit_holder").html();
		
		$("#obfuscation_form").submit(function(){
			$(this).ajaxSubmit({
				beforeSubmit: function(){
					$("#submit_holder").html('Submitting... <img src="/_resources/icons/loader.gif">');
					
					required_fields = $(".required_field");
					
					for ( i=0; i<required_fields.length; i++ )
					{
						if ( $(required_fields[i]).val() == '' )
						{
							alert("All fields are required");
							$("#submit_holder").html(submit_line);
							return false;
						}
					}					
				},
				success: function(data) {
				      $("#form_holder").html('<strong>Your Message has been sent.<br><br>We will get back with you soon.</strong><br />');
			    }
		     })
			return false;
		})
	})
</script>
<style type="text/css">
	#form_table{width:400px;}
	#form_table td{padding:5px;}
	.form_label{
		font-weight: bold;
		text-align: right;
	}
	
	#submit_holder{
		text-align:center;
	}
	
	h2 {
	font-weight: bold;
	color: black;
	font-size: 116.66%;
	}
	
	input, textarea{
		border:1px solid #7F7F7F;
		font-size:16px;
		padding:3px;
	}
	
</style>