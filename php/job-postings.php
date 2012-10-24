<?php
// =========================================================
// getRSS function
// By: OmniUpdate <support@omniupdate.com>
// Modified by David to use ksort instead of compare function and utilize function args instead of hardcoding values
// =========================================================

function getRSS( $path, $order, $num_items ) {
	// Create a new DOM Document
	$domDoc = new DOMDocument();
	$myMSG = "<p>There are currently no openings.</p>";
	
	if(stristr($path,"http://") === false) {
		$path = $_SERVER['DOCUMENT_ROOT'].$path;
	}
	
	// Load the RSS file
	if( @$domDoc->load($path) ) {
		
		// Extract the item nodes
		$nodes = $domDoc->getElementsByTagName("item");
		// Loop through until last item is reached
		for ($i = 0; $i < $nodes->length; $i++) {
			$node = $nodes->item($i);
			if ($node->nodeType == XML_ELEMENT_NODE) {
				// Turn the pubDate into a UNIX timestamp, so it will be sortable
				$item_date = strtotime($node->getElementsByTagName("pubDate")->item(0)->nodeValue); // <pubDate>
				// Grab the rest of the nodes
				$items[$i]["title"] = $node->getElementsByTagName("title")->item(0)->nodeValue; // <title>
				$items[$i]["link"] = $node->getElementsByTagName("link")->item(0)->nodeValue; // <link>
				$items[$i]["description"] = $node->getElementsByTagName("description")->item(0)->nodeValue; // <description>
				$items[$i]["date"] = $item_date;
			}
		}
		
		if( isset($items) ) {			
			// Sort the items ascending by date by default
			ksort ($items);
			
			// Order descending if specified via argument
			if($order == "d") {
				krsort ($items);
			}
			
			// Limit the array by the maximum number of items based on argument
			$items = array_slice($items, 0, $num_items);
			
			// Return the array
			return $items;
		} else {
			// Return false, no item nodes were found in the RSS
			return $myMSG;
		}
	} else {
		echo "<tr><td>There are currently no openings.</td></tr>";
	}
}

?>
