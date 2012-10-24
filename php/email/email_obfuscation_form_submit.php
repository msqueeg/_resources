<?php
if($_REQUEST['email'] != '')
$geoEmail = str_rot13($_GET["email_id"]);
list($geoAddress, $geoDomain, $geoTld) = explode( " ", $geoEmail);
$email_add = $geoAddress. '@'. $geoDomain. '.'. $geoTld;

	{
	$mailFrom = $_REQUEST['email']; // sent_from email address recieved from a stored variable in email form
	$mailSubject = "Website Contact Form"; //message subject
	//$to_address = $_REQUEST['email'];
	$to_address = $email_add; // send_to email address recieved from a stored variable in email form
	//$success=mail($to_address, 'Email Request from Website', $_REQUEST['message']);
	$msgbody= $_REQUEST['message']; //message body recieved from a stored variable in email form
	//$message="Address: ".$to_address.", Subject: ".$mailSubject."\n";
	$msgbody2 = $_REQUEST['name']." has sent you the following message from the malone.edu website contact form:"."\n\n$msgbody"; // main message body
	$headers = "From: $mailFrom\n";
	$success = mail($to_address,$mailSubject,$msgbody2,$headers); //sends email
	echo "<h4 style=\"background-color:#FFF;color:#000\">Thank you for your submission </h4>";
	}

?>
