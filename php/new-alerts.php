<?php
    $namespace = "http://search.yahoo.com/mrss/";
    
   	$rss = simplexml_load_file("http://rss.blackboardconnect.com/140866/emergency/feed.xml");
	//$rss = simplexml_load_file("http://www.malone.edu/_resources/rss/news.xml");
         
    foreach($rss->channel->item as $item){
		     		     
		      /*Display items*/
		     echo	'
					<div id="alertBar">
					<div id="alertBarContent"><span>'.$item->title.' </span> <a href="'.$item->link.'">For More Information...</a></div>
					</div>
	    			';
    }
	
 ?>