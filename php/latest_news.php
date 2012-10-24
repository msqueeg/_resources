<?php
	// Reqire the RSS include file
	require_once( $_SERVER['DOCUMENT_ROOT'] . "/_resources/php/news_reader_class.php" );
	
	// URL to the RSS Feed
	$path = "http://www.malone.edu/_resources/rss/news.xml";
	
	// Maximum number of items to display
	$max_items = 3;
	
	// Download, parse, and sort the RSS feed
	// NOTE: Put $_SERVER['DOCUMENT_ROOT'] before the path if it is not a url
	$items = getRSS( $path, "a", $max_items );
	
		// ksort($items); // sort items again??
      		// Loop through the items
      		foreach ($items as $item) {
      			// Populate variables
      			$link = $item['link'];
      			$title = $item['title'];
      			//$pubdate = date("F d, Y", $item['date']);
				$pubdate = date("n.d.Y", $item['date']);
      			$description = $item['description'];
      			// Output item
    			echo 
    			'
				<div class="news-box">
				<a href="'.$link.'"><img src="/_resources/images/news-and-events/events.jpg" width="211" height="92" alt="Events entry" title="'.$description.'" /></a>
				<h3>'.$title.'</h3>
				<p class="date">'.$pubdate.'</p>
				<p class="more"><a href="'.$link.'">Read More</a></p>
				</div>
				';
			}

?>

