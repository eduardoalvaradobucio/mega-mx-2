var EGAIN_CMD = 'egainCommand';
var CMD_CUST_INITIATE_VIDEO = 'custinitiatevideo';
var CMD_AGENT_INITIATE_VIDEO = 'agentinitiatevideo';
var CMD_AGENT_AUTO_REJECT_VIDEO = 'agentautoreject';
var CMD_CUST_AUTO_REJECT_VIDEO = 'custautoreject';
var messagingProperty = undefined;
var chattextClass = "chattext";
var vhtIds;
var customerIsTyping;
var agentName = "";
var agentInitiatedVideo = false;
var EGAIN_SUB_CMD = 'subcmd';
var _debug = false;
window.App = {};
window.App.pageOffset = 20;
window.App.submitSectionHeight = 56;
window.App.scrollsize = 30;
window.App.offerConstraints = new Object(); // this object store size and position for offers
window.App.cbWndHandle=null;

$(document).ready(function() {

    var language = "en";

    if (getUrlParameter('languageCode')) {
                  language = getUrlParameter('languageCode').toLowerCase();
    }

    var countryCode ="US";
    if (getUrlParameter('countryCode')) {
                  countryCode = getUrlParameter('countryCode').toUpperCase();
    }

	if (getUrlParameter('debug')) {
				_debug = getUrlParameter('debug').toLowerCase() == 'true';
	}
	if(getUrlParameter('ofrsessionid')){
		var oTop, oLeft, oHeight, oWidth;
		oTop = getUrlParameter('top');
		oLeft = getUrlParameter('left');
		oHeight = getUrlParameter('height');
		oWidth = getUrlParameter('width');
		if(oTop && oLeft)
			App.offerConstraints.position= {top:oTop,left:oLeft};
		if(oHeight && oWidth)
			App.offerConstraints.size= {width:oWidth,height:oHeight};	
	}
	// Using CKEditor's language detect function to determine the system locale
	// if(CKEDITOR.lang.detect(language)=='ar'){
	//	chattextClass = "chattextRtl";  //Right-to-Left css class name
	// }
	var videochat = false;
	if (getUrlParameter('video'))
			videochat = (parseInt(getUrlParameter('video')) == 1); //videochat will evaluate to true or false based on the URL


	var _aId = getUrlParameter('aId');
	var _sId = getUrlParameter('sId');
	var _uId = getUrlParameter('uId');
	if(_aId && _sId && _uId)
		vhtIds = {aId : _aId, sId : _sId, uId:_uId};

    $.ajax({
		url : 'properties/messaging_' + language + '_' + countryCode + '.properties',
		type: 'GET',
		dataType : 'text',
		success : function(data){ messagingProperty = data;}
	});

   //Wait until the properties file to come before starting the application.
   	$.getScript('properties/chat_' + language + '_' + countryCode+ '.properties',function(){
   
           //Start the app.
   		document.title = L10N_DOCUMENT_TITLE;
   		resizeWindow('',eGainLiveConfig.chatLoginWindowHeight);
   		var retVal=egainLiveCustomConfigHook();
   		if(!retVal){
   			$.getScript('properties/custom_chat_' + language + '_' + countryCode
   				+ '.properties',function(){
   				setTimeout(function(){App.start();},0);
   				});
   		}
   		
   		if(retVal)
   		setTimeout(function(){App.start();},0);
           	
    	});
});

$(window).unload(function(event) {
    //Logout on unload.
	App.connection.logout();
});

//Start the application
App.start = function() {

	App.session = new App.Session();
    App.headerView = new App.HeaderView();


	App.connection.checkAgentAvailability(function(available){

		if(available){

			//Creates sidebar.
			if(!App.utils.isVisitorMobile() && eGainLiveConfig.showSidebar) {

				App.chat_sidebar_view = new App.ChatSidebarView();
				App.chat_sidebar_view.render();
			}
			var parameterDefinitions = eGainLiveConfig.loginParameters;
					//if autoLogin is 1, then just go directly to the chat page.
		    if(eGainLiveConfig.autoLogin) {
				//if autologin then go directly to chat

				var formValues = {};


				for ( var i = 0; i < parameterDefinitions.length; i++) {
					var paramDef = parameterDefinitions[i];
					var fieldName = 'fieldname_' + (i + 1);
					if (getUrlParameter(fieldName))
						formValues[paramDef.attributeName]=unescape(getUrlParameter(fieldName));
				}
				(new App.LoginView()).login(formValues);
				if(formValues['subject'])
					App.session.startWithInitialMessage(formValues['subject']);


		    } else {

		        //If not, let's go to the login page first.

				//Render the login view.
				if(parameterDefinitions.length>0){
					 resizeWindow(CONFIG_LOGIN_FORM_WIDGET_URL, eGainLiveConfig.chatLoginWindowHeight);		
					 setTimeout(function(){
						(App.login = new App.LoginView()).render();
					},10);
				}
				else
					(new App.LoginView()).login({});
		    }
		}
		else {

			 App.messenger = new App.Messenger();

			(App.chat_wrap_view = new App.ChatWrapView()).showOffHours();
		}

	});

}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
                                .exec(window.location.href);
    return results ? results[1] : null;
}

function onClickOfferVideoChat(userId)
{
	App.connection.sendAcceptVideoChat(userId);
}

/**
	Customer rejects agent's offer of 'text to video chat' conversion
**/
function onClickRejectVideoChat(userId)
{
	App.connection.sendDeclineVideoChat(userId);
}
function resizeWindow(url,height)
{
	var d = getDimensions(url);
	if($.browser.msie && $.browser.version == '7.0')
		height+=30;
	else if($.browser.msie && $.browser.version == '8.0')
		height+=13;
	else if($.browser.mozilla)
			height+=8;
	if(App.offerConstraints.size){
		d.width = App.offerConstraints.size.width;
		height = App.offerConstraints.size.height;
	}
	if(App.offerConstraints.position){
		d.top = App.offerConstraints.position.top;
		d.left = App.offerConstraints.position.left;
		if(top && top.moveTo)
			top.moveTo(d.left , d.top);
	}
	
	if(top && top.resizeTo)
		top.resizeTo(d.width , height);
	setTimeout(function(){showSideBar(url);},0);
}

function showSideBar(url){

		if(App.chat_sidebar_view){
			if( url && url.length>0){
				var width = $(window).width() ;
				width = width/2 - App.pageOffset;
				App.chat_sidebar_view.show();
				$('#eg-chat-content').css('width',width);
				$('#eg-chat-header').width(width);
				App.chat_sidebar_view.setURL(url);	
			}				
		}	

}
function getDimensions(url) { //this function is different from how it used to be, but I think we should require window height, width, and width with video in eGainLiveConfig to simplify things. It was always a mystery to me where the actual window sizing was taking place, so this makes it easier to understand.

	var clientWidth = eGainLiveConfig.chatWindowWidth;

	
	var clientTop = 0;
	if(!(CONFIG_KNOWLEDGE_BASE_URL && CONFIG_KNOWLEDGE_BASE_URL.length>0))
		clientWidth-=53;
	if (!!eGainLiveConfig.showSidebar && App.chat_sidebar_view && url && url.length > 0)
	{
		clientWidth*=2;

		if(eGainLiveConfig.chatWindowWidthWithWidget)
			clientWidth = eGainLiveConfig.chatWindowWidthWithWidget;
			
	}
	var clientLeft = (window.screen.availWidth - clientWidth)*98/100;
	return {width:clientWidth,left:clientLeft,top:clientTop};
}


function openCobrowseWindow(url, cbWndName) {
	//check if window already open
	if(window.App.cbWndHandle && !window.App.cbWndHandle.closed)
	{
		window.App.cbWndHandle.focus();
	}
	else
	{
	
		var d = getDimensions(CONFIG_LOGIN_FORM_WIDGET_URL);
		// w,h -- -2: let browser decide, -1: take up available space, +ve values: use them
		var w = eGainLiveConfig.cobrowseWindowWidth || -2;
		var h = eGainLiveConfig.cobrowseWindowHeight || -2;
		if (w == -1) {
			w = window.screen.availWidth - d.width - 15; // 15: to avoid windows going out of screen to some extent - cross browser.
		}
		if (h == -1) {
			h = window.screen.availHeight;
		}
		var l = d.width;
	
		var options = 'resizable=yes, scrollbars=yes, top=0';
		if (l > 0)
			options += ', left='+l;
		if (w > 0)
			options += ', width='+w;
		if (h > 0)
			options += ', height='+h;
	
		var wndHandle = window.open(url, cbWndName, options);
		window.App.cbWndHandle = wndHandle;
		wndHandle.focus();
		top.moveTo(0, 0);
	}
}

function decodeMessage(messageHtml){
 messageHtml = messageHtml.replace(/\\u/g, '%u');
 messageHtml = messageHtml.replace(/\^/g, '%');
 messageHtml = unescape(messageHtml);
 messageHtml = $.trim(messageHtml);
 return messageHtml;
}

function chatSave(){
	$.ajax({
		url : 'css/transcript.css',
		type: 'GET',
		dataType : 'text',
		success : function(data){ document.saveAsForm.content.value = getContent('SAVE',data);
				var sysdate=new Date().format("mmmdd_yyyy_hhMMTT");		//To get date in the format Aug9_2012_1020AM.htm
				var systemdate=sysdate.toString();
				document.saveAsForm.sysdate.value= systemdate;
				document.saveAsForm.target = "saveastarget";
				document.saveAsForm.submit();
	}});
}
function chatPrint() {
	var windowObject = openTranscriptWindow('PRINT');

	// Need to do this hack for Opera browser.
	var objBrowse = windowObject.navigator;
	if (objBrowse.appName == "Opera")
	{
		windowObject.onload = function () {
		    window.setTimeout(function () {
		        windowObject.print();
		    }, 500);
		};
	}
	else
		windowObject.print();
}


var titleAlertTimerId = null;

function startTitleAlert() {
	if (titleAlertTimerId != null) {
		return;
	}
	titleAlertTimerId = setInterval(function() {
		document.title = document.title == L10N_NEW_MESSAGE ? L10N_DOCUMENT_TITLE : L10N_NEW_MESSAGE;
	}, 1000);
	window.onmousemove = stopTitleAlert;
}

function stopTitleAlert() {
	if (titleAlertTimerId == null) {
		return;
	}
	clearInterval(titleAlertTimerId);
	titleAlertTimerId = null;
	document.title = L10N_DOCUMENT_TITLE;
	window.onmousemove = null;
}

function openTranscriptWindow(windowId) {
	var options = 'width=350,height=250' //
			+ ',menubar=0' //
			+ ',toolbar=1' //
			+ ',status=0'//
			+ ',scrollbars=1'//
			+ ',resizable=1';
	options = ''; // no options -> new tab
	var windowObject = window.open('', windowId, options);
	windowObject.document.open('text/html', 'replace');
	windowObject.document.writeln(getContent(windowId));
	windowObject.document.close();
	windowObject.focus();
	return windowObject;
}

function getContent(windowId,cssData)
{
	var content = new Array();
	content.push('<html>');
	if(windowId =='SAVE')
	{
		//setting content type and character encoding while saving the transcript
		content.push('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />');
	}
	content.push('<head>');
	content.push('<title>');
	content.push(L10N_TRANSCRIPT_TITLE);
	content.push('</title>');
	var messages = App.messenger.getAllMessages();
	var transcriptContent = "";
	var message="";
	var agentCss = new Array();
	var agentCssList = ['agent1','agent2','agent3'];
	var footerImage = "footerImage";
	for(var i=0; i< messages.length; i++){
		message = messages[i];
        if(message.cbAction == "add_anchor"){
          message = hookCBAddAnchor(message);
        }else{
            message = hookCBRemoveAnchor(message);
        }


       //get method is present only for bubble message i.e message from
        //customer or agent
		if(message.get){
			var msgCss = message.get('cssClass');
			if(message.get('type') == 'agent')
			{
				msgCss = agentCss[message.get('author')];
				if(!msgCss)
				{
					var size=0;
					for(t in agentCss)
						size++;
					var index = size%agentCssList.length;
					msgCss =  message.get('cssClass')+' '+agentCssList[index];
					agentCss[message.get('author')] = msgCss;
				}
			}
			transcriptContent+=transcribeHtml(transcriptEntry(message.get('author'),message.get('body'),message.get('time')),msgCss);
			footerImage = "footerImage";
		}
		else{
			// if system message
			transcriptContent+=transcribeHtml(message.message,message.cssClass);
			footerImage = "footerImage2";
		}
	}

	transcriptContent = transcriptContent.replace(/onclick\s*=\s*[\"\'].*?[\"\']/gi, "");
	transcriptContent = transcriptContent.replace(/<script.*?<\/script>/gi, "");
	if (windowId == 'PRINT')
	{
		content.push('<link rel="stylesheet" type="text/css" href="css/transcript.css" />');
		transcriptContent = transcriptContent.replace(/<a.*?>/gi, "<u>");
		transcriptContent = transcriptContent.replace(/<\/a>/gi, " <\/u>");
	}
	else
		content.push('<style type="text/css">'+cssData+'</style>');

	content.push('</head><body>');
	content.push('<div id="headerImage"></div><div id="headerText"><br>');
	content.push(chat_started.replace('{0}',App.chatStartTime));
	content.push('</div><div id="transcript"><div id="chatTextBox">');
	content.push(transcriptContent);
	content.push('</div></div><div id="'+footerImage+'">');
	content.push('<br/>');
	content.push('</div><div id="footerText"><span>');
	content.push(L10N_TRANSCRIPT_FOOTER);
	content.push('</span></div>');

    if(cbTranscript!=""){
    content.push('<br/>');
    content.push('<div id="cbTranscript">');
    content.push(cbTranscript);
    content.push('</div>');

    //remove from cache
    cbTranscript="";
    }

	content.push('</body></html>');

	return content.join(" ");
}

var cbTranscript="";
function transcriptCallback(result){
   cbTranscript = result;
}


function loadCBTranscriptContent(sessionId,custName){
    //add timezone information
    var tzone = getTimeZoneOffset();
    var transcriptURL = "../../../web/view/collaboration/agent/fetchTranscript.jsp?sessionId="+sessionId+"&consumer=CUSTOMER&custName="+custName+"&tzone="+tzone;
    $.ajax({
        url : transcriptURL,
        success : transcriptCallback,
        async : false
    });
}

function hookCBAddAnchor(messageIn) {
    var message = "";
    var messageOut = messageIn;

    var localAnchor = "<a href='#cbAnchor' title=" + L10N_VIEW_CB_TX_TOOLTIP + ">" + messageIn.cbSession + "</a>";
    //load the transcript
    if (cbTranscript == "") loadCBTranscriptContent(messageIn.cbSession, messageIn.cbCustName);
    message = messageIn.message;
    messageOut.message = message.replace(messageIn.cbSession, localAnchor);

    return messageOut;
}

function hookCBRemoveAnchor(messageIn){
    //replace the href on 'Join Cobrowse Session' searching the marker
    var message = "";
    var messageOut = messageIn;

    if(messageIn.get){
        var marker = "cbAutostart=true";
        var markerPattern = new RegExp(marker, "i");

        message = messageIn.get('body');
        if (message.match(markerPattern)) {
            var anchStartPattern = /<a.*?>/i;
            var anchEndPattern = /<\/a>/i;

            message = message.replace(anchStartPattern, "");
            message = message.replace(anchEndPattern, "");
            messageOut.set('body', message);
        }
    }

    return messageOut;

}

function getTimeZoneOffset(){
        //now use the sessionID to write add href to started cobrowse  message
        //add timezone information
        var d = new Date();
        var offset = -1 * d.getTimezoneOffset();
        var sign;
        if (offset > 0) {
            sign = "%2B"; //hex code for +
        } else {
            sign = "-";
        }

        offset = Math.abs(offset);

        var minutes = offset % 60;
        if (minutes / 10 < 1) {
            minutes = "0" + minutes;
        }
        var tzone = sign + Math.floor(offset / 60) + minutes;

        return tzone;
}

function replaceHexToASCII(str) {
    //assumes each hex is double digit and starts with ^
    if (str == "") return "";
    var caretIdx = str.indexOf("^");
    if (caretIdx <= -1) return str;

    var leftStr = str.substring(0, caretIdx);
    var hexStr = str.substring(caretIdx + 1, caretIdx + 3);
    var hexToASC = String.fromCharCode(parseInt(hexStr, 16));
    var rightStr = str.substring(caretIdx + 3);
    rightStr = replaceHexToASCII(rightStr);

    return leftStr + hexToASC + rightStr;
}

// escapes html
function transcribe(msg, cssClass) {
	return "<div class='transcriptEntry "+cssClass+"'>"+msg+"</div>";
}
// no html escaping
function transcribeHtml(msg, cssClass) {
	return "<div class='"+cssClass+"'>"+msg+"</div>";
}
function transcriptEntry(identifier, messageHtml, date) {
	return '<span class="chatidentifier">' + xmlEscape(identifier) + ' </span>'
		    + '<span class="timestamp">' + date	+ '</span>' //
			+ '<span class="'+chattextClass+'" >' +  messageHtml + '</span>';
}
//This function downloads the attachment
jQuery.download = function(url){
	if(url){
		document.formAttachment.action=url;
		document.formAttachment.sid.value = App.connection.sid;
		document.formAttachment.target = "attachmenttarget";
		document.formAttachment.setCacheHeaders.value="false"
        	document.formAttachment.submit();

	};
};

function onClickAttachment( fileName){
 fileName = escape(fileName);
 fileName=decodeMessage(fileName);
 var attachmentUrl= App.connection.BOSH_SERVICE+"/getattachment/"+encodeURIComponent(fileName);
 $.download(attachmentUrl);
}

