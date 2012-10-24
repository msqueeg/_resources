<?php

	// Reqire the RSS include file
	require_once( $_SERVER['DOCUMENT_ROOT'] . "/_resources/php/news_reader_class.php" );
	
	// URL to the RSS Feed
	$path = "http://rss.blackboardconnect.com/140866/emergency/feed.xml";
	
	// Maximum number of items to display
	$max_items = 1;
	
	// Download, parse, and sort the RSS feed
	// NOTE: Put $_SERVER['DOCUMENT_ROOT'] before the path if it is not a url
	$items = getRSS( $path, "a", $max_items );
	
	$num_items = count($items);
	
	
	// If items are populated
	if( $items ) {
			// ksort($items); // sort items again??
	      		// Loop through the items
	      		foreach ($items as $item) {
	      			// Populate variables
	      			$link = $item['link'];
	      			$title = $item['title'];
	      			$description = $item['description'];
	      			// Output item
	    			echo 
	    			'
					<div id="alertBar">
					<div id="alertBarContent"><span>'.$title.' </span> <a href="'.$link.'">For More Information...</a></div>
					</div>
	    			';
			}
		}
	else {
	}
?>
