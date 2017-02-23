function getBaseDomain()
{
  var domain = document.domain;
  var ifirst= domain.indexOf(".");
  domain=domain.substring(ifirst+1);		
  return domain;
}

// for netcrm the appdomain is netsuite, perform this replacement.
function getAppDomain()
{
  var domain = getBaseDomain();
  var iCRM=domain.indexOf("netcrm");
  if (iCRM != -1)
        domain=domain.substring(0,iCRM)+"netsuite"+domain.substring(iCRM+6);
  return domain;
}


function getQueryParameter(param)
{
  var idx = document.URL.indexOf(param+"=");
  if (idx != -1)
  {
    var sidx = idx+param.length+1;
    var len = document.URL.substring(sidx).indexOf("&");
    if (len == -1)
      return document.URL.substring(sidx);
    else
      return document.URL.substring(sidx, sidx+len);
  }
  else
    return null;
}

function getCookie(name)
{
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0)
      return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function setCookie(name, value, expires, path, domain, secure)
{
  if (value == "")
  {
  	value = null;
  	expires = new Date();
  }

  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}

function setCookieFromParam(name)
{
  var value = getQueryParameter(name);
  //set the cookie to expire 10 years from the day it is set
  var expiresDate = new Date(new Date().getTime() + (10 * 365 * 1000 * 3600 * 24));

  if (value != null)
    setCookie(name, value, expiresDate, "/", getBaseDomain(), null);
  return value;  
}

//sets the cookie and returns the partner code
function setPartnerCookie()
{
  var partner = getQueryParameter("partner");
  //set the cookie to expire 10 years from the day it is set
  var expiresDate = new Date(new Date().getTime() + (10 * 365 * 1000 * 3600 * 24));
  if(partner == null)
     partner = getQueryParameter("affiliateid");

  if (partner != null)
    setCookie("partner", partner, expiresDate, "/", getBaseDomain(), null);

   return partner;
}

//JS function to extract the partnercode from cookies
function getPartnerCode()
{
    // check for the partner code from the query parameters, return if
    // return that value if we retreived the partner code
    var partner = setPartnerCookie();
    if(partner != null)
       return partner;

    //partner will replace the overloaded visitorCookie going forward
    partner = getCookie("partner");

    // visitorCookie is deprecated going forward so we want to extract the partner code (if one exists)
    // and re-cookie with partner
    if(partner == null)
    {
       
       partner = getCookie("visitorCookie");
       if(partner != null && partner.length > -1)
       {
            var vCookieVals = partner.split(",");
            partner = vCookieVals[1];
            //document.cookie = "visitorCookie; path=/portal/; domain="www.<%=NLConfig.getSystemDomain()%>"; expires=Fri, 02-Jan-1970 00:00:00";
            //    setCookie("visitorCookie", null, null, , "www.<%=NLConfig.getSystemDomain()%>", secure)
            if(partner != null && partner != "")
               setCookie("partner", partner, "/", null, getBaseDomain(), null)
       }
    }

    //return null if no partner code exists for consistency's sake
    if(partner == "")
       partner = null;

    return partner;
}

// the following cookies all for the standard parameters that we're interested in if available.
function setleadformparams()
{
    var partner = getPartnerCode();
    setCookieFromParam("promocode");
    setCookieFromParam("osb");
    setCookieFromParam("id");
    setCookieFromParam("email");
	
	// this represents the add medium.
	setCookieFromParam("custentity210");
	
	// this represents scompid for the referring partner.
	// id of corresponding custom field in ns is custentity_ref_comp_id
	setCookieFromParam("origin");
	
	return partner;
}

function writecobrandimage(defaultImage)
{
    // use the Std. NetSuite logo as the default if no image is specified
    if (defaultImage == null) {defaultImage="/portal/common/img/ns-logo.png";}
    
    
    var partner = setleadformparams();  
    
    if(partner != null)
    {
		var imageurl = "http://content."+getAppDomain()+"/app/crm/common/nlcorp/partnercobrand.nl?image=" + partner + "_30.gif";
		if (document.getElementsByClassName('co-branded')[0] != undefined) {
			document.write("<A ID='nslogo' HREF='http://www.netsuite.com/portal/home.shtml' DATA-LINKTRACK='true' DATA-TRACKLINKTEXT='netsuite logo'><IMG SRC='" + defaultImage + "' ALT='NetSuite Business Software: Accounting, CRM, Ecommerce, ERP, Inventory' HEIGHT='40' WIDTH='188' BORDER='0'></A>\n");
			document.write("<IMG SRC='http://www.netsuite.com/portal/images/pages/spacer.gif' ALT='' HEIGHT='69' WIDTH='16' BORDER='0'>\n");
			document.write("<div style='padding-right: 20px; background: url(&quot;http://www.netsuite.com/portal/images/pages/dots_vert.gif&quot;) repeat-y scroll 0px 0px transparent; display: inline-block; vertical-align: middle; height: 40px;'></div>\n");
			document.write("<IMG src='" + imageurl + "' border=0>\n");
		}
		else {
			document.write("          <TD WIDTH='100%' HEIGHT='69'>\n");
			document.write("          <TABLE WIDTH='375' BORDER='0' CELLSPACING='0' CELLPADDING='0'>\n");
			document.write("            <TR HEIGHT='10'>\n");
			document.write("              <TD ROWSPAN='3' WIDTH='173' HEIGHT='37'><A HREF='http://www.netsuite.com/portal/home.shtml'><IMG SRC='" + defaultImage + "' ALT='NetSuite Business Software: Accounting, CRM, Ecommerce, ERP, Inventory' HEIGHT='37' WIDTH='173' BORDER='0' style='padding-left:8px'></A></TD>\n");
			document.write("              <TD ROWSPAN='3' WIDTH='16' HEIGHT='69'><IMG SRC='http://www.netsuite.com/portal/images/pages/spacer.gif' ALT='' HEIGHT='69' WIDTH='16' BORDER='0'></TD>\n");
			document.write("              <TD WIDTH='10' HEIGHT='10'><IMG SRC='http://www.netsuite.com/portal/images/pages/spacer.gif' ALT='' HEIGHT='10' WIDTH='10' BORDER='0'></TD>\n");
			document.write("              <TD ROWSPAN='3' WIDTH='173' HEIGHT='37'><img src='" + imageurl + "' vspace=7 border=0></TD>\n");
			document.write("            </TR>\n");
			document.write("            <TR HEIGHT='49'>\n");
			document.write("              <TD WIDTH='1' HEIGHT='49' BACKGROUND='http://www.netsuite.com/portal/images/pages/dots_vert.gif' style='background-repeat:repeat-y'><IMG SRC='http://www.netsuite.com/portal/images/pages/spacer.gif' ALT='' HEIGHT='49' WIDTH='1' BORDER='0'></TD>\n");
			document.write("            </TR>\n");
			document.write("            <TR HEIGHT='10'>\n");
			document.write("              <TD WIDTH='1' HEIGHT='10'><IMG SRC='http://www.netsuite.com/portal/images/pages/spacer.gif' ALT='' HEIGHT='10' WIDTH='1' BORDER='0'></TD>\n");
			document.write("            </TR>\n");
			document.write("          </TABLE>\n");
			document.write("        </TD>\n");
		}
    }
    else
    {
		if (document.getElementsByClassName('co-branded')[0] != undefined) {		
			document.write("<A HREF='http://www.netsuite.com/portal/home.shtml' DATA-LINKTRACK='true' DATA-TRACKLINKTEXT='netsuite logo'><IMG SRC='" + defaultImage + "' ALT='NetSuite Business Software: Accounting, CRM, Ecommerce, ERP, Inventory' HEIGHT='40' WIDTH='188' BORDER='0'></A>\n");
		}
		else {
			document.write("<TD WIDTH='100%' HEIGHT='69'><A HREF='http://www.netsuite.com/portal/home.shtml'><IMG SRC='" + defaultImage + "' ALT='NetSuite Business Software: Accounting, CRM, Ecommerce, ERP, Inventory' HEIGHT='37' WIDTH='173' BORDER='0' style='padding-top: 16px; padding-left: 8px;'></A></TD>\n");
		}
    }

    return true;
}


function redirecttologin()
{
    var redirect = getCookie("loginredirect");
    var noredirect = getQueryParameter("noredirect");

	// cmk 3/9/2005 -- need to explicitly send them to the secure pages
    if(noredirect == null && redirect != null)
        document.location = "https://system.netsuite.com/pages/customerlogin.jsp?country=US";

    return true;
}



function gotoform(formid)
{
    document.location = 'http://shopping.'+getAppDomain()+'/internal/portal/formredirect.nl?formid=' + formid;
    return true;
}

function gototestdrive()
{
   document.location = 'http://testdrive.'+getAppDomain()+'/internal/trial/testdrivelogin.nl';
   return true;
}

function selectAndGo(newLoc)
{
    newPage = newLoc.options[newLoc.selectedIndex].value;
    if(newPage != "")
        window.location.href = newPage;
}
function openTourWindow()
{
  tour = window.open('/portal/popuptour.nl','Tour','scrollbars=yes,resizable=yes,width=820,height=508');
  tour.focus();
}
function closeAndGoTo(url)
{
  opener.location = url;
  window.close();
}

function populateEmailFromCookie()
{
	var cookieVal = "";
	if (document.cookie.indexOf("OSBuserName=") > -1)
	{
		thisCookie = document.cookie.split("; ");
		for(i=0; i<thisCookie.length; i++)
		{
			if("OSBuserName" == thisCookie[i].split("=")[0])
			{
				cookieVal = thisCookie[i].split("=")[1];
				document.forms[0].elements['email'].value = cookieVal;
				document.forms[0].elements['rememberme'].checked = "T";
				document.forms[0].elements['password'].focus();
				return;
			}
		}
	}
	else
	{
		document.forms[0].elements['email'].focus();
	}
}

function hasFlash()
{
    if ((navigator.appName == "Microsoft Internet Explorer" &&
                navigator.appVersion.indexOf("Mac") == -1 &&
                navigator.appVersion.indexOf("3.1") == -1) ||
                (navigator.plugins && navigator.plugins["Shockwave Flash"])
                || navigator.plugins["Shockwave Flash 2.0"])
    {
        return true;
    }
    else
    {
        return false;
    }
}



 


<!--main menu start-->

<!--
var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id)
{	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';

}
// close showed layer
function mclose()
{
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

// close layer when click-out
document.onclick = mclose; 
// -->

<!--main menu end -->


<!--mbox start -->
 
var mboxCopyright = "Copyright 1996-2014. Adobe Systems Incorporated. All rights reserved.";var TNT = TNT || {};TNT.a = TNT.a || {};TNT.a.nestedMboxes = [];TNT.getGlobalMboxName = function () { return "target-global-mbox";};TNT.getGlobalMboxLocation = function () { return "";};TNT.isAutoCreateGlobalMbox = function () { return false;};TNT.a.b = function () { var c = {}.toString; var d = window.targetPageParams; var e = ""; var f = []; if (typeof(d) != 'undefined' && c.call(d) === '[object Function]') { try { e = d(); } catch (g) { } if (e.length > 0) { f = e.split("&"); for (var i = 0; i < f.length; i++) { f[i] = decodeURIComponent(f[i]); } } } return f;};mboxUrlBuilder = function(h, i) { this.h = h; this.i = i; this.j = new Array(); this.k = function(l) { return l; }; this.m = null;};mboxUrlBuilder.prototype.addNewParameter = function (n, o) { this.j.push({name: n, value: o}); return this;};mboxUrlBuilder.prototype.addParameterIfAbsent = function (n, o) { if (o) { for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; if (q.name === n) { return this; } } this.checkInvalidCharacters(n); return this.addNewParameter(n, o); }};mboxUrlBuilder.prototype.addParameter = function(n, o) { this.checkInvalidCharacters(n); for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; if (q.name === n) { q.value = o; return this; } } return this.addNewParameter(n, o);};mboxUrlBuilder.prototype.addParameters = function(j) { if (!j) { return this; } for (var p = 0; p < j.length; p++) { var r = j[p].indexOf('='); if (r == -1 || r == 0) { continue; } this.addParameter(j[p].substring(0, r), j[p].substring(r + 1, j[p].length)); } return this;};mboxUrlBuilder.prototype.setServerType = function(s) { this.t = s;};mboxUrlBuilder.prototype.setBasePath = function(m) { this.m = m;};mboxUrlBuilder.prototype.setUrlProcessAction = function(u) { this.k = u;};mboxUrlBuilder.prototype.buildUrl = function() { var v = this.m ? this.m : '/m2/' + this.i + '/mbox/' + this.t; var w = document.location.protocol == 'file:' ? 'http:' : document.location.protocol; var l = w + "//" + this.h + v; var x = l.indexOf('?') != -1 ? '&' : '?'; for (var p = 0; p < this.j.length; p++) { var q = this.j[p]; l += x + encodeURIComponent(q.name) + '=' + encodeURIComponent(q.value); x = '&'; } return this.y(this.k(l));};mboxUrlBuilder.prototype.getParameters = function() { return this.j;};mboxUrlBuilder.prototype.setParameters = function(j) { this.j = j;};mboxUrlBuilder.prototype.clone = function() { var z = new mboxUrlBuilder(this.h, this.i); z.setServerType(this.t); z.setBasePath(this.m); z.setUrlProcessAction(this.k); for (var p = 0; p < this.j.length; p++) { z.addParameter(this.j[p].name, this.j[p].value); } return z;};mboxUrlBuilder.prototype.y = function(A) { return A.replace(/\"/g, '&quot;').replace(/>/g, '&gt;');}; mboxUrlBuilder.prototype.checkInvalidCharacters = function (n) { var B = new RegExp('(\'|")'); if (B.exec(n)) { throw "Parameter '" + n + "' contains invalid characters"; } };mboxStandardFetcher = function() { };mboxStandardFetcher.prototype.getType = function() { return 'standard';};mboxStandardFetcher.prototype.fetch = function(C) { C.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + C.buildUrl() + '" language="JavaScript"><' + '\/scr' + 'ipt>');};mboxStandardFetcher.prototype.cancel = function() { };mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype.getType = function() { return 'ajax';};mboxAjaxFetcher.prototype.fetch = function(C) { C.setServerType(this.getType()); var l = C.buildUrl(); this.D = document.createElement('script'); this.D.src = l; document.body.appendChild(this.D);};mboxAjaxFetcher.prototype.cancel = function() { };mboxMap = function() { this.E = new Object(); this.F = new Array();};mboxMap.prototype.put = function(G, o) { if (!this.E[G]) { this.F[this.F.length] = G; } this.E[G] = o;};mboxMap.prototype.get = function(G) { return this.E[G];};mboxMap.prototype.remove = function(G) { this.E[G] = undefined; var H = []; for (var i = 0; i < this.F.length; i++) { if (this.F[i] !== G) { H.push(this.F[i]) } } this.F = H;};mboxMap.prototype.each = function(u) { for (var p = 0; p < this.F.length; p++ ) { var G = this.F[p]; var o = this.E[G]; if (o) { var I = u(G, o); if (I === false) { break; } } }};mboxMap.prototype.isEmpty = function() { return this.F.length === 0;};mboxFactory = function(J, i, K) { this.L = false; this.J = J; this.K = K; this.M = new mboxList(); mboxFactories.put(K, this); this.N = typeof document.createElement('div').replaceChild != 'undefined' && (function() { return true; })() && typeof document.getElementById != 'undefined' && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined' && typeof encodeURIComponent != 'undefined'; this.O = this.N && mboxGetPageParameter('mboxDisable') == null; var P = K == 'default'; this.Q = new mboxCookieManager( 'mbox' + (P ? '' : ('-' + K)), (function() { return mboxCookiePageDomain(); })()); this.O = this.O && this.Q.isEnabled() && (this.Q.getCookie('disable') == null); if (this.isAdmin()) { this.enable(); } this.R(); this.S = mboxGenerateId(); this.T = mboxScreenHeight(); this.U = mboxScreenWidth(); this.V = mboxBrowserWidth(); this.W = mboxBrowserHeight(); this.X = mboxScreenColorDepth(); this.Y = mboxBrowserTimeOffset(); this.Z = new mboxSession(this.S, 'mboxSession', 'session', 31 * 60, this.Q); this._ = new mboxPC('PC', 1209600, this.Q); this.C = new mboxUrlBuilder(J, i); this.ab(this.C, P); this.bb = new Date().getTime(); this.cb = this.bb; var db = this; this.addOnLoad(function() { db.cb = new Date().getTime(); }); if (this.N) { this.addOnLoad(function() { db.L = true; db.getMboxes().each(function(eb) { eb.fb(); eb.setFetcher(new mboxAjaxFetcher()); eb.finalize(); }); TNT.a.nestedMboxes = []; }); if (this.O) { this.limitTraffic(100, 10368000); this.gb(); this.hb = new mboxSignaler(function(ib, j) { return db.create(ib, j); }, this.Q); } }};mboxFactory.prototype.forcePCId = function(jb) { if (this._.forceId(jb)) { this.Z.forceId(mboxGenerateId()); }};mboxFactory.prototype.forceSessionId = function(jb) { this.Z.forceId(jb);};mboxFactory.prototype.isEnabled = function() { return this.O;};mboxFactory.prototype.getDisableReason = function() { return this.Q.getCookie('disable');};mboxFactory.prototype.isSupported = function() { return this.N;};mboxFactory.prototype.disable = function(kb, lb) { if (typeof kb == 'undefined') { kb = 60 * 60; } if (typeof lb == 'undefined') { lb = 'unspecified'; } if (!this.isAdmin()) { this.O = false; this.Q.setCookie('disable', lb, kb); }};mboxFactory.prototype.enable = function() { this.O = true; this.Q.deleteCookie('disable');};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf('mboxEnv') != -1;};mboxFactory.prototype.limitTraffic = function(mb, kb) {};mboxFactory.prototype.addOnLoad = function(nb) { if (this.isDomLoaded()) { nb(); } else { var ob = false; var pb = function() { if (ob) { return; } ob = true; nb(); }; this.qb.push(pb); if (this.isDomLoaded() && !ob) { pb(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.cb - this.bb;};mboxFactory.prototype.getEllapsedTimeUntil = function(rb) { return rb - this.bb;};mboxFactory.prototype.getMboxes = function() { return this.M;};mboxFactory.prototype.get = function(ib, sb) { return this.M.get(ib).getById(sb || 0);};mboxFactory.prototype.update = function(ib, j) { if (!this.isEnabled()) { return; } if (!this.isDomLoaded()) { var db = this; this.addOnLoad(function() { db.update(ib, j); }); return; } if (this.M.get(ib).length() == 0) { throw "Mbox " + ib + " is not defined"; } this.M.get(ib).each(function(eb) { eb.getUrlBuilder().addParameter('mboxPage', mboxGenerateId()); mboxFactoryDefault.setVisitorIdParameters(eb.getUrlBuilder(), ib); eb.load(j); });};mboxFactory.prototype.setVisitorIdParameters = function(l, ib) { var imsOrgId = 'A6F7776A5245B0EF0A490D44@AdobeOrg'; if (typeof Visitor == 'undefined' || imsOrgId.length == 0) { return; } var visitor = Visitor.getInstance(imsOrgId); if (visitor.isAllowed()) { var addVisitorValueToUrl = function(param, getter, mboxName) { if (visitor[getter]) { var callback = function(value) { if (value) { l.addParameter(param, value); } }; var value; if (typeof mboxName != 'undefined') { value = visitor[getter]("mbox:" + mboxName); } else { value = visitor[getter](callback); } callback(value); } }; addVisitorValueToUrl('mboxMCGVID', "getMarketingCloudVisitorID"); addVisitorValueToUrl('mboxMCGLH', "getAudienceManagerLocationHint"); addVisitorValueToUrl('mboxAAMB', "getAudienceManagerBlob"); addVisitorValueToUrl('mboxMCAVID', "getAnalyticsVisitorID"); addVisitorValueToUrl('mboxMCSDID', "getSupplementalDataID", ib); }};mboxFactory.prototype.create = function( ib, j, tb) { if (!this.isSupported()) { return null; } var l = this.C.clone(); l.addParameter('mboxCount', this.M.length() + 1); l.addParameters(j); this.setVisitorIdParameters(l, ib); var sb = this.M.get(ib).length(); var ub = this.K + '-' + ib + '-' + sb; var vb; if (tb) { vb = new mboxLocatorNode(tb); } else { if (this.L) { throw 'The page has already been loaded, can\'t write marker'; } vb = new mboxLocatorDefault(ub); } try { var db = this; var wb = 'mboxImported-' + ub; var eb = new mbox(ib, sb, l, vb, wb); if (this.O) { eb.setFetcher( this.L ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } eb.setOnError(function(xb, s) { eb.setMessage(xb); eb.activate(); if (!eb.isActivated()) { db.disable(60 * 60, xb); window.location.reload(false); } }); this.M.add(eb); } catch (yb) { this.disable(); throw 'Failed creating mbox "' + ib + '", the error was: ' + yb; } var zb = new Date(); l.addParameter('mboxTime', zb.getTime() - (zb.getTimezoneOffset() * 60000)); return eb;};mboxFactory.prototype.getCookieManager = function() { return this.Q;};mboxFactory.prototype.getPageId = function() { return this.S;};mboxFactory.prototype.getPCId = function() { return this._;};mboxFactory.prototype.getSessionId = function() { return this.Z;};mboxFactory.prototype.getSignaler = function() { return this.hb;};mboxFactory.prototype.getUrlBuilder = function() { return this.C;};mboxFactory.prototype.ab = function(l, P) { l.addParameter('mboxHost', document.location.hostname) .addParameter('mboxSession', this.Z.getId()); if (!P) { l.addParameter('mboxFactoryId', this.K); } if (this._.getId() != null) { l.addParameter('mboxPC', this._.getId()); } l.addParameter('mboxPage', this.S); l.addParameter('screenHeight', this.T); l.addParameter('screenWidth', this.U); l.addParameter('browserWidth', this.V); l.addParameter('browserHeight', this.W); l.addParameter('browserTimeOffset', this.Y); l.addParameter('colorDepth', this.X); l.addParameter('mboxXDomain', "enabled"); l.setUrlProcessAction(function(l) { l += '&mboxURL=' + encodeURIComponent(document.location); var Ab = encodeURIComponent(document.referrer); if (l.length + Ab.length < 2000) { l += '&mboxReferrer=' + Ab; } l += '&mboxVersion=' + mboxVersion; return l; });};mboxFactory.prototype.Bb = function() { return "";};mboxFactory.prototype.gb = function() { document.write('<style>.' + 'mboxDefault' + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.L;};mboxFactory.prototype.R = function() { if (this.qb != null) { return; } this.qb = new Array(); var db = this; (function() { var Cb = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var Db = false; var Eb = function() { if (Db) { return; } Db = true; for (var i = 0; i < db.qb.length; ++i) { db.qb[i](); } }; if (document.addEventListener) { document.addEventListener(Cb, function() { document.removeEventListener(Cb, arguments.callee, false); Eb(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); Eb(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(Cb, function() { if (document.readyState === 'complete') { document.detachEvent(Cb, arguments.callee); Eb(); } }); } else { var Fb = function() { try { document.documentElement.doScroll('left'); Eb(); } catch (Gb) { setTimeout(Fb, 13); } }; Fb(); } } if (document.readyState === "complete") { Eb(); } })();};mboxSignaler = function(Hb, Q) { this.Q = Q; var Ib = Q.getCookieNames('signal-'); for (var p = 0; p < Ib.length; p++) { var Jb = Ib[p]; var Kb = Q.getCookie(Jb).split('&'); var eb = Hb(Kb[0], Kb); eb.load(); Q.deleteCookie(Jb); }};mboxSignaler.prototype.signal = function(Lb, ib ) { this.Q.setCookie('signal-' + Lb, mboxShiftArray(arguments).join('&'), 45 * 60);};mboxList = function() { this.M = new Array();};mboxList.prototype.add = function(eb) { if (eb != null) { this.M[this.M.length] = eb; }};mboxList.prototype.get = function(ib) { var I = new mboxList(); for (var p = 0; p < this.M.length; p++) { var eb = this.M[p]; if (eb.getName() == ib) { I.add(eb); } } return I;};mboxList.prototype.getById = function(Mb) { return this.M[Mb];};mboxList.prototype.length = function() { return this.M.length;};mboxList.prototype.each = function(u) { if (typeof u !== 'function') { throw 'Action must be a function, was: ' + typeof(u); } for (var p = 0; p < this.M.length; p++) { u(this.M[p]); }};mboxLocatorDefault = function(n) { this.n = 'mboxMarker-' + n; document.write('<div id="' + this.n + '" style="visibility:hidden;display:none">&nbsp;</div>');};mboxLocatorDefault.prototype.locate = function() { var Nb = document.getElementById(this.n); while (Nb != null) { if (Nb.nodeType == 1) { if (Nb.className == 'mboxDefault') { return Nb; } } Nb = Nb.previousSibling; } return null;};mboxLocatorDefault.prototype.force = function() { var Ob = document.createElement('div'); Ob.className = 'mboxDefault'; var Pb = document.getElementById(this.n); if (Pb) { Pb.parentNode.insertBefore(Ob, Pb); } return Ob;};mboxLocatorNode = function(Qb) { this.Nb = Qb;};mboxLocatorNode.prototype.locate = function() { return typeof this.Nb == 'string' ? document.getElementById(this.Nb) : this.Nb;};mboxLocatorNode.prototype.force = function() { return null;};mboxCreate = function(ib ) { var eb = mboxFactoryDefault.create( ib, mboxShiftArray(arguments)); if (eb) { eb.load(); } return eb;};mboxDefine = function(tb, ib ) { var eb = mboxFactoryDefault.create(ib, mboxShiftArray(mboxShiftArray(arguments)), tb); return eb;};mboxUpdate = function(ib ) { mboxFactoryDefault.update(ib, mboxShiftArray(arguments));};mbox = function(n, Rb, C, Sb, wb) { this.Tb = null; this.Ub = 0; this.vb = Sb; this.wb = wb; this.Vb = null; this.Wb = new mboxOfferContent(); this.Ob = null; this.C = C; this.message = ''; this.Xb = new Object(); this.Yb = 0; this.Rb = Rb; this.n = n; this.Zb(); C.addParameter('mbox', n) .addParameter('mboxId', Rb); this._b = function() {}; this.ac = function() {}; this.bc = null; this.cc = document.documentMode >= 10 && !mboxFactoryDefault.isDomLoaded(); if (this.cc) { this.dc = TNT.a.nestedMboxes; this.dc.push(this.n); }};mbox.prototype.getId = function() { return this.Rb;};mbox.prototype.Zb = function() { if (this.n.length > 250) { throw "Mbox Name " + this.n + " exceeds max length of " + "250 characters."; } else if (this.n.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.n + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.n;};mbox.prototype.getParameters = function() { var j = this.C.getParameters(); var I = new Array(); for (var p = 0; p < j.length; p++) { if (j[p].name.indexOf('mbox') != 0) { I[I.length] = j[p].name + '=' + j[p].value; } } return I;};mbox.prototype.setOnLoad = function(u) { this.ac = u; return this;};mbox.prototype.setMessage = function(xb) { this.message = xb; return this;};mbox.prototype.setOnError = function(_b) { this._b = _b; return this;};mbox.prototype.setFetcher = function(ec) { if (this.Vb) { this.Vb.cancel(); } this.Vb = ec; return this;};mbox.prototype.getFetcher = function() { return this.Vb;};mbox.prototype.load = function(j) { if (this.Vb == null) { return this; } this.setEventTime("load.start"); this.cancelTimeout(); this.Ub = 0; var C = (j && j.length > 0) ? this.C.clone().addParameters(j) : this.C; this.Vb.fetch(C); var db = this; this.fc = setTimeout(function() { db._b('browser timeout', db.Vb.getType()); }, 15000); this.setEventTime("load.end"); return this;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate()) { var db = this; setTimeout(function() { db.loaded(); }, 100); }};mbox.prototype.activate = function() { if (this.Ub) { return this.Ub; } this.setEventTime('activate' + ++this.Yb + '.start'); if (this.cc && this.dc[this.dc.length - 1] !== this.n) { return this.Ub; } if (this.show()) { this.cancelTimeout(); this.Ub = 1; } this.setEventTime('activate' + this.Yb + '.end'); if (this.cc) { this.dc.pop(); } return this.Ub;};mbox.prototype.isActivated = function() { return this.Ub;};mbox.prototype.setOffer = function(Wb) { if (Wb && Wb.show && Wb.setOnLoad) { this.Wb = Wb; } else { throw 'Invalid offer'; } return this;};mbox.prototype.getOffer = function() { return this.Wb;};mbox.prototype.show = function() { this.setEventTime('show.start'); var I = this.Wb.show(this); this.setEventTime(I == 1 ? "show.end.ok" : "show.end"); return I;};mbox.prototype.showContent = function(gc) { if (gc == null) { return 0; } if (this.Ob == null || !this.Ob.parentNode) { this.Ob = this.getDefaultDiv(); if (this.Ob == null) { return 0; } } if (this.Ob != gc) { this.hc(this.Ob); this.Ob.parentNode.replaceChild(gc, this.Ob); this.Ob = gc; } this.ic(gc); this.ac(); return 1;};mbox.prototype.hide = function() { this.setEventTime('hide.start'); var I = this.showContent(this.getDefaultDiv()); this.setEventTime(I == 1 ? 'hide.end.ok' : 'hide.end.fail'); return I;};mbox.prototype.finalize = function() { this.setEventTime('finalize.start'); this.cancelTimeout(); if (this.getDefaultDiv() == null) { if (this.vb.force() != null) { this.setMessage('No default content, an empty one has been added'); } else { this.setMessage('Unable to locate mbox'); } } if (!this.activate()) { this.hide(); this.setEventTime('finalize.end.hide'); } this.setEventTime('finalize.end.ok');};mbox.prototype.cancelTimeout = function() { if (this.fc) { clearTimeout(this.fc); } if (this.Vb != null) { this.Vb.cancel(); }};mbox.prototype.getDiv = function() { return this.Ob;};mbox.prototype.getDefaultDiv = function() { if (this.bc == null) { this.bc = this.vb.locate(); } return this.bc;};mbox.prototype.setEventTime = function(jc) { this.Xb[jc] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.Xb;};mbox.prototype.getImportName = function() { return this.wb;};mbox.prototype.getURL = function() { return this.C.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.C;};mbox.prototype.kc = function(Ob) { return Ob.style.display != 'none';};mbox.prototype.ic = function(Ob) { this.lc(Ob, true);};mbox.prototype.hc = function(Ob) { this.lc(Ob, false);};mbox.prototype.lc = function(Ob, mc) { Ob.style.visibility = mc ? "visible" : "hidden"; Ob.style.display = mc ? "block" : "none";};mbox.prototype.fb = function() { this.cc = false;};mboxOfferContent = function() { this.ac = function() {};};mboxOfferContent.prototype.show = function(eb) { var I = eb.showContent(document.getElementById(eb.getImportName())); if (I == 1) { this.ac(); } return I;};mboxOfferContent.prototype.setOnLoad = function(ac) { this.ac = ac;};mboxOfferAjax = function(gc) { this.gc = gc; this.ac = function() {};};mboxOfferAjax.prototype.setOnLoad = function(ac) { this.ac = ac;};mboxOfferAjax.prototype.show = function(eb) { var nc = document.createElement('div'); nc.id = eb.getImportName(); nc.innerHTML = this.gc; var I = eb.showContent(nc); if (I == 1) { this.ac(); } return I;};mboxOfferDefault = function() { this.ac = function() {};};mboxOfferDefault.prototype.setOnLoad = function(ac) { this.ac = ac;};mboxOfferDefault.prototype.show = function(eb) { var I = eb.hide(); if (I == 1) { this.ac(); } return I;};mboxCookieManager = function mboxCookieManager(n, oc) { this.n = n; this.oc = oc == '' || oc.indexOf('.') == -1 ? '' : '; domain=' + oc; this.pc = new mboxMap(); this.loadCookies();};mboxCookieManager.prototype.isEnabled = function() { this.setCookie('check', 'true', 60); this.loadCookies(); return this.getCookie('check') == 'true';};mboxCookieManager.prototype.setCookie = function(n, o, kb) { if (typeof n != 'undefined' && typeof o != 'undefined' && typeof kb != 'undefined') { var qc = new Object(); qc.name = n; qc.value = escape(o); qc.expireOn = Math.ceil(kb + new Date().getTime() / 1000); this.pc.put(n, qc); this.saveCookies(); }};mboxCookieManager.prototype.getCookie = function(n) { var qc = this.pc.get(n); return qc ? unescape(qc.value) : null;};mboxCookieManager.prototype.deleteCookie = function(n) { this.pc.remove(n); this.saveCookies();};mboxCookieManager.prototype.getCookieNames = function(rc) { var sc = new Array(); this.pc.each(function(n, qc) { if (n.indexOf(rc) == 0) { sc[sc.length] = n; } }); return sc;};mboxCookieManager.prototype.saveCookies = function() { var tc = false; var uc = 'disable'; var vc = new Array(); var wc = 0; this.pc.each(function(n, qc) { if(!tc || n === uc) { vc[vc.length] = n + '#' + qc.value + '#' + qc.expireOn; if (wc < qc.expireOn) { wc = qc.expireOn; } } }); var xc = new Date(wc * 1000); document.cookie = this.n + '=' + vc.join('|') + '; expires=' + xc.toGMTString() + '; path=/' + this.oc;};mboxCookieManager.prototype.loadCookies = function() { this.pc = new mboxMap(); var yc = document.cookie.indexOf(this.n + '='); if (yc != -1) { var zc = document.cookie.indexOf(';', yc); if (zc == -1) { zc = document.cookie.indexOf(',', yc); if (zc == -1) { zc = document.cookie.length; } } var Ac = document.cookie.substring( yc + this.n.length + 1, zc).split('|'); var Bc = Math.ceil(new Date().getTime() / 1000); for (var p = 0; p < Ac.length; p++) { var qc = Ac[p].split('#'); if (Bc <= qc[2]) { var Cc = new Object(); Cc.name = qc[0]; Cc.value = qc[1]; Cc.expireOn = qc[2]; this.pc.put(Cc.name, Cc); } } }};mboxSession = function(Dc, Ec, Jb, Fc, Q) { this.Ec = Ec; this.Jb = Jb; this.Fc = Fc; this.Q = Q; this.Gc = false; this.Rb = typeof mboxForceSessionId != 'undefined' ? mboxForceSessionId : mboxGetPageParameter(this.Ec); if (this.Rb == null || this.Rb.length == 0) { this.Rb = Q.getCookie(Jb); if (this.Rb == null || this.Rb.length == 0) { this.Rb = Dc; this.Gc = true; } } Q.setCookie(Jb, this.Rb, Fc);};mboxSession.prototype.getId = function() { return this.Rb;};mboxSession.prototype.forceId = function(jb) { this.Rb = jb; this.Q.setCookie(this.Jb, this.Rb, this.Fc);};mboxPC = function(Jb, Fc, Q) { this.Jb = Jb; this.Fc = Fc; this.Q = Q; this.Rb = typeof mboxForcePCId != 'undefined' ? mboxForcePCId : Q.getCookie(Jb); if (this.Rb != null) { Q.setCookie(Jb, this.Rb, Fc); }};mboxPC.prototype.getId = function() { return this.Rb;};mboxPC.prototype.forceId = function(jb) { if (this.Rb != jb) { this.Rb = jb; this.Q.setCookie(this.Jb, this.Rb, this.Fc); return true; } return false;};mboxGetPageParameter = function(n) { var I = null; var Hc = new RegExp("\\?[^#]*" + n + "=([^\&;#]*)"); var Ic = Hc.exec(document.location); if (Ic != null && Ic.length >= 2) { I = Ic[1]; } return I;};mboxSetCookie = function(n, o, kb) { return mboxFactoryDefault.getCookieManager().setCookie(n, o, kb);};mboxGetCookie = function(n) { return mboxFactoryDefault.getCookieManager().getCookie(n);};mboxCookiePageDomain = function() { var oc = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var Jc = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!Jc.exec(oc)) { var Kc = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(oc); if (Kc) { oc = Kc[0]; if (oc.indexOf("www.") == 0) { oc=oc.substr(4); } } } return oc ? oc: "";};mboxShiftArray = function(Lc) { var I = new Array(); for (var p = 1; p < Lc.length; p++) { I[I.length] = Lc[p]; } return I;};mboxGenerateId = function() { return (new Date()).getTime() + "-" + Math.floor(Math.random() * 999999);};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};if (typeof mboxVersion == 'undefined') { var mboxVersion = 51; var mboxFactories = new mboxMap(); var mboxFactoryDefault = new mboxFactory('netsuite.tt.omtrdc.net', 'netsuite', 'default');};if (mboxGetPageParameter("mboxDebug") != null || mboxFactoryDefault.getCookieManager() .getCookie("debug") != null) { setTimeout(function() { if (typeof mboxDebugLoaded == 'undefined') { alert('Could not load the remote debug.\nPlease check your connection' + ' to Test&amp;Target servers'); } }, 60*60); document.write('<' + 'scr' + 'ipt language="Javascript1.2" src=' + '"//admin5.testandtarget.omniture.com/admin/mbox/mbox_debug.jsp?mboxServerHost=netsuite.tt.omtrdc.net' + '&clientCode=netsuite"><' + '\/scr' + 'ipt>');};mboxVizTargetUrl = function(ib ) { if (!mboxFactoryDefault.isEnabled()) { return; } var C = mboxFactoryDefault.getUrlBuilder().clone(); C.setBasePath('/m2/' + 'netsuite' + '/viztarget'); C.addParameter('mbox', ib); C.addParameter('mboxId', 0); C.addParameter('mboxCount', mboxFactoryDefault.getMboxes().length() + 1); var zb = new Date(); C.addParameter('mboxTime', zb.getTime() - (zb.getTimezoneOffset() * 60000)); C.addParameter('mboxPage', mboxGenerateId()); var j = mboxShiftArray(arguments); if (j && j.length > 0) { C.addParameters(j); } C.addParameter('mboxDOMLoaded', mboxFactoryDefault.isDomLoaded()); mboxFactoryDefault.setVisitorIdParameters(C, ib); return C.buildUrl();};TNT.createGlobalMbox = function () { var Mc = "target-global-mbox"; var Nc = ("".length === 0); var Oc = ""; var Pc; if (Nc) { Oc = "mbox-" + Mc + "-" + mboxGenerateId(); Pc = document.createElement("div"); Pc.className = "mboxDefault"; Pc.id = Oc; Pc.style.visibility = "hidden"; Pc.style.display = "none"; mboxFactoryDefault.addOnLoad(function(){ document.body.insertBefore(Pc, document.body.firstChild); }); } var Qc = mboxFactoryDefault.create(Mc, TNT.a.b(), Oc); if (Qc != null) { Qc.load(); }};mboxFactoryDefault.addOnLoad(mboxAppendSession);
var mboxSessionKeyword = "OFM";
function mboxAppendAnchorTags() {
 var anchorTags = document.getElementsByTagName('a');
 for(i = 0; i < anchorTags.length; i++) {
 if (anchorTags[i].href.indexOf(mboxSessionKeyword) != -1) {
 anchorTags[i].href = anchorTags[i].href.replace(
 mboxSessionKeyword,"mboxSession="+mboxFactoryDefault.getSessionId().getId());
 }
 }
}
function mboxAppendForm() {
 var formTags = document.getElementsByTagName('form');
 for(i = 0; i < formTags.length; i++) {
 if (formTags[i].action.indexOf(mboxSessionKeyword) != -1) {
 formTags[i].action = formTags[i].action.replace(
 mboxSessionKeyword,"mboxSession="+mboxFactoryDefault.getSessionId().getId());
 }
 }
}
function mboxAppendSession() {
 mboxAppendAnchorTags();
 mboxAppendForm();
}
 
<!--mbox end -->
 
 