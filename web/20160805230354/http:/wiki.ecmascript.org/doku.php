<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
<head><script src="//archive.org/includes/athena.js" type="text/javascript"></script>
<script type="text/javascript">window.addEventListener('DOMContentLoaded',function(){var v=archive_analytics.values;v.service='wb';v.server_name='wwwb-app221.us.archive.org';v.server_ms=268;archive_analytics.send_pageview({});});</script>
<script type="text/javascript" src="https://web-static.archive.org/_static/js/bundle-playback.js?v=2N_sDSC0" charset="utf-8"></script>
<script type="text/javascript" src="https://web-static.archive.org/_static/js/wombat.js?v=txqj7nKC" charset="utf-8"></script>
<script>window.RufflePlayer=window.RufflePlayer||{};window.RufflePlayer.config={"autoplay":"on","unmuteOverlay":"hidden","showSwfDownload":true};</script>
<script type="text/javascript" src="https://web-static.archive.org/_static/js/ruffle/ruffle.js"></script>
<script type="text/javascript">
    __wm.init("https://web.archive.org/web");
  __wm.wombat("http://wiki.ecmascript.org/doku.php?id=strawman:array_statics","20160805230354","https://web.archive.org/","web","https://web-static.archive.org/_static/",
	      "1470438234");
</script>
<link rel="stylesheet" type="text/css" href="https://web-static.archive.org/_static/css/banner-styles.css?v=1utQkbB3" />
<link rel="stylesheet" type="text/css" href="https://web-static.archive.org/_static/css/iconochive.css?v=3PDvdIFv" />
<!-- End Wayback Rewrite JS Include -->

  <title>strawman:array_statics [ES Wiki]</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <meta name="generator" content="DokuWiki Release 2005-09-22e"/>
  <link rel="start" href="/"/>
  <link rel="contents" href="/doku.php?id=strawman:array_statics&amp;do=index" title=""/>
  <link rel="alternate" type="application/rss+xml" title="Recent Changes" href="/web/20160805230354/http://wiki.ecmascript.org/feed.php"/>
  <link rel="alternate" type="application/rss+xml" title="Current Namespace" href="/web/20160805230354/http://wiki.ecmascript.org/feed.php?mode=list&amp;ns=strawman"/>
  <link rel="alternate" type="text/html" title="Plain HTML" href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics&amp;do=export_html"/>
  <link rel="alternate" type="text/plain" title="Wiki Markup" href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics&amp;do=export_raw"/>
  <link rel="stylesheet" media="screen" type="text/css" href="/web/20160805230354cs_/http://wiki.ecmascript.org/lib/styles/style.css"/>
  <meta name="date" content="2011-03-13T21:49:06+0000"/>
  <meta name="robots" content="index,follow"/>
  <script language="javascript" type="text/javascript" charset="utf-8">
    var alertText   = 'Please enter the text you want to format.\nIt will be appended to the end of the document.'
    var notSavedYet = 'Unsaved changes will be lost.\nReally continue?'
    var DOKU_BASE   = '/'
  </script>
  <script language="javascript" type="text/javascript" charset="utf-8" src="/web/20160805230354js_/http://wiki.ecmascript.org/lib/scripts/script.js"></script>
  <script language="javascript" type="text/javascript" charset="utf-8" src="/web/20160805230354js_/http://wiki.ecmascript.org/lib/scripts/tw-sack.js"></script>
  <script language="javascript" type="text/javascript" charset="utf-8" src="/web/20160805230354js_/http://wiki.ecmascript.org/lib/scripts/ajax.js"></script>
  <script language="javascript" type="text/javascript" charset="utf-8" src="/web/20160805230354js_/http://wiki.ecmascript.org/lib/scripts/domLib.js"></script>
  <script language="javascript" type="text/javascript" charset="utf-8" src="/web/20160805230354js_/http://wiki.ecmascript.org/lib/scripts/domTT.js"></script>
  <link rel="stylesheet" type="text/css" href="/web/20160805230354cs_/http://wiki.ecmascript.org/lib/plugins/plugin/style.css"/>

  <link rel="shortcut icon" href="/web/20160805230354im_/http://wiki.ecmascript.org/lib/images/favicon.ico"/>
  <link rel="stylesheet" media="screen" type="text/css" href="/web/20160805230354cs_/http://wiki.ecmascript.org/lib/tpl/default/layout.css"/>
  <link rel="stylesheet" media="screen" type="text/css" href="/web/20160805230354cs_/http://wiki.ecmascript.org/lib/tpl/default/design.css"/>

  
  <link rel="stylesheet" media="print" type="text/css" href="/web/20160805230354cs_/http://wiki.ecmascript.org/lib/tpl/default/print.css"/>

  <!--[if gte IE 5]>
  <style type="text/css">
    /* that IE 5+ conditional comment makes this only visible in IE 5+ */
    /* IE bugfix for transparent PNGs */
    //DISABLED   img { behavior: url("/lib/scripts/pngbehavior.htc"); }
  </style>
  <![endif]-->

  </head>

<body><!-- BEGIN WAYBACK TOOLBAR INSERT -->
<script>__wm.rw(0);</script>
<div id="wm-ipp-base" lang="en" style="display:none;direction:ltr;" toolbar-mode="auto">
<div id="wm-ipp" style="position:fixed;left:0;top:0;right:0;">
<div id="donato" style="position:relative;width:100%;height:0;">
  <div id="donato-base">
    <iframe id="donato-if" src="https://archive.org/includes/donate.php?as_page=1&amp;platform=wb&amp;referer=https%3A//web.archive.org/web/20160805230354/http%3A//wiki.ecmascript.org/doku.php%3Fid%3Dstrawman%3Aarray_statics"
	    scrolling="no" frameborder="0" style="width:100%; height:100%">
    </iframe>
  </div>
</div><div id="wm-ipp-inside">
  <div id="wm-toolbar" style="position:relative;display:flex;flex-flow:row nowrap;justify-content:space-between;" nav="async">
    <div id="wm-logo" style="/*width:110px;*/padding-top:12px;">
      <a href="/web/" title="Wayback Machine home page"><img src="https://web-static.archive.org/_static/images/toolbar/wayback-toolbar-logo-200.png" srcset="https://web-static.archive.org/_static/images/toolbar/wayback-toolbar-logo-100.png, https://web-static.archive.org/_static/images/toolbar/wayback-toolbar-logo-150.png 1.5x, https://web-static.archive.org/_static/images/toolbar/wayback-toolbar-logo-200.png 2x" alt="Wayback Machine" style="width:100px" border="0" /></a>
    </div>
    <div class="c" style="display:flex;flex-flow:column nowrap;justify-content:space-between;flex:1;">
      <form class="u" style="display:flex;flex-direction:row;flex-wrap:nowrap;" target="_top" method="get" action="/web/submit" name="wmtb" id="wmtb"><input type="text" name="url" id="wmtbURL" value="http://wiki.ecmascript.org/doku.php?id=strawman:array_statics" onfocus="this.focus();this.select();" style="flex:1;"/><input type="hidden" name="type" value="replay" /><input type="hidden" name="date" value="20160805230354" /><input type="submit" value="Go" />
      </form>
      <div style="display:flex;flex-flow:row nowrap;align-items:flex-end;">
                <div class="s" id="wm-nav-captures" style="flex:1;">
                    <a class="t" href="/web/20160805230354*/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics" title="See a list of every capture for this URL">14 captures</a>
          <div class="r" title="Timespan for captures of this URL">06 Dec 2011 - 05 Aug 2016</div>
          </div>
        <div class="k">
          <a href="" id="wm-graph-anchor">
            <div id="wm-ipp-sparkline" title="Explore captures for this URL" style="position: relative">
              <canvas id="wm-sparkline-canvas" width="775" height="27" border="0"></canvas>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="n">
      <table>
        <tbody>
          <!-- NEXT/PREV MONTH NAV AND MONTH INDICATOR -->
          <tr class="m">
            <td class="b" nowrap="nowrap">Jul</td>
            <td class="c" id="displayMonthEl" title="You are here: 23:03:54 Aug 05, 2016">AUG</td>
            <td class="f" nowrap="nowrap">Sep</td>
          </tr>
          <!-- NEXT/PREV CAPTURE NAV AND DAY OF MONTH INDICATOR -->
          <tr class="d">
            <td class="b" nowrap="nowrap"><span class="ta"></span></td>
            <td class="c" id="displayDayEl" style="width:34px;font-size:22px;white-space:nowrap;" title="You are here: 23:03:54 Aug 05, 2016">05</td>
            <td class="f" nowrap="nowrap"><span class="ta"></span></td>
          </tr>
          <!-- NEXT/PREV YEAR NAV AND YEAR INDICATOR -->
          <tr class="y">
            <td class="b" nowrap="nowrap">2015</td>
            <td class="c" id="displayYearEl" title="You are here: 23:03:54 Aug 05, 2016">2016</td>
            <td class="f" nowrap="nowrap">2017</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="r" style="display:flex;flex-flow:column nowrap;align-items:flex-end;justify-content:space-between;">
      <div id="wm-btns" style="text-align:right;height:23px;">
                <span class="xxs">
          <div id="wm-save-snapshot-success">success</div>
          <div id="wm-save-snapshot-fail">fail</div>
          <a id="wm-save-snapshot-open" href="#" title="Share via My Web Archive" >
            <span class="iconochive-web"></span>
          </a>
          <a href="https://archive.org/account/login.php" title="Sign In" id="wm-sign-in">
            <span class="iconochive-person"></span>
          </a>
          <span id="wm-save-snapshot-in-progress" class="iconochive-web"></span>
        </span>
                <a class="xxs" href="https://help.archive.org/help/category/the-wayback-machine/" title="Get some help using the Wayback Machine" style="top:-6px;"><span class="iconochive-question" style="color:rgb(87,186,244);font-size:160%;"></span></a>
        <a id="wm-tb-close" href="#close" style="top:-2px;" title="Close the toolbar"><span class="iconochive-remove-circle" style="color:#888888;font-size:240%;"></span></a>
      </div>
      <div id="wm-share" class="xxs">
        <a href="/web/20160805230354/http://web.archive.org/screenshot/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics"
           id="wm-screenshot"
           title="screenshot">
          <span class="wm-icon-screen-shot"></span>
        </a>
        <a href="#" id="wm-video" title="video">
          <span class="iconochive-movies"></span>
        </a>
        <a id="wm-share-facebook" href="#" data-url="https://web.archive.org/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics" title="Share on Facebook" style="margin-right:5px;" target="_blank"><span class="iconochive-facebook" style="color:#3b5998;font-size:160%;"></span></a>
        <a id="wm-share-twitter" href="#" data-url="https://web.archive.org/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics" title="Share on Twitter" style="margin-right:5px;" target="_blank"><span class="iconochive-twitter" style="color:#1dcaff;font-size:160%;"></span></a>
      </div>
      <div style="padding-right:2px;text-align:right;white-space:nowrap;">
        <a id="wm-expand" class="wm-btn wm-closed" href="#expand"><span id="wm-expand-icon" class="iconochive-down-solid"></span> <span class="xxs" style="font-size:80%;">About this capture</span></a>
      </div>
    </div>
  </div>
    <div id="wm-capinfo" style="border-top:1px solid #777;display:none; overflow: hidden">
        <div id="wm-capinfo-notice" source="api"></div>
                <div id="wm-capinfo-collected-by">
    <div style="background-color:#666;color:#fff;font-weight:bold;text-align:center;padding:2px 0;">COLLECTED BY</div>
    <div style="padding:3px;position:relative" id="wm-collected-by-content">
            <div style="display:inline-block;vertical-align:top;width:50%;">
			<span class="c-logo" style="background-image:url(https://archive.org/services/img/webwidecrawl);"></span>
		Organization: <a style="color:#33f;" href="https://archive.org/details/webwidecrawl" target="_new"><span class="wm-title">Internet Archive</span></a>
		<div style="max-height:75px;overflow:hidden;position:relative;">
	  <div style="position:absolute;top:0;left:0;width:100%;height:75px;background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,255) 100%);"></div>
	  The Internet Archive discovers and captures web pages through many different web crawls.

At any given time several distinct crawls are running, some for months, and some every day or longer.

View the web archive through the <a href="http://archive.org/web/web.php">Wayback Machine</a>.
	</div>
	      </div>
      <div style="display:inline-block;vertical-align:top;width:49%;">
			<span class="c-logo" style="background-image:url(https://archive.org/services/img/hackernews00000)"></span>
		<div>Collection: <a style="color:#33f;" href="https://archive.org/details/hackernews00000" target="_new"><span class="wm-title">Hackernews crawl number 0</span></a></div>
		<div style="max-height:75px;overflow:hidden;position:relative;">
	  <div style="position:absolute;top:0;left:0;width:100%;height:75px;background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,255) 100%);"></div>
	  Hacker News Crawl of their links.
	</div>
	      </div>
    </div>
    </div>
    <div id="wm-capinfo-timestamps">
    <div style="background-color:#666;color:#fff;font-weight:bold;text-align:center;padding:2px 0;" title="Timestamps for the elements of this page">TIMESTAMPS</div>
    <div>
      <div id="wm-capresources" style="margin:0 5px 5px 5px;max-height:250px;overflow-y:scroll !important"></div>
      <div id="wm-capresources-loading" style="text-align:left;margin:0 20px 5px 5px;display:none"><img src="https://web-static.archive.org/_static/images/loading.gif" alt="loading" /></div>
    </div>
    </div>
  </div></div></div></div><div id="wm-ipp-print">The Wayback Machine - https://web.archive.org/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics</div>
<script type="text/javascript">//<![CDATA[
__wm.bt(775,27,25,2,"web","http://wiki.ecmascript.org/doku.php?id=strawman:array_statics","20160805230354",1996,"https://web-static.archive.org/_static/",["https://web-static.archive.org/_static/css/banner-styles.css?v=1utQkbB3","https://web-static.archive.org/_static/css/iconochive.css?v=3PDvdIFv"], false);
  __wm.rw(1);
//]]></script>
<!-- END WAYBACK TOOLBAR INSERT -->
 
<div class="dokuwiki">
  
  <div class="stylehead">

    <div class="header">
      <div class="pagename">
        [[<a href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics&amp;do=backlink" onclick="return svchk()" onkeypress="return svchk()">strawman:array_statics</a>]]
      </div>
      <div class="logo">
        <a href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=" onclick="return svchk()" onkeypress="return svchk()" name="top" accesskey="h" title="[ALT+H]">ES Wiki</a>      </div>
    </div>
  
    
    <div class="bar" id="bar_top">
      <div class="bar-left" id="bar_topleft">
        <form class="button" method="post" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="edit"/><input type="hidden" name="rev" value=""/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Show pagesource" class="button" title="ALT+V" accesskey="v"/></form>        <form class="button" method="get" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="revisions"/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Old revisions" class="button" title="ALT+O" accesskey="o"/></form>      </div>
  
      <div class="bar-right" id="bar_topright">
        <form class="button" method="get" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="recent"/><input type="hidden" name="id" value=""/><input type="submit" value="Recent changes" class="button" title="ALT+R" accesskey="r"/></form>        <form action="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=" accept-charset="utf-8" class="search" name="search" onsubmit="return svchk()"><input type="hidden" name="do" value="search"/><input type="text" id="qsearch_in" accesskey="f" name="id" class="edit" onkeyup="ajax_qsearch.call('qsearch_in','qsearch_out')"/><input type="submit" value="Search" class="button"/><div id="qsearch_out" class="ajax_qsearch" onclick="this.style.display='none'"></div></form>&nbsp;
      </div>
    </div>

        <div class="breadcrumbs">
      Trace: <span class="bcsep">&raquo;</span> <span class="curid"><a href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:array_statics" onclick="return svchk()" onkeypress="return svchk()" class="breadcrumbs" title="strawman:array_statics">array_statics</a></span>          </div>
    
  </div>
  
  
  <div class="page">
    <!-- wikipage start -->
    
<a name="array_statics"></a><h2>Array statics</h2>
<div class="level2">

<p>
 Some of the generic array methods would work just fine on array-like objects (such as <code>arguments</code> objects, <acronym title="Document Object Model">DOM</acronym> sequences, or strings), but right now you have to use <code>[].method.call(x, ...)</code> or <code>Array.prototype.method.call(x, xxx)</code> which is unwieldy and confusing. This strawman proposes adding static versions of those methods, which take the array-like object as the explicit first parameter. This would work for all the array methods, resulting in the following additional methods: 
</p>
<ul>
<li class="level1"><div class="li"> <code>Array.map</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.reduce</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.reduceRight</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.filter</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.forEach</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.every</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.some</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.reverse</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.indexOf</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.lastIndexOf</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.concat</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.slice</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.splice</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.shift</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.unshift</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.sort</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.push</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.pop</code></div>
</li>
<li class="level1"><div class="li"> <code>Array.join</code></div>
</li>
</ul>

<p>
 In each case, the method <code>Array.foo</code> behaves the same as:
</p>
<pre class="code javascript">Array.<span class="me1">foo</span> = <span class="kw2">function</span><span class="br0">&#40;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span>
    <span class="kw2">var</span> x = <span class="br0">&#91;</span><span class="br0">&#93;</span>.<span class="me1">shift</span>.<span class="me1">call</span><span class="br0">&#40;</span>arguments<span class="br0">&#41;</span>;
    <span class="kw1">return</span> <span class="br0">&#91;</span><span class="br0">&#93;</span>.<span class="me1">foo</span>.<span class="me1">apply</span><span class="br0">&#40;</span>x, arguments<span class="br0">&#41;</span>;
<span class="br0">&#125;</span></pre>
<p>
Note that some of these operations return a new array; so for example, calling <code>Array.map</code> on a string returns an array.
</p>

<p>
 &mdash; <em><a href="https://web.archive.org/web/20160805230354/mailto:%26%23x64%3B%26%23x68%3B%26%23x65%3B%26%23x72%3B%26%23x6d%3B%26%23x61%3B%26%23x6e%3B%26%23x40%3B%26%23x63%3B%26%23x63%3B%26%23x73%3B%26%23x2e%3B%26%23x6e%3B%26%23x65%3B%26%23x75%3B%26%23x2e%3B%26%23x65%3B%26%23x64%3B%26%23x75%3B" class="mail" title="dherman@ccs.neu.edu">Dave Herman</a> 2011/03/13 19:01</em> 
</p>
<hr noshade="noshade" size="1"/>

<p>
As perpetrator of these &ldquo;static generic&rdquo; <code>Array</code> methods in SpiderMonkey, I want to write a couple of comments: 
</p>
<ul>
<li class="level1"><div class="li"> These are &ldquo;easy&rdquo; to implement via a shared re-dispatching layer, which suggests something even more general for &ldquo;uncurrying <code>this</code>&ldquo;.</div>
</li>
<li class="level1"><div class="li"> Putting them in <code>Array</code> was a poor-person&rsquo;s-module-system precursor &ndash; can we do better via <a href="/web/20160805230354/http://wiki.ecmascript.org/doku.php?id=strawman:simple_modules" class="wikilink1" title="strawman:simple_modules" onclick="return svchk()" onkeypress="return svchk()">simple modules</a>? After all these generics work on array-likes not just <code>Array</code> instances.</div>
</li>
<li class="level1"><div class="li"> Some may object to the same name for methods of different arity and <code>this</code>-ness. It didn&rsquo;t stop me and I haven&rsquo;t heard any complaints from users, but these are Mozilla-specific and may well be under-used.</div>
</li>
</ul>

<p>
  &mdash; <em><a href="https://web.archive.org/web/20160805230354/mailto:%26%23x62%3B%26%23x72%3B%26%23x65%3B%26%23x6e%3B%26%23x64%3B%26%23x61%3B%26%23x6e%3B%26%23x40%3B%26%23x6d%3B%26%23x6f%3B%26%23x7a%3B%26%23x69%3B%26%23x6c%3B%26%23x6c%3B%26%23x61%3B%26%23x2e%3B%26%23x6f%3B%26%23x72%3B%26%23x67%3B" class="mail" title="brendan@mozilla.org">Brendan Eich</a> 2011/03/13 21:44</em> 
</p>

</div>

<!-- cachefile /usr/local/www/es-lang.org/wiki/data/cache/5/517ae1030bbd54c26820ebe857dbb036.xhtml used -->
    <!-- wikipage stop -->
  </div>

  <div class="clearer">&nbsp;</div>

  
  <div class="stylefoot">

    <div class="meta">
      <div class="user">
              </div>
      <div class="doc">
        strawman/array_statics.txt &middot; Last modified: 2011/03/13 21:49 by brendan      </div>
    </div>

   
    <div class="bar" id="bar_bottom">
      <div class="bar-left" id="bar_bottomleft">
        <form class="button" method="post" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="edit"/><input type="hidden" name="rev" value=""/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Show pagesource" class="button" title="ALT+V" accesskey="v"/></form>        <form class="button" method="get" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="revisions"/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Old revisions" class="button" title="ALT+O" accesskey="o"/></form>      </div>
      <div class="bar-right" id="bar_bottomright">
                        <form class="button" method="get" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="login"/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Login" class="button"/></form>        <form class="button" method="get" action="/web/20160805230354/http://wiki.ecmascript.org/doku.php" onsubmit="return svchk()"><input type="hidden" name="do" value="index"/><input type="hidden" name="id" value="strawman:array_statics"/><input type="submit" value="Index" class="button" title="ALT+X" accesskey="x"/></form>        <a href="#top"><input type="button" class="button" value="Back to top" onclick="window.scrollTo(0, 0)"/></a>&nbsp;
      </div>
    </div>

  </div>

</div>

<div align="center" class="footerinc">
  <a target="_blank" href="/web/20160805230354/http://wiki.ecmascript.org/feed.php" title="Recent changes RSS feed"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-rss.png" width="80" height="15" alt="Recent changes RSS feed" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/http://creativecommons.org/licenses/by-nc-sa/2.0/" rel="license" title="Creative Commons License"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-cc.gif" width="80" height="15" alt="Creative Commons License" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/https://www.paypal.com/xclick/business=andi%40splitbrain.org&amp;item_name=DokuWiki+Donation&amp;no_shipping=1&amp;no_note=1&amp;tax=0&amp;currency_code=EUR&amp;lc=US" title="Donate"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-donate.gif" alt="Donate" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/http://www.php.net/" title="Powered by PHP"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-php.gif" width="80" height="15" alt="Powered by PHP" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/http://validator.w3.org/check/referer" title="Valid XHTML 1.0"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-xhtml.png" width="80" height="15" alt="Valid XHTML 1.0" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/http://jigsaw.w3.org/css-validator/check/referer" title="Valid CSS"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-css.png" width="80" height="15" alt="Valid CSS" border="0"/></a>

  <a target="_blank" href="https://web.archive.org/web/20160805230354/http://wiki.splitbrain.org/wiki:dokuwiki" title="Driven by DokuWiki"><img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/tpl/default/images/button-dw.png" width="80" height="15" alt="Driven by DokuWiki" border="0"/></a>



<!--

<rdf:RDF xmlns="http://web.resource.org/cc/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<Work rdf:about="">
   <dc:type rdf:resource="http://purl.org/dc/dcmitype/Text" />
   <license rdf:resource="http://creativecommons.org/licenses/by-nc-sa/2.0/" />
</Work>

<License rdf:about="http://creativecommons.org/licenses/by-nc-sa/2.0/">
   <permits rdf:resource="http://web.resource.org/cc/Reproduction" />
   <permits rdf:resource="http://web.resource.org/cc/Distribution" />
   <requires rdf:resource="http://web.resource.org/cc/Notice" />
   <requires rdf:resource="http://web.resource.org/cc/Attribution" />
   <prohibits rdf:resource="http://web.resource.org/cc/CommercialUse" />
   <permits rdf:resource="http://web.resource.org/cc/DerivativeWorks" />
   <requires rdf:resource="http://web.resource.org/cc/ShareAlike" />
</License>

</rdf:RDF>

-->
</div>

<img src="/web/20160805230354im_/http://wiki.ecmascript.org/lib/exe/indexer.php?id=strawman%3Aarray_statics&amp;1470438040" width="1" height="1" alt=""/></body>
</html>
<!--
     FILE ARCHIVED ON 23:03:54 Aug 05, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:12:42 Apr 17, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
-->
<!--
playback timings (ms):
  captures_list: 0.413
  exclusion.robots: 0.031
  exclusion.robots.policy: 0.025
  esindex: 0.007
  cdx.remote: 18.521
  LoadShardBlock: 123.423 (3)
  PetaboxLoader3.datanode: 71.463 (4)
  PetaboxLoader3.resolve: 108.33 (2)
  load_resource: 104.253
  nav: 0.124 (6)
-->