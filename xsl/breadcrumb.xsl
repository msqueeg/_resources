<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:xs="http://www.w3.org/2001/XMLSchema" 
	xmlns:ou="http://omniupdate.com/XSL/Variables" 
	exclude-result-prefixes="xs ou">

<xsl:variable name="root" as="xs:string" select="concat($ou:root,$ou:site)" />
<xsl:variable name="file" as="xs:string">_breadcrumb.xml</xsl:variable>

<xsl:template name="bc">
	<!-- initiates parameters, sets a default value if no parameters were passed in -->
	<xsl:param name="path" as="xs:string">/</xsl:param>
	<xsl:param name="title" as="xs:string">New Page</xsl:param>
	
	<xsl:call-template name="bc-folders">
		<xsl:with-param name="path" select="$path"/>
	</xsl:call-template>

	<xsl:if test="not(contains($ou:filename,'index.php'))">
		<a href="{$ou:filename}"><xsl:value-of select="$title"/></a>
	</xsl:if>
</xsl:template>

<xsl:template name="bc-folders">
	<xsl:param name="path" as="xs:string" required="yes"/>
	
	<!-- Check if the current path has parent directories. If it does, send the path of the parent directory to the template again. -->
	<xsl:if test="$path != '/'">
		<xsl:variable name="list" select="tokenize(substring($path, 2), '/')"/>
		<xsl:variable name="parent" select="concat('/', string-join(remove($list, count($list)), '/'))"/>
		<xsl:call-template name="bc-folders">
			<xsl:with-param name="path" select="$parent"/>
		</xsl:call-template>
	</xsl:if>
	
	<xsl:variable name="href" select="if ($path = '/') then $path else concat($path, '/')"/>
	
	<xsl:choose>
		<xsl:when test="$path = '/'">
				<a href="{$href}"><xsl:value-of select="doc(concat($root, $href, $file))/directory/title/text()"/></a> /
		</xsl:when>
		<xsl:otherwise>
				<a href="{$href}"><xsl:value-of select="doc(concat($root, $href, $file))/directory/title/text()"/></a> /
		</xsl:otherwise>
	</xsl:choose>
	
</xsl:template>

</xsl:stylesheet>

