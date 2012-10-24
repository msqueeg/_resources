<?php
// define vars
$font = './arial.ttf';
$geoEmail = str_rot13($_GET["link"]);
list($geoAddress, $geoDomain, $geoTld) = explode( " ", $geoEmail);
//$msg =$geoAddress. '@'. $geoDomain. '.'. $geoTld;
//$msg = 'test@malone.edu'; //works
//$msg = '1234@malone.edu'; 
//$msg = '123@malone.edu'; 
//$msg = 'webmaster@malone.edu';
$msg = 'balbertson@malone.edu';  //works at size=8
//$msg = 'WWWWWWWWWWWWWWWW'; //works
$size = 11; 
$pad = 11;
$transparent = 1;
$width = 0;
$height = 0;
$offset_x = 0;
$offset_y = 0;
$bounds = array();
$image = "";

// get the font height.
$bounds = ImageTTFBBox($size, 0, $font, "W");
$font_height = abs($bounds[7]-$bounds[1]);

// determine bounding box.
$bounds = ImageTTFBBox($size, 0, $font, $msg);
$width = abs($bounds[4]-$bounds[6]);
$height = abs($bounds[7]-$bounds[1]); 
$offset_y = $font_height+abs(($height - $font_height)/2)-1;
$offset_x = 0;
$image = imagecreatetruecolor($width+($pad*2),$height+($pad*2));
imagesavealpha($image, true);

// Create some colors
$white = imagecolorallocate($image, 255, 255, 255);
$grey = imagecolorallocate($image, 128, 128, 128);
$black = imagecolorallocate($image, 0, 0, 0);
$color= imagecolorallocate($image, 1, 62, 127); 

imagefill($image, 0, 0, $white);
// render the image
ImageTTFText($image, $size, 0, $offset_x+$pad, $offset_y+$pad, $color, $font, $msg);

// output PNG object.
Header("Content-type: image/png");
imagePNG($image);
imagedestroy($im);
?>