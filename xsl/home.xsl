<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://commons.omniupdate.com/dtd/standard.dtd">
<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ou="http://omniupdate.com/XSL/Variables"
	exclude-result-prefixes="ou">

<xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />

<xsl:strip-space elements="*"/>

<xsl:template name="home">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Malone University - A Christian University in Canton, OH</title>
		<!-- com.omniupdate.properties -->
		<meta name="keywords" content="Christian University"/>
		<meta name="description" content="Malone University is a Christian liberal arts university in Canton, Ohio. Malone is committed to providing an exceptional educational experience grounded in biblical faith."/>
		<!-- /com.omniupdate.properties -->
		<xsl:comment> com.omniupdate.div label="stylesheets" button="707" path="/_resources/includes/stylesheets.html" </xsl:comment>
			<xsl:processing-instruction name="php">
				include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/stylesheets.html");
			</xsl:processing-instruction>
		<xsl:comment> /com.omniupdate.div </xsl:comment>
</head>
<body class="home-page no-js">
<script type="text/javascript">document.body.className = document.body.className.replace(/\bno-js\b/, 'js');</script>
<div class="container">

	<ol id="accessibility-nav">
		<li><a href="#navigation">Skip to navigation</a></li>
		<li><a href="#secondary-navigation">Skip to secondary navigation</a></li>
		<li><a href="#content">Skip to content</a></li>
		<li><a href="#sidebar">Skip to sidebar</a></li>
	</ol>
	<!-- / accessibility-nav -->
	<hr />

	<div id="header">
		<a href="http://www.malone.edu/" rel="home" title="Go to homepage" class="site-name"><span><img src="/_resources/images/common/logo-print.jpg" width="228" height="85" alt="Malone University Logo" /></span></a>
		
		<h2 class="hide">Secondary Navigation</h2>
		<ul id="secondary-navigation">
			<li><a href="/apply">Apply</a> /&nbsp;</li>
			<li><a href="/offices-and-services/advancement/malone-fund.php">Giving</a> /&nbsp;</li>
			<li><a href="/mx.php">MaloneXpress</a> /&nbsp;</li>
			<li><a href="/bookstore">Bookstore</a> /&nbsp;</li>
			<li><a href="/about-malone/contact-us.php">Contact Us</a></li>
		</ul>
		
		
	</div>
	<!-- / header -->
	<hr />
	<!--Alert Bar -->
	<xsl:processing-instruction name="php">
		include ($_SERVER['DOCUMENT_ROOT'] . "/_resources/php/alerts.php");
	</xsl:processing-instruction>
	<!-- END Alert Bar -->
	<h2 class="hide">Primary Navigation</h2>
	<div id="navigation">
		<xsl:comment> com.omniupdate.div label="navigation" group="secure" button="707" path="/_resources/includes/navigation.html" </xsl:comment>
			<xsl:processing-instruction name="php">
				include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/navigation.html");
			</xsl:processing-instruction>
		<xsl:comment> /com.omniupdate.div </xsl:comment>
	</div>
	<!-- / navigation -->
	<hr />

	<div id="content-wrapper">
	
		<div id="content">
		
			<div id="hero" class="scrollable">
				<xsl:if test="$ou:action = 'edt'">
					<div style="display:none"><xsl:copy-of select="document/maincontent/hero/node()" /></div>
				</xsl:if>
				<ul class="items">
					<xsl:for-each select="document/maincontent/hero/promo">
						<li class="hero-{class}">							
							<a href="{link}">
								<xsl:copy-of select="image/img"/>
								<span>
									<xsl:choose>
										<xsl:when test="class='event'">
											<xsl:choose>
												<xsl:when test="dark = 'selected'">
													<xsl:attribute name="class">news-detail dark</xsl:attribute>
												</xsl:when>
												<xsl:otherwise>
													<xsl:attribute name="class">news-detail</xsl:attribute>
												</xsl:otherwise>
											</xsl:choose>
										</xsl:when>
										<xsl:otherwise>
											<xsl:choose>
												<xsl:when test="dark = 'selected'">
													<xsl:attribute name="class">promo-detail dark</xsl:attribute>
												</xsl:when>
												<xsl:otherwise>										
													<xsl:attribute name="class">promo-detail</xsl:attribute>										
												</xsl:otherwise>
											</xsl:choose>
										</xsl:otherwise>
									</xsl:choose>
									<xsl:copy-of select="desc/node()" />
									<xsl:if test="class='event'">
									<em><xsl:value-of select="time"/></em>
									Read More
									</xsl:if>
								</span>
							</a>
						</li>
					</xsl:for-each>				
				</ul>
			</div>
			
			<div id="hero-controls">
				<a class="prev" href="#">&lt;&lt;<span title="Previous banner"><xsl:comment></xsl:comment></span></a>
				<a class="next" href="#">&gt;&gt;<span title="Next banner"><xsl:comment></xsl:comment></span></a>	
			</div>
		
		</div>
		<!-- / content -->
		<hr />
	
		<div id="sidebar">
			
			<ul id="audience">
				<xsl:comment> com.omniupdate.div label="audience" group="secure" button="707" path="/_resources/includes/audience.html" </xsl:comment>
					<xsl:processing-instruction name="php">
include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/audience.html");
</xsl:processing-instruction>
				<xsl:comment> /com.omniupdate.div </xsl:comment>
			</ul>
			<!-- / audience -->
			
			<div id="promotions">
				<div class="scrollable">
					<ul class="items">
					
					<xsl:for-each select="doc(concat($ou:root,$ou:site,'/_resources/includes/banners'))/list/file">
					<xsl:if test="contains(.,'.html')">
						<li class="{substring-before(.,'.html')}">
							<xsl:choose>
								<xsl:when test="not($ou:action = 'pub')">
									<xsl:value-of select="unparsed-text(concat($ou:httproot,'_resources/includes/banners/',.))" disable-output-escaping="yes" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:processing-instruction name="php">
										include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/banners/<xsl:value-of select='.' />");
									</xsl:processing-instruction>
								</xsl:otherwise>
							</xsl:choose>
						</li>
					</xsl:if>
					</xsl:for-each>
					</ul>
				</div>
				<a class="prev" href="#">&lt;&lt;<span title="Previous banner"><xsl:comment></xsl:comment></span></a>
				<a class="next" href="#">&gt;&gt;<span title="Next banner"><xsl:comment></xsl:comment></span></a>
			</div>
			<!-- / promotions -->
			
			
			<xsl:copy-of select="document/sidebar/content/node()"/>
			
			<div id="footer">
				<form id="search_form" action="http://ousearch-3.omniupdate.com/query.html" method="get">
					<fieldset>
						<input name="hidden" type="hidden" />
						<input name="col" type="hidden" value="malone" />
						<input name="style" type="hidden" value="Malone2" />
						<input name="charset" type="hidden" value="utf-8" />
						<label for="search">Search</label>
						<input class="placeholder" type="text" id="search" name="qt" />
						<input type="image" src="/_resources/images/common/search.png" id="search_button" value="qt" />
					</fieldset>
				</form>
				
				<xsl:comment> com.omniupdate.div label="footer" group="secure" button="707" path="/_resources/includes/footer.html" </xsl:comment>
					<xsl:processing-instruction name="php">
						include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/footer.html");
					</xsl:processing-instruction>
				<xsl:comment> /com.omniupdate.div </xsl:comment>
				
			</div>
			<!-- / footer -->
			
		</div>
		<!-- / sidebar -->
		<hr />
		
	</div>
	<!-- / content-wrapper -->
	<!-- direct edit button -->
	<xsl:comment> com.omniupdate.ob </xsl:comment>	<xsl:comment> /com.omniupdate.ob </xsl:comment>
</div>
<!-- / container -->

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js">//</script>  
	<script type="text/javascript" src="/_resources/js/jquery.tools.min.js">//</script>
	<script type="text/javascript" src="/_resources/js/home.js">//</script>    
<!--
  
  <script type="text/javascript" src="/_resources/js/cufon-yui.js">//</script>  
-->

<div class="bg-image-container">
	<xsl:comment> com.omniupdate.div label="bg-image" group="secure" button="707" path="/_resources/includes/bg-img.html" </xsl:comment>
		<xsl:processing-instruction name="php">
			include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/bg-img.html");
		</xsl:processing-instruction>
	<xsl:comment> /com.omniupdate.div </xsl:comment>
</div>

</body>
</html>
</xsl:template>
</xsl:stylesheet>
