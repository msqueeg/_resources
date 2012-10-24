<?php
// if(empty($feed)){
// 	$feed=$_GET['feed'];
// }
//	$feed = '2acfb1a8-012a-d39203a0-000000ab'; //hpss feed - for testing
//	$feed = '2acfb1a8-012a-d391c323-000000aa'; //visual arts feed - for testing
//	$today = strtotime("now");
//	$today = date("Ymd",$today);
//	$later = strtotime("+3 months");
//	$later = date("Ymd", $later);

//	$rss = "http://webcal.malone.edu/webcache/v1.0/rssRange/".$today."/".$later."/list-rss/%28catuid%3D%27402849b7-".$feed."%27%29.rss";
	$rss = "http://webcal.malone.edu/webcache/v1.0/rssDays/31/list-rss/no--filter.rss";
$rssitems=2;
$grabXML=$rss;
	  $objDOM = new DOMDocument();
	  $objDOM->load($grabXML); 
	  $root = $objDOM->getElementsByTagName("item");
	  $j=1;
	  $items = array();
      	foreach ($root as $node) {
      		$item_date = strtotime($objDOM->getElementsByTagName('pubDate')->item($j)->textContent."C");
      		$items[$item_date]["title"] = $objDOM->getElementsByTagName('title')->item($j)->textContent;
      		$items[$item_date]["link"] = $objDOM->getElementsByTagName('link')->item($j)->textContent;
      		$items[$item_date]["description"] = $objDOM->getElementsByTagName('description')->item($j)->textContent;	
      		$items[$item_date]["date"] = $item_date;
      		  $j=$j+1;
      	}
      	krsort($items);
      	$items = array_slice($items, 0, $rssitems);
      	foreach ($items as $item) {
      				$link = $item['link'];
				$title = $item['title'];
				$description = substr($item['description'], 0, 300) . "...";
				$brPosition = strpos($item['description'], '<br/>');
				$datespan = substr($item['description'],0,$brPosition);
				$dashPosition = strpos ($datespan, '-');
				$lcPosition = strpos($datespan, ':', 0);
				$startDate = trim(substr($datespan, 0, $lcPosition-2));
				$startDate = strtotime($startDate);
				$startDate = date("n.j.Y", $startDate);
				$endDate = substr($datespan, $dashPosition+1);
				$rcPosition = strpos($endDate, ':', 0);
				$endDate = trim(substr($endDate, 0, $rcPosition-2));
				$endDate = strtotime($endDate);
				if ($endDate != 0) {
				$endDate = date("n.j.Y", $endDate);
					echo '
					<div class="news-box">
					<a href="'.$link.'"><img src="/_resources/images/news-and-events/events.jpg" width="211" height="92" alt="Events entry" title="'.$title.'" /></a>
					<h3>'.$title.'</h3>
					<p class="date">'.$startDate.' - '.$endDate.'</p>
					<p class="more"><a href="'.$link.'">Read More</a></p>
					</div>
						';	
				} else {
				
				$itemdate = $item['date'];
				
					echo '
					<div class="news-box">
					<a href="'.$link.'"><img src="/_resources/images/news-and-events/events.jpg" width="211" height="92" alt="Events entry" title="'.$title.'" /></a>
					<h3>'.$title.'</h3>
					<p class="date">'.date("n.j.Y",$itemdate).'</p>
					<p class="more"><a href="'.$link.'">Read More</a></p>
					</div>
					';	
				}
      	}	 		
?>
