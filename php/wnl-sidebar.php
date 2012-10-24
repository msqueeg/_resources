<?php
    $namespace = "http://search.yahoo.com/mrss/";
    
    if(!isset($rsspath)){
    	$rss = simplexml_load_file($_SERVER["DOCUMENT_ROOT"] . "/_resources/rss/news.xml"); //for testing, replace url with xml location
    }else{
    	$rss = simplexml_load_file($rsspath);
    }
    
    if(!isset($filter)){ $filter = "nofilter"; }
         
    foreach($rss->channel->item as $item){
    	if($filter == $item->tag || $filter == "nofilter"){
		      $date = date("n.d.Y", strtotime($item->pubDate));
		     
		      /*Display items*/
		     echo "<p>$item->title</p>"
		         ."<p>$date</p>"
		         ."<p class='more'><a href='$item->link'>Read More</a></p>";
		}
    }
	
 ?>
 
 
