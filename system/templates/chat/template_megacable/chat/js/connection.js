/**

    Connection is a wrapper object around Strophe's connection instance.

**/
App.Connection = Backbone.Model.extend({

    initialize : function() {
        
        //This will be strophe's connection instance.
        this._connection = null;
		this.connected = false;
		// BOSH_SERVICE must be same domain and port that served the chat client
		var base = document.URL;
		var contextRoot = base.substr(base.indexOf("//")+2, base.length);
		contextRoot = contextRoot.substr(contextRoot.indexOf("/") + 1);
		contextRoot = "/" + contextRoot.substr(0, contextRoot.indexOf("/"));
		this.BOSH_SERVICE = contextRoot+ '/egain/chat/entrypoint';
		this.QUEUE_STATUS_URL = this.BOSH_SERVICE + '/sessionStatus'; // BOSH session id is to be appended
		this.SURVEY_URL = this.BOSH_SERVICE + '/survey';
		this.AGENT_AVAILABILITY_URL = this.BOSH_SERVICE + '/agentAvailability';
		this.NOTIFY_URL = './notify.html';
		this.ATTRIBUTES_INFO_URL = this.BOSH_SERVICE + '/attributesInfo';
		this.GET_MEDIA_SERVER_URL = this.BOSH_SERVICE + '/mediaServer';

		this.entryPointId = '1000'; // default if no parameter
		this.jid = 'egain@egain.com'; // default if no parameter
		this.languageCode = 'en'; // default if no parameter
		this.countryCode = 'US'; // default if no parameter
		if (this.getUrlParameter('entryPointId')) {
				this.entryPointId = this.getUrlParameter('entryPointId');
		}
		if (this.getUrlParameter('jid')) {
			this.jid = this.getUrlParameter('jid');
		}
		if (this.getUrlParameter('languageCode')) {
			this.languageCode = this.getUrlParameter('languageCode').toLowerCase();
		}
		if (this.getUrlParameter('countryCode')) {
			this.countryCode = this.getUrlParameter('countryCode').toUpperCase();
		}
		
		if (this.getUrlParameter('video')) 
			this.videochat = (parseInt(this.getUrlParameter('video')) == 1) && !App.utils.isVisitorMobile(); 
				
		if (this.getUrlParameter('avmode')) 
			this.avmode = parseInt(getUrlParameter('avmode')); //read the video chat mode
		else
			this.avmode = 2;
	},
    
    //Connect to the BOSH server.
    connect : function(email) {
			
			var connectionUrl = this.BOSH_SERVICE + window.location.search;
			
			if (this.videochat)
				connectionUrl = connectionUrl + '&videoChat=1';
			
			this._connection  =  new Strophe.Connection(connectionUrl);
			// add egain specific attributes
			var from = 'anonymous@egain.com';
			if (email) from = email;

			this._connection.from = (from).replace(/'/g, '&apos;');

			this._connection.entryPointId = this.entryPointId;
			this._connection.lang = this.languageCode + '-' + this.countryCode;
			this._connection.connect(this.jid, '', this.onConnect);
			

    },
	
	onConnect : function(status, condition) {	
		
		if(status == Strophe.Status.CONNECTED)
		{
			window.onbeforeunload = function() {
				return L10N_BROWSER_CLOSE_MESSAGE;
			}
			App.connection.sid = App.connection._connection.sid;
			App.connection._connection.addHandler(App.connection.notifyUser, null, null, null, null, null);
			if(App.connection.videochat)
        			App.chat_video_view.initializeVideo(true);
			App.editor.render();
			App.chatStartTime = new Date().format('h:MM TT, dd mmm yyyy');
			App.connection.startQueueStatusPoll();
			App.connection.connected = true;
			setTimeout(function(){App.transcript.getTranscriptCSS();},0);
		}
		else if(status == Strophe.Status.DISCONNECTED)
		{
			if(App.connection.confail)
				return;
			
			App.session.end();
			window.onbeforeunload = null;
		}
		else if (status == Strophe.Status.CONNFAIL) {
			window.onbeforeunload = null;
			if(!customWrapUpMessagesHook(condition)){
				if (condition == 'system-shutdown') {
					App.connection.confail = true;
					App.chat_wrap_view.showOffHours();
				}
				else if (condition == 'other-request') {
					App.connection.confail = true;
					App.chat_wrap_view.showDuplicateSession();
				} else if (!App.connection._connection.disconnecting && condition != 'unknown') {
					App.connection.confail = true;
					App.messenger.showNotification(L10N_CONNFAIL + '<span style="display:none">'
							+ condition + '</span>', 'error');
				}
			}
		} 
	},
	
	notifyUser : function(msg) {
		App.connection.connected = true;
		if (msg.getAttribute('type'))
			App.connection.clearPollQueueStatusTimer();
		if (msg.getAttribute('type') == 'chat' && msg.getAttribute('from')) {
			agentIdent = msg.getAttribute('from');
		}
		for ( var i = 0; i < msg.childNodes.length; i++) {
			if (!msg.childNodes[i].tagName) {
				continue;
			}
			if (msg.childNodes[i].tagName.indexOf(':widget') > 0) {
				continue;
			}
			if (msg.childNodes[i].tagName.indexOf(':body') < 0) {
				// continue;
			}
			var messageHtml = msg.childNodes[i].textContent;
			if (!messageHtml) {
				messageHtml = msg.childNodes[i].text; // Internet Explorer
			}
			if((typeof msg.childNodes[i].baseName != "undefined" && msg.childNodes[i].baseName != null && msg.childNodes[i].baseName == EGAIN_CMD) || (typeof msg.childNodes[i].localName != "undefined" && msg.childNodes[i].localName != null && msg.childNodes[i].localName.trim() == EGAIN_CMD))
			{
				var egainCmd = null;
				if(typeof msg.childNodes[i].text != "undefined" && msg.childNodes[i].text!= null)
					egainCmd = msg.childNodes[i].text;
				else if(typeof msg.childNodes[i].textContent != "undefined" && msg.childNodes[i].textContent != null)
					egainCmd = msg.childNodes[i].textContent.trim();
					
				if(egainCmd != null && egainCmd != '')
				{
					messageHtml = "";
					if(egainCmd == CMD_CUST_INITIATE_VIDEO) 
					{
						videochat = true;
						App.chat_video_view.initializeVideo(true);
					}
					else if(egainCmd == CMD_AGENT_INITIATE_VIDEO)
					{
						// Getting agent's name from message object
						agentName = msg.getAttribute('from');
						agentIdent = "";
						agentInitiatedVideo = true;
					}
					else if(egainCmd == CMD_AGENT_AUTO_REJECT_VIDEO)
					{
						// right now, we are not doing anything, but if we need to do any changes for agent auto reject action, then this is the place where we can handle it.
					}
					else if(egainCmd == CMD_CUST_AUTO_REJECT_VIDEO)
					{
						agentInitiatedVideo = false;
					}
					else if( egainCmd == "stopVideo")
					{
						App.chat_video_view.hideVideo();
					}
                    else if (egainCmd.indexOf("egainCBCmd_") == 0)
                    {
                        App.messenger.addCBParamsToMsg(egainCmd);
                    }

				}
			}
			if(msg.getAttribute('type')){
				messageHtml = unescape(messageHtml);
				messageHtml = decodeMessage(messageHtml);
			}

			if (messageHtml.length && messageHtml.length >= 0) {
				var cssClass = 'chatInput';
				var type = msg.getAttribute('type');
				var agentIdentity = msg.getAttribute('from');
				if (type) {
					if (type == 'normal') {

						if(messageHtml=="typing_message")
							 App.messenger.trigger('chatter-start-typing',agentIdentity);
						else
							App.messenger.trigger('chatter-stop-typing',agentIdentity);

						return true;
					}
					cssClass += ' ' + type;
				}
				
				if(messageHtml == 'ActivitySubtypeChangedToVideoChat')
						continue;
				App.audio.playChatMessageSound();
				if(agentIdentity != 'system' && messageHtml.length > 0 && type == 'chat'){
					startTitleAlert();
					App.messenger.submitMessageString(messageHtml,'agent',agentIdentity,cssClass);
				}
				else if(messageHtml.length > 0){
					App.messenger.showNotification(messageHtml,cssClass);
				}
				
			}
		}
		return true;
	},
    
    //Put the logic to submit the message 
    //to the server in this function.
    sendNormalMessage : function(messageHtml, type, command) {
    
		var CMD_CUST_INITIATE_VIDEO = 'custinitiatevideo';
		var CMD_AGENT_INITIATE_VIDEO = 'agentinitiatevideo';
		var CMD_AGENT_AUTO_REJECT_VIDEO = 'agentautoreject';
		var CMD_CUST_AUTO_REJECT_VIDEO = 'custautoreject';

			if ($.trim(messageHtml
				//.replace(/<[^>]*>/g, '')
				.replace(/<br ?\/?>/g, '')
				.replace(/&nbsp;/g, '')).length == 0)
			return;

		// TODO remove once the agent console has been fixed to force anchors in
		// messages to be opened in a new window
		messageHtml = messageHtml.replace(/<a\b/g, '<a target="_blank"');

		// TODO remove once the server has been fixed to cope with line breaks
		messageHtml = messageHtml.replace(/\n/g, ' ');
		if (messageHtml.length > eGainLiveConfig.maxMessageSize) {
			if (L10N_MESSAGE_LENGTH_ERROR && L10N_MESSAGE_LENGTH_ERROR.length > 0) {
				var text = L10N_MESSAGE_LENGTH_ERROR;
				text = text.replace(/MESSAGE_LENGTH/g, messageHtml.length);
				text = text.replace(/MAX_LENGTH/g, eGainLiveConfig.maxMessageSize);
				alert(text);
			}
			return;
		}

		if (!type) {
			type = 'chat';
		}
		if(typeof command != "undefined")
		{
			this._connection.send(($msg( {
						'type' : type
					}).c('body').t(messageHtml).up().c(EGAIN_CMD,{xmlns:"http://bindings.egain.com/chat"}).c(EGAIN_SUB_CMD).t(command).tree()));
		}
		else
		{
			this._connection.send($msg( {
				'type' : type
			}).c('body').t(messageHtml).tree());
		}
		
		
		if(command != CMD_CUST_INITIATE_VIDEO)
		{
			clearTimeout(customerIsTyping);
			customerIsTyping = null;
		}
		return true;
    },

	sendNotTypingMessage : function() {
		customerIsTyping = null;
		this._connection.send($msg( {
			'type' : 'normal'
		}).c('body').t(L10N_NO_TYPING_MESSAGE).tree());

    },
	
	sendTypingMessage : function() {
	
		this._connection.send($msg( {
			'type' : 'normal'
		}).c('body').t(L10N_TYPING_MESSAGE).tree());

    },

	sendAcceptVideoChat : function(userId) {
		var sid = this.sid;
		var entryPointId = this.entryPointId

		var convertVideoChatUrl= this.BOSH_SERVICE+"/convertvideochat";
		$.ajax( {
			type : 'POST',
			url : convertVideoChatUrl,
			data : {'sid' : sid, 'userId' : userId, 'entryPointId' : entryPointId },
			dataType : 'text',
			success : function(string)
			{
				if(string == "true")
				{
					App.connection.videochat = true;
					App.chat_video_view.initializeVideo(true);
				}
				else
				{
					agentInitiatedVideo = false;
					if(App.connection.sendNormalMessage(link_expired_alert, 'headline'))
						App.messenger.showNotification(link_expired_alert,'chatInput headline');
				}
			}
		});

    },
    checkAgentAvailability : function(callback) {
		var str = "";
		if (this.videochat)
			str = '&videoChat=1';

		$.ajax( {
			type : 'GET',
			url : this.AGENT_AVAILABILITY_URL + '/' + this.entryPointId + window.location.search + str,
			dataType : 'xml',
			success : function(xml) {
				/*
				 * <?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
				 * <agentAvailability available="true"
				 * xmlns:ns2="com/egain/live/framework/bosh/gen"
				 * xmlns:ns4="urn:ietf:params:xml:ns:xmpp-stanzas"
				 * xmlns:ns3="jabber:client" />
				 */
				var available = $(xml).find('agentAvailability').attr('available');
					callback(available.toLowerCase() == 'true');

			}
		});

    },

    pollQueueStatus : function() {
		if (eGainLiveConfig.sessionStastics == 0){
			// This means we do not need to send any request for session statistics.
			return;
		}

		var queueStatusUrl = this.QUEUE_STATUS_URL + '/' + this._connection.sid;
		$.ajax( {
				type : 'GET',
				url : queueStatusUrl,
				dataType : 'xml',
				success : function(xml) {
					/*
						<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
						<sessionStatus xmlns:ns2="com/egain/live/framework/bosh/gen"
						 xmlns:ns4="urn:ietf:params:xml:ns:xmpp-stanzas"
						 xmlns:ns3="jabber:client">
							<ns2:waitTime>8.0</ns2:waitTime>
							<ns2:queueDepth>2</ns2:queueDepth>
						</sessionStatus
					*/
					var queueDepth = $(xml).find('ns2:\\queueDepth, queueDepth')
							.text();

					var waittime = $(xml).find('ns2\\:waitTime, waitTime')
							.text();
					waittime = Math.ceil(parseFloat(waittime) / 60);

					var message = null;
					var valueToReplace = null;

					if (eGainLiveConfig.sessionStastics == 2){
						// This means we have to show queue depth to the customer.
						valueToReplace = queueDepth;
						message = L10N_QUEUE_LOAD_INFO;
					}
					else{
						// This means we have to show wait time to the customer.
						valueToReplace = waittime;
						message = L10N_WAIT_TIME;
						if (waittime == 1 && L10N_WAIT_TIME_SINGULAR) {
							message = L10N_WAIT_TIME_SINGULAR;
						}
					}
					//elayala 20170412
					var welcome_message = null;
					welcome_message = L10N_WELCOME_MESSAGE;
					//App.chat_stream_view.showQueueStatus(welcome_message);
					
					App.chat_stream_view.showQueueStatus(welcome_message + message.replace(/TOREPLACE/, valueToReplace));
					if (valueToReplace > 0) {
						App.connection.pollQueueStatusTimer = setTimeout('App.connection.pollQueueStatus()',
								5 * 1000);
					}
				}
			});

    },

    startQueueStatusPoll : function() {
		this.queueStatusPollStarted = true;
		this.pollQueueStatus();		
    },
	
	clearPollQueueStatusTimer :function() {
		if(this.queueStatusPollStarted){
			this.queueStatusPollStarted = false;
			App.chat_stream_view.showQueueStatus();
			if (this.pollQueueStatusTimer) {
				clearTimeout(this.pollQueueStatusTimer);
				this.pollQueueStatusTimer = null;
				}
		}
	},
	getUrlParameter : function(name) {
		name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)')
				.exec(window.location.href);
		return results ? results[1] : null;
	},

    /**

        Sends the login information to the server.

    **/


    logout : function() {

		if (this._connection && this._connection.connected) 
			this._connection.disconnect(L10N_CLOSE_MESSAGE);
    },
    
  
	stopVideoCall : function() {

         
    },

    pauseVideoCall : function() {

        
    },

  
	
	populateoptions : function(callback){
		var inputXML = "<attributesInfo languageCode='";
		inputXML += this.languageCode;
		inputXML += "' countryCode='";
		inputXML += this.countryCode;
		inputXML += "' xmlns = 'http://bindings.egain.com/chat' >";

		var flag = 0;
		var parameterDefinitions = eGainLiveConfig.loginParameters;
		for ( var i = 0; i < parameterDefinitions.length; i++) {

			var paramDef = parameterDefinitions[i];

			if (paramDef.fieldType == 3)
			{
				flag = 1;

				inputXML += '<attributeInfo>';

				inputXML += '<attributeName>';
				inputXML += paramDef.attributeName;
				inputXML += '</attributeName>';

				inputXML += '<objectName>';
				inputXML += paramDef.objectName;
				inputXML += '</objectName>';

				inputXML += '</attributeInfo>';
			}
		}

		inputXML += '</attributesInfo>';

		if (flag == 1) {

			$.ajax( {
				url : this.ATTRIBUTES_INFO_URL,
				type : 'POST',
				data : inputXML,
				contentType : 'text/XML',
				dataType : 'xml',
				success : function(xml) {
							callback(xml);
				}

					
			});
		}
		else
			callback();
	},
	
	sendDeclineVideoChat : function(userId){
	
		var sid = this.sid;
		var entryPointId = this.entryPointId

		var rejectVideoChatUrl= this.BOSH_SERVICE+"/rejectvideochat";
		$.ajax( {
		type : 'POST',
		url : rejectVideoChatUrl,
		data : {'sid' : sid, 'userId' : userId},
		dataType : 'text',
		success : function(string)
		{
			if(string == "true")
			{
				agentInitiatedVideo = false;
			}
			else
			{
				if(App.connection.sendNormalMessage(link_expired_alert, 'headline'))
					App.messenger.showNotification(link_expired_alert,'chatInput headline');
			}
		}
		});
	}
});


