<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:ou="http://omniupdate.com/XSL/Variables"
  exclude-result-prefixes="xs ou"><!--
<xsl:output method="html" version="4.01" indent="yes" encoding="UTF-8"/>
<xsl:output doctype-public="-//W3C//DTD HTML 4.01//EN"/>
<xsl:output doctype-system="http://www.w3.org/TR/html4/strict.dtd"/>
-->
<xsl:output omit-xml-declaration="yes" indent="yes" />
<xsl:strip-space elements="*" />

<xsl:param name="ou:action"/>
<xsl:param name="ou:root"/>
<xsl:param name="ou:site"/>
<xsl:variable name="root" as="xs:string" select="concat($ou:root, $ou:site)"/>

<!-- list of excluded directory names for listing; syntax= 'dir1,dir2,dir3,...' -->
<xsl:variable name="excluded-dirs" as="xs:string" select="'_resources/,files/,images/,includes/,_recyclebin/,OMNI-ASSETS/'" />

<xsl:template match="/">
<xsl:variable name="dir" as="xs:string"><xsl:value-of select="substring-before(document/directory, '/index')" /></xsl:variable>
<xsl:variable name="path" as="xs:string" select="concat($root,$dir)" />
	<div id="interior-nav">
		<ul>
			<xsl:call-template name="includes">
				<xsl:with-param name="incpath" select="$path" />
			</xsl:call-template>
	
			<xsl:for-each select="doc($path)/list/directory">
			<xsl:sort />
				 <xsl:call-template name="directory">
				 	<xsl:with-param name="curpath" select="$path" /> 
				 </xsl:call-template>
			</xsl:for-each>
		</ul>
	</div>
 <!-- begin the spider -->

</xsl:template>

<xsl:template name="directory">
	<xsl:param name="curpath" />
	<xsl:variable name="newdir" select="."/>
	
	<xsl:choose>
		<!-- test to see if the directory is not in the excluded list -->		
		<xsl:when test="not(contains($excluded-dirs, $newdir))">
			<li>
				<xsl:call-template name='outputdir'>
					<xsl:with-param name='dirname' select="$newdir" />
					<xsl:with-param name='dirpath' select="concat($curpath,'/',$newdir)" />
				</xsl:call-template>
				

				<xsl:if test="(doc(concat($curpath,'/',$newdir))/list/directory[1] ne '') or (contains(string-join(doc(concat($curpath,'/',$newdir))/list/file,','),'_sidenav.inc'))">
						<ul class="submenu">
							<!-- test to see if include file exists, include it -->
							<xsl:if test="contains(string-join(doc(concat($curpath,'/',$newdir))/list/file,','),'_sidenav.inc')">
								<xsl:call-template name="includes">
									<xsl:with-param name="incpath" select="concat($curpath,'/',$newdir)" />
								</xsl:call-template>
							</xsl:if>
		
							<!-- test to see if there are any more directorys below current one. if there are, run template again -->
							<xsl:if test="doc(concat($curpath,'/',$newdir))/list/directory[1] ne ''">
								
								<xsl:for-each select="doc(concat($curpath,'/',$newdir))/list/directory">
									<xsl:sort />
									<xsl:call-template name="directory">
										<xsl:with-param name="curpath" select="concat($curpath,'/',$newdir)" /> 
									</xsl:call-template>
								</xsl:for-each>
							
							</xsl:if>
						</ul>
				</xsl:if>				
			</li>
		</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template name="includes">
	<xsl:param name="incpath" />
	<xsl:variable name="inc" select="concat(substring-after($incpath,$root),'/_sidenav.inc')" />
	<xsl:variable name="curpos"  select="normalize-space(position() cast as xs:string)" />
			<xsl:comment> com.omniupdate.div group="Everyone" label="<xsl:value-of select='$inc'/>" button="768" path="<xsl:value-of select='$inc' />"</xsl:comment>
				<xsl:processing-instruction name="php">
					include($_SERVER['DOCUMENT_ROOT'] . "<xsl:value-of select='$inc' />");
				</xsl:processing-instruction>
			<xsl:comment> /com.omniupdate.div </xsl:comment>
</xsl:template>

<xsl:template name="outputdir">
	<xsl:param name="dirpath" />
	<xsl:param name="dirname" />

	<xsl:variable name="bctest" select="doc($dirpath)/list"/>

	<xsl:choose>
		<!-- check to see if breadcrumb file exists; if it does, open it up and pull the value of the title node -->
		<xsl:when test="$bctest/file[. = '_breadcrumb.xml']">
				<a>
					<xsl:attribute name="href">
						<xsl:value-of select="concat(substring-after($dirpath,$root),'/index.php')" />
					</xsl:attribute>
					<xsl:value-of select="normalize-space(document(concat($dirpath,'/_breadcrumb.xml'))/directory/title)" />
				</a>
		</xsl:when>
		<!-- breadcrumb file does not exist, use directory name -->
		<xsl:otherwise>
				<a>
					<xsl:attribute name="href">
						<xsl:value-of select="concat(substring-after($dirpath,$root),'/index.php')" />
					</xsl:attribute>
					<xsl:value-of select="$dirname" />
				</a>
		</xsl:otherwise>
	</xsl:choose>

</xsl:template>

<xsl:template match="file">
<!--  File: <xsl:value-of select="."/><br/> -->
</xsl:template>

</xsl:stylesheet>
