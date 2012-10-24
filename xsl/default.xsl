<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://commons.omniupdate.com/dtd/standard.dtd">
<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ou="http://omniupdate.com/XSL/Variables"
	exclude-result-prefixes="ou">
	
<xsl:import href="home.xsl" />			      
<xsl:import href="form.xsl" />

<xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />

<!-- Initialize OU Variables -->
<xsl:param name="ou:action" />
<xsl:param name="ou:dirname" />
<xsl:param name="ou:filename" />
<xsl:param name="ou:httproot" />
<xsl:param name="ou:path" />
<xsl:param name="ou:root" />
<xsl:param name="ou:site" />

<!-- left navigation -->
<xsl:param name="ou:leftnav" />
<xsl:param name="leftnav">
	<xsl:value-of select="concat('/_resources/navigation/',substring-before($ou:leftnav,'.'),'.inc')" />
</xsl:param>

<!-- Parameters used by imported stylesheets -->
<xsl:param name="dirname">
	<xsl:choose>
		<xsl:when test="string-length($ou:dirname) = 1">
			<xsl:value-of select="$ou:dirname" />
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="concat($ou:dirname,'/')" />
		</xsl:otherwise>
	</xsl:choose>
</xsl:param>

<xsl:param name="pagetype" select="/document/config/parameter[@name='pagetype']" />
	
<!-- Determine which xsl template to call -->
<xsl:template match="/">
	<xsl:choose>
		<xsl:when test="$pagetype != 'homepage'">
			<xsl:call-template name="interior" />
		</xsl:when>
		<xsl:otherwise>
			<xsl:call-template name="home" />
		</xsl:otherwise>
	</xsl:choose>	
</xsl:template>


</xsl:stylesheet>
