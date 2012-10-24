<?php
header('Content-type: image/png');

$geoEmail = str_rot13($_GET["link"]);
list($geoAddress, $geoDomain, $geoTld) = explode( " ", $geoEmail);

// The text to draw
//$text = 'test@test.com';
$text =$geoAddress. '@'. $geoDomain;
//$text .= '.'. $geoTld;
// Replace path by your own font path
$font = './arial.ttf';
$dims = imagettfbbox(10, 0, $font, $text);
$width = abs($dims[4] - $dims[6]); // upper-right x minus upper-left x   
$height = abs($dims[3] - $dims[5]); // lower-right y minus upper-right y 
// Create the image
$im = imagecreatetruecolor($width, $height);

// Create some colors
$white = imagecolorallocate($im, 255, 255, 255);
$grey = imagecolorallocate($im, 128, 128, 128);
$black = imagecolorallocate($im, 0, 0, 0);
$color=imagecolorallocate($im, 1, 62, 127); 



imagefilledrectangle($im, 0, 0, $width, $height, $white);
// Add some shadow to the text
//imagettftext($im, 20, 0, 11, 21, $grey, $font, $text);

// Add the text
imagettftext($im, 10, 0, 0, 10, $black, $font, $text);

// Using imagepng() results in clearer text compared with imagejpeg()
imagepng($im);
imagedestroy($im);
?>
