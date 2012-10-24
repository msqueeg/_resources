<ul class="pr-list">
<?php
	//Set and get page
	$pageno = 1;
	if (isset($_GET['pageno'])){
		$pageno = $_GET['pageno'];
	}
	
	// Reqire the RSS include file
	require_once( $_SERVER['DOCUMENT_ROOT'] . "/_resources/php/news_reader_class.php" );
	
	// URL to the RSS Feed
	$path = "http://www.malone.edu/_resources/rss/newsarticles.xml";
	
	// Maximum number of items to display
	$max_items = 999;
	$rows_per_page = 20;
	
	// Download, parse, and sort the RSS feed
	// NOTE: Put $_SERVER['DOCUMENT_ROOT'] before the path if it is not a url
	$items = getRSS( $path, "a", $max_items );
	
	$num_items = count($items);
	
	$lastpage = ceil($num_items/$rows_per_page);
	
	$pageno = (int)$pageno;
	
	if ($pageno > $lastpage) {
	   $pageno = $lastpage;
	} // if
	if ($pageno < 1) {
	   $pageno = 1;
	} // if

	if ($pageno == 1) {
		$items = array_slice($items, 0, $rows_per_page);
		// If items are populated
		if( $items ) {
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
					<li>
					<h3>'.$title.'</h3>
					<p class="date">'.$pubdate.'</p>
					<p class="description">'.$description.'</p>
					<p class="more"><a href="'.$link.'">Read the full press release</a></p>
					</li>
					';
			}
		}
	   echo " FIRST PREV ";
	} else {
		$items = array_slice($items, ($pageno*$rows_per_page)-$rows_per_page, $rows_per_page);
		// If items are populated
		if( $items ) {
			// ksort($items); // sort items again??
	      		// Loop through the items
	      		foreach ($items as $item) {
	      			// Populate variables
	      			$link = $item['link'];
	      			$title = $item['title'];
	      			$pubdate = date("n.d.Y", $item['date']);
	      			$description = $item['description'];
	      			// Output item
	    			echo 
	    			'
					<li>
					<h3>'.$title.'</h3>
					<p class="date">'.$pubdate.'</p>
					<p class="description">'.$description.'</p>
					<p class="more"><a href="'.$link.'">Read the full press release</a></p>
					</li>
					';
			}
		}
	   echo " <a href='{$_SERVER['PHP_SELF']}?pageno=1'>FIRST</a> ";
	   $prevpage = $pageno-1;
	   echo " <a href='{$_SERVER['PHP_SELF']}?pageno=$prevpage'>PREV</a> ";
	} // if

	echo " ( Page $pageno of $lastpage ) ";
	
	if ($pageno == $lastpage) {
	   echo " NEXT LAST ";
	} else {
	   $nextpage = $pageno+1;
	   echo " <a href='{$_SERVER['PHP_SELF']}?pageno=$nextpage'>NEXT</a> ";
	   echo " <a href='{$_SERVER['PHP_SELF']}?pageno=$lastpage'>LAST</a> ";
	} // if
	
?>
</ul>
