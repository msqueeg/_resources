<?php
/*
     Fundraising Thermometer Generator v1.1
     Sairam Suresh sai1138@yahoo.com / www.entropyfarm.org
    
     NOTE - you must include the full path to the truetype font on your system below 
            if you want text labels to appear on your graph. No TrueType fonts are
            included in this package, you can probably find some on your system or
            else download one off the net.
      

     Inputs: 'unit'    - the ascii value of the currency unit. By default 36 ($)
                         other interesting ones are:
                           163:  British Pound
                           165:  Japanese Yen
                           8355: French Franc
                           8364: Euro

             'max'     - the goal
             'current' - the current amount raised

     Versions:
	 mrm - changed $HTTP_GET_VARS to $_GET,added font, 
     1.2 - added a 'burst' image on request, cleaned up the images a little bit.
     1.1 - Internationalized :) added 'unit' at a user's request so other currencies could be used.
     1.0 - intial version

*/
error_reporting(7); // Only report errors
Header("Content-Type: image/jpeg"); 

function code2utf($num){
 //Returns the utf string corresponding to the unicode value
 //courtesy - romans@void.lv
 if($num<128)return chr($num);
 if($num<2048)return chr(($num>>6)+192).chr(($num&63)+128);
 if($num<65536)return chr(($num>>12)+224).chr((($num>>6)&63)+128).chr(($num&63)+128);
 if($num<2097152)return chr(($num>>18)+240).chr((($num>>12)&63)+128).chr((($num>>6)&63)+128). chr(($num&63)+128);
 return '';
} 

#$font = "/usr/local/fonts/ttf/arial.ttf";
$font = "/web/www.malone.edu/includes/thermometer/font/PT_Serif-Caption-Web-Regular.ttf";

$unit = ($_GET['unit']) ? $_GET['unit'] : 36; // ascii 36 = $
$t_unit = ($unit == 'none') ? '' : code2utf($unit);
$t_max = ($_GET['max']) ? $_GET['max'] : 0;
$t_current = isset($_GET['current']) ? $_GET['current'] : 0;

$finalimagewidth = max(strlen($t_max),strlen($t_current))*25;
$finalimage = imagecreateTrueColor(30+$finalimagewidth,405);

$white = imagecolorallocate ($finalimage, 255, 255, 255);
$black = imagecolorallocate ($finalimage, 0, 0, 0);
$red = imagecolorallocate ($finalimage, 255, 0, 0);

//imagecolortransparent($finalimage, $white);

imagefill($finalimage,0,0,$white);
ImageAlphaBlending($finalimage, true); 


$thermImage = imagecreatefromjpeg("therm.jpg");
$tix = ImageSX($thermImage);
$tiy = ImageSY($thermImage);
ImageCopy($finalimage,$thermImage,10,0,0,0,$tix,$tiy);

/*
  thermbar pic courtesy http://www.rosiehardman.com/
*/
$thermbarImage = ImageCreateFromjpeg('thermbar.jpg'); 
$barW = ImageSX($thermbarImage); 
$barH = ImageSY($thermbarImage); 


$xpos = 15;
$ypos = 327;
$ydelta = 15;
$fsize = 10;


// Set number of $ybars to use, calculated as a factor of current / max.
if ($t_current > $t_max) {
    $ybars = 25;
} elseif ($t_current > 0) {
    $ybars = $t_max ? round(20 * ($t_current / $t_max)) : 0;
}

// Draw each ybar (filled red bar) in successive shifts of $ydelta.
while ($ybars--) {
    ImageCopy($finalimage, $thermbarImage, $xpos, $ypos, 0, 0, $barW, $barH); 
    $ypos = $ypos - $ydelta;
}

if ($t_current == $t_max) {
    ImageCopy($finalimage, $thermbarImage, $xpos, $ypos, 0, 0, $barW, $barH); 
    $ypos -= $ydelta;
} 

// If there's a truetype font available, use it
if ($font && (file_exists($font))) {
    imagettftext ($finalimage, $fsize, 0, 70, 355, $black, $font,$t_unit."0");                 // Write the Zero
    imagettftext ($finalimage, $fsize, 0, 70, 10+(2*$fsize), $black, $font, $t_unit.number_format("$t_max"));   // Write the max
    if ($t_current > $t_max) {
        imagettftext ($finalimage, $fsize+1, 0, 70, $fsize, $black, $font, $t_unit.number_format("$t_current!!")); // Current > Max
    } elseif($t_current != 0) {
        if ($t_current == $t_max) {
            imagettftext ($finalimage, $fsize, 0, 70, 10+(2*$fsize), $red, $font, $t_unit.number_format("$t_max!"));  // Current = Max
        } else {
            if (round($t_current/$t_max) == 1) {
                $ypos += 2*$fsize;
            }
            imagettftext ($finalimage, $fsize, 0, 70, ($t_current > 0) ? ($ypos+$fsize) : ($ypos+(4*$fsize)), ($t_current > 0) ? $black : $red, $font, $t_unit.number_format("$t_current"));  // Current < Max
        }
    }
}

if ($t_current > $t_max) {
    $burstImg = ImageCreateFromjpeg('burst.jpg');
    $burstW = ImageSX($burstImg);
    $burstH = ImageSY($burstImg);
    ImageCopy($finalimage, $burstImg, 10,0,0,0,$burstW, $burstH);
}

Imagepng($finalimage);
Imagedestroy($finalimage);
Imagedestroy($thermImage);
Imagedestroy($thermbarImage);

?> 
