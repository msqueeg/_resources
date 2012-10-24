<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://commons.omniupdate.com/dtd/standard.dtd">
<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ou="http://omniupdate.com/XSL/Variables"
	exclude-result-prefixes="ou">

<xsl:import href="breadcrumb.xsl" />	
<xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" />

<xsl:param name="banner-color">
	<xsl:choose>
		<xsl:when test="$pagetype = 'onecol' or $pagetype = 'office'">green</xsl:when>
		<xsl:when test="$pagetype = 'department' or $pagetype = 'programs'">purple</xsl:when>
		<xsl:when test="$pagetype = 'audience' or $pagetype = 'overview'">blue</xsl:when>
		<xsl:otherwise />	
	</xsl:choose>
</xsl:param>

<xsl:template name="interior">

<html>
<head>		
	<title><xsl:value-of select="document/title" /> | Malone University</title>
	<xsl:copy-of select="document/metadata/node()" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<xsl:comment> com.omniupdate.div label="stylesheets" button="707" path="/_resources/includes/stylesheets.html" </xsl:comment>
		<xsl:processing-instruction name="php">
			include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/stylesheets.html");
		</xsl:processing-instruction>
	<xsl:comment> /com.omniupdate.div </xsl:comment>
	
	<xsl:copy-of select="document/headcode/node()"/>

	<xsl:if test="$ou:action='edt'">
		<style>
			.ox-regioneditbutton{
				background:none !important;
				padding:0;
			}
		</style>
	</xsl:if>

</head>
<body>
	<xsl:choose>
		<xsl:when test="$pagetype = 'onecol'">
			<xsl:attribute name="class">one-column no-js</xsl:attribute>
		</xsl:when>
		<xsl:when test="$pagetype = 'twocol'">
			<xsl:attribute name="class">two-column no-js</xsl:attribute>
		</xsl:when>
		<xsl:when test="$pagetype = 'department'">
			<xsl:attribute name="class">department no-js</xsl:attribute>
		</xsl:when>
		<xsl:when test="$pagetype = 'programs'">
			<xsl:attribute name="class">programs no-js</xsl:attribute>
		</xsl:when>
		<xsl:otherwise>
			<xsl:attribute name="class">no-js</xsl:attribute>
		</xsl:otherwise>
	</xsl:choose>
<script type="text/javascript">document.body.className = document.body.className.replace(/\bno-js\b/, 'js');</script>
<div class="container">
	<xsl:comment> com.omniupdate.div label="header" group="secure" button="707" path="/_resources/includes/header.html" </xsl:comment>
		<xsl:processing-instruction name="php">
			include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/header.html");
		</xsl:processing-instruction>
	<xsl:comment> /com.omniupdate.div </xsl:comment>
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
	
		<div id="content" class="hero-top">
			<xsl:if test="(($pagetype = 'overview') and (document/config/parameter[@name='hero-image']/option[@value='true']/@selected != 'true')) or not(document/maincontent/hero/img) or $pagetype = 'news-item'">
				<xsl:attribute name="class">line-top</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="document/config/parameter[@name='promo-banner']/option[@value='true']/@selected='true'">
				<div class="banner-{$banner-color}">
				<xsl:comment> com.omniupdate.div label="banner-green" button="707" group="secure" path="/_resources/includes/banners/banner-<xsl:value-of select="$banner-color"/>.html" </xsl:comment>
				<xsl:processing-instruction name="php">
					include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/banners/banner-<xsl:value-of select="$banner-color"/>.html");
				</xsl:processing-instruction>
				<xsl:comment> /com.omniupdate.div </xsl:comment>
				</div>
			</xsl:if>
			
			<!-- the following tests if the pagetype is neither overview nor news-item (both don't have hero images), if the hero image is turned on, and makes sure the hero image exists -->
			<xsl:if test="(($pagetype != 'overview' or $pagetype !='news-item') or (document/config/parameter[@name='hero-image']/option[@value='true']/@selected='true')) and (document/maincontent/hero/img)">
				<div class="hero">
					<xsl:copy-of select="document/maincontent/hero/node()" />
				</div>
			</xsl:if>
			
			<div id="main">
				<div id="breadcrumb">
					<h2 class="hide">Breadcrumb navigation</h2>					
					<!-- a href="#">home</a> / <a href="#">admission &amp; financial aid</a> / <a href="#">undergraduate admission</a> / <a href="#">how to apply</a -->
					<xsl:call-template name="bc">
						<xsl:with-param name="path" select="$ou:dirname"/>									
						<xsl:with-param name="title" select="document/title/text()"/>	
					</xsl:call-template>
				</div>
				<!-- / breadcrumb -->
				
				<hr />
				
				<xsl:choose>
					<xsl:when test="$pagetype = 'news-item' ">
						<xsl:call-template name="news-item-interior" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="standard-interior" />				
					</xsl:otherwise>
				</xsl:choose>
				
				
			</div>
			<!-- / main -->
		
		</div>
		<!-- / content -->
		<hr />
	
		<div id="sidebar">			
			<xsl:choose>
				<xsl:when test="$pagetype = 'audience'">
					<ul id="audience">
						<xsl:comment> com.omniupdate.div label="audience" group="secure" button="707" path="/_resources/includes/audience.html" </xsl:comment>
						<xsl:processing-instruction name="php">
							include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/audience.html");
						</xsl:processing-instruction>
						<xsl:comment> /com.omniupdate.div </xsl:comment>
					</ul>
				</xsl:when>
				<xsl:otherwise> <!-- when the page type is not audience, use the regular local navigation -->
					<xsl:choose>
						<xsl:when test="not($ou:action = 'pub')">
							<xsl:choose>
								<xsl:when test="doc-available(concat($ou:httproot,substring-after($leftnav,'/')))">
									<xsl:value-of disable-output-escaping="yes" select="unparsed-text(concat($ou:httproot,substring-after($leftnav,'/')),'utf-8')" />
								</xsl:when>
								<xsl:otherwise>
									<h3>Warning: the navigation file you referred to doesn't currently exist on the production server.  Please make sure the naviagtion PCF has been published and that the path is correctly set in the directory variable.</h3>
								</xsl:otherwise>
							</xsl:choose>							
						</xsl:when>
						<xsl:otherwise>
								<xsl:processing-instruction name="php">
									include($_SERVER['DOCUMENT_ROOT'] . "<xsl:value-of select="$leftnav" />");
								</xsl:processing-instruction>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
			<!-- / interior-nav -->
			<hr />
			
			<!--sidebar call to action -->
			<h2 class="hide">File application</h2>
			<xsl:copy-of select="document/sidebar/apply/node()" />
			<!--END sidebar call to action -->
			
			<hr />
			
			<xsl:if test="document/config/sidebar-widgets/parameter/option[@value='disabled']/@selected='false'">
			<div id="news">
			<xsl:if test="document/config/sidebar-widgets/parameter[@name='news-widget']/option[@value='disabled']/@selected='false'">
				<h2>News</h2>
				<xsl:choose>
					<xsl:when test="$ou:action='pub'">
						<xsl:processing-instruction name="php">
							$filter = "<xsl:value-of select="document/config/sidebar-widgets/parameter[@name='news-widget']/option[@selected='true']/@value" />";
							include($_SERVER["DOCUMENT_ROOT"] . "/_resources/php/wnl-sidebar.php");
						</xsl:processing-instruction>
					</xsl:when>
					<xsl:otherwise>
						<p>You've selected the <xsl:value-of select="document/config/sidebar-widgets/parameter[@name='news-widget']/option[@selected = 'true']"/> feed.</p>
						<p>This feed will not show up until you publish the page.</p>					
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
			
			<xsl:if test="document/config/sidebar-widgets/parameter[@name='events-widget']/option[@value='disabled']/@selected='false'">		
				<!--Begin Events RSS Feed -->
				<h2><a href="#">Events</a></h2>		
				<xsl:choose>
					<xsl:when test="$ou:action ='pub'">
						<xsl:processing-instruction name="php">
							$rss="http://webcal.malone.edu:9090/webcache/v1.0/rssDays/28/list-rss/%28catuid%3D%27402849b7-2acfb1a8-<xsl:value-of select="document/config/sidebar-widgets/parameter[@name='events-widget']/option[@selected = 'true']/@value"/>%27%29.rss";
							include($_SERVER['DOCUMENT_ROOT'] . "/_resources/php/cal_rss.php");
						</xsl:processing-instruction>
					</xsl:when>
					<xsl:otherwise>
						<!--<xsl:value-of select="unparsed-text(concat($ou:httproot,'/_resources/php/cal_rss.php'),'utf-8')" disable-output-escaping="yes" />-->
						<p>You've selected the <xsl:value-of select="document/config/sidebar-widgets/parameter[@name='events-widget']/option[@selected = 'true']"/> feed.</p>
						<p>This feed will not show up until you publish the page.</p>
					</xsl:otherwise>
				</xsl:choose>
				<!--END Events RSS Feed -->
			</xsl:if>
			
			<xsl:if test="document/config/sidebar-widgets/parameter[@name='twitter-widget']/option[@value='disabled']/@selected='false'">
				<!--Begin Twitter -->
				<xsl:comment> com.omniupdate.div label="twitter" group="" button="707" path="/_resources/includes/twitter.html" </xsl:comment>				
				<xsl:processing-instruction name="php">
					include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/twitter.html");
				</xsl:processing-instruction>
				<xsl:comment> /com.omniupdate.div </xsl:comment>
				<!--END Twitter -->
			</xsl:if>
				
			</div>
			<!-- / news -->
			</xsl:if>
			
			<xsl:if test="document/config/parameter[@name='facebook-widget']/option[@value='disabled']/@selected!='true'">	
			<div id="fb">
				<script src="http://connect.facebook.net/en_US/all.js#xfbml=1">//</script>
				<xsl:text disable-output-escaping="yes">&lt;fb:like-box</xsl:text> href="http://www.facebook.com<xsl:value-of select="document/config/parameter[@name='facebook-widget']/option[@selected='true']/@value" />" width="226" show_faces="false" stream="true" header="true"<xsl:text disable-output-escaping="yes">&gt;</xsl:text>
				<xsl:text disable-output-escaping="yes">&lt;/fb:like-box&gt;</xsl:text>
			</div>
			</xsl:if>
			
			<div id="footer">
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

</div>
<!-- / container -->

<xsl:comment> com.omniupdate.div label="javascripts" group="secure" button="707" path="/_resources/includes/javascripts.html" </xsl:comment>
<xsl:processing-instruction name="php">
include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/javascripts.html");
</xsl:processing-instruction>
<xsl:comment> /com.omniupdate.div </xsl:comment>

<!--twitter javascript -->
<xsl:if test="document/config/sidebar-widgets/parameter[@name='twitter-widget']/option[@value='disabled']/@selected!='true'">
	<script src="http://twitter.com/javascripts/blogger.js" type="text/javascript">//</script>
	<script src="http://twitter.com/statuses/user_timeline/{document/config/sidebar-widgets/parameter[@name='twitter-widget']/option[@selected='true']/@value}.json?callback=twitterCallback2&amp;count={document/config/sidebar-widgets/parameter[@name='twitter-count']/option[@selected='true']/@value}" type="text/javascript">//</script>
</xsl:if>
<!-- these scripts need to be inserted only on pages that have a twitter feed enabled. "pioneerdeb" and "count=4" need to be variables -->

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

<xsl:template name="standard-interior">
	<div>
		<xsl:choose>
			<xsl:when test="$pagetype ='overview'">
				<xsl:attribute name="class">landing-overview</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">content-copy</xsl:attribute>					
			</xsl:otherwise>
		</xsl:choose>
		<xsl:copy-of select="document/maincontent/page-title/node()" />
		<xsl:copy-of select="document/maincontent/interior/node()" />			
	</div>
	
	<!-- Student Spotlight: program listing -->
	<xsl:if test="document/config/parameter[@name='student-spotlight']/option[@value='true']/@selected='true'">
		<hr />
		<xsl:if test="$ou:action = 'edt'"><div style="display:none;"><xsl:copy-of select="document/maincontent/student-spotlight/node()" /></div></xsl:if>
		<div class="student-spotlight">
			<xsl:copy-of select="document/maincontent/student-spotlight/image/img" />
			<h3>Student Spotlight</h3>
			<blockquote><p class="">&quot;<xsl:copy-of select="document/maincontent/student-spotlight/quote/text()" />&quot;</p></blockquote>
			<p>- <xsl:copy-of select="document/maincontent/student-spotlight/name/text()" /><br /><em><xsl:copy-of select="document/maincontent/student-spotlight/info/text()" /></em></p>		
		</div>
	</xsl:if>					
	
	<!-- Second interior: program listing (add catalog class), office landing -->
	<xsl:if test="document/maincontent/interior2">
		<hr />
		<div class="content-copy">
			<xsl:if test="$pagetype = 'programs'">
				<xsl:attribute name="class">content-copy catalog</xsl:attribute>
			</xsl:if>
			<xsl:copy-of select="document/maincontent/interior2/node()"/>
		</div>
	</xsl:if>			
	
	<!-- Bullet list: audience landing -->
	<xsl:if test="document/maincontent/bullet-list">
		<div class="bullet-list">
			<xsl:copy-of select="document/maincontent/bullet-list/node()" />
		</div>
		<!-- / interior-content-bullet -->
		<hr />
	</xsl:if>	
</xsl:template>

<xsl:template name="news-item-interior">
	<div id="news-article">
		<div id="news-text">
			<xsl:copy-of select="document/maincontent/page-title/node()" />

			<xsl:choose>
				<xsl:when test="$ou:action = 'edt'">
					<xsl:copy-of select="document/maincontent/image/node()" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:if test="document/maincontent/image/img/@src != '' ">
						<xsl:copy-of select="document/maincontent/image/node()" />
					</xsl:if>
				</xsl:otherwise>	
			</xsl:choose>

			<h3><xsl:value-of select="document/maincontent/title" /></h3>
			<p class="date"><xsl:value-of select="document/maincontent/date" /></p>
			<p class="intro"><xsl:value-of select="document/maincontent/intro" /></p>

			<div class="content-copy">
				<xsl:copy-of select="document/maincontent/interior/node()" />			
				<xsl:copy-of select="document/maincontent/interior2/node()"/>

				<p class="contact-info"><strong>Contact:</strong><br />
				<xsl:copy-of select="document/maincontent/contact/node()" />
				</p>
			</div>
		</div>
		
		<hr />
					
		<div id="tags">
			<h3>Tags</h3>
			<xsl:comment> com.omniupdate.div label="tags" path="/_resources/includes/tags.html" </xsl:comment>
				<xsl:processing-instruction name="php">
						include($_SERVER['DOCUMENT_ROOT'] . "/_resources/includes/tags.html");
				</xsl:processing-instruction>
			<xsl:comment> /com.omniupdate.div </xsl:comment>
		</div>
		<!-- / tags -->		
	</div>
	<div id="news-info">
		<p><strong>Tags:</strong> <a href="#">Academics</a>, <a href="#">Visual Arts</a></p>
		<div class="share">
			<!-- AddThis Button BEGIN -->
			<div class="addthis_toolbox addthis_default_style ">
				<a class="addthis_button_preferred_1">&nbsp;</a>
				<a class="addthis_button_preferred_2">&nbsp;</a>
				<a class="addthis_button_preferred_3">&nbsp;</a>
				<a class="addthis_button_preferred_4">&nbsp;</a>
				<a class="addthis_button_compact">&nbsp;</a>
				<a class="addthis_counter addthis_bubble_style">&nbsp;</a>
			</div>
			<script type="text/javascript">var addthis_config = {"data_track_clickback":true};</script>
			<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4dbdb9db00674dc5">//</script>
			<!-- AddThis Button END -->
		</div>
	</div>
</xsl:template>


</xsl:stylesheet>
