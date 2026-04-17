/**
 * this is an overridden implementation Strophe.log() to show important messages
 * in the transcript.
 */
Strophe.log = function(level, msg) {
	if (level == Strophe.LogLevel.ERROR || level == Strophe.LogLevel.FATAL	|| _debug )
	{
		if(typeof App != 'undefined')
			App.messenger.showNotification(msg, 'stropheLog');
		else
			transcribe(msg, 'stropheLog');
	}
};

/**
 * this effectively disables the secondary timeout as the connection refreshes
 * are not handled by the server
 */
Strophe.SECONDARY_TIMEOUT = 99;
Strophe.RETRY_COUNT = 0;

/**
 * A modified copy of Strophe.Connection.prototype.connect so that we can supply
 * a "from" attribute and custom tags.
 */
Strophe.Connection.prototype.connect = function(jid, pass, callback, wait, hold) {
	this.jid = jid;
	this.pass = pass;
	this.connect_callback = callback;
	this.disconnecting = false;
	this.connected = false;
	this.authenticated = false;
	this.errors = 0;

	this.wait = wait || this.wait;
	this.hold = hold || this.hold;

	// parse jid for domain and resource
	this.domain = Strophe.getDomainFromJid(this.jid);

	// build the body tag
	var attributes = {
			to : this.entryPointId, // egain specific attribute
			from : this.from, // egain specific attribute
			authId : 0,
			"xml:lang" : this.lang,
			wait : this.wait,
			hold : this.hold,
			content : "text/xml; charset=utf-8",
			ver : "1.6",
			"xmlns:xmpp" : Strophe.NS.BOSH,
			"xmpp:version" : "1.0"
		};

	var body = this._buildBody().attrs(attributes);

	var $egainParams = body.c('egainParams', {
		'xmlns' : 'http://bindings.egain.com/chat'
	}); //

	if (eGainLiveConfig.loginParameters && eGainLiveConfig.loginParameters.length > 0) {

		for ( var i = 0; i < eGainLiveConfig.loginParameters.length; i++) {
			addParamXml($egainParams, eGainLiveConfig.loginParameters[i]);
		}
	}

	//sending visitor historytracking data
	if(typeof vhtIds != "undefined" && vhtIds)
	{
		body.c('visitorIdentifier')
			.c('aId').t(vhtIds.aId).up()
			.c('sId').t(vhtIds.sId).up()
			.c('uId').t(vhtIds.uId).up()
			.up()
	}

	//Sending backStopping parameters if backstopping is configured
	if(typeof App != "undefined" && App
		&& typeof App.eGainCustomParams != "undefined" && App.eGainCustomParams
		&& typeof App.eGainCustomParams.backStoppingTime  != "undefined" && App.eGainCustomParams.backStoppingTime
		&& typeof App.eGainCustomParams.backStoppingAction  != "undefined" && App.eGainCustomParams.backStoppingAction)
	{
		body.c('backStoppingParams')
			.c('time').t(new String(App.eGainCustomParams.backStoppingTime)).up()
			.c('action').t(App.eGainCustomParams.backStoppingAction).up()
			.up()
	}

	//Sending caseId if it exists
	if(typeof App != "undefined" && App
		&& typeof App.eGainCustomParams != "undefined" && App.eGainCustomParams
		&& typeof App.eGainCustomParams.eglvcaseid  != "undefined" && App.eGainCustomParams.eglvcaseid )
	{
		body.c('caseId')
			.t(new String(App.eGainCustomParams.eglvcaseid ))
			.up();
	}

	// sending messaging_xx_XX.properties file content
	body.c('messagingData', '<![CDATA['+messagingProperty+']]>').up();

	var authenticationData = '';
	if (typeof eGainLiveConfig.samlResponse != 'undefined' && eGainLiveConfig.samlResponse != 'null') {
		authenticationData = body.c('authenticationData');
			authenticationData.c('SAMLResponse').t(eGainLiveConfig.samlResponse).up()
			.up();
	}
	if (eGainLiveConfig.captchaSettings && eGainLiveConfig.captchaSettings.isCaptchaEnabled) {
		if(authenticationData !== '') {
			var captchaxml = authenticationData.c('captcha');
			captchaxml.c('id').t(captcha.getCaptchaId()).up()
			.c('response').t(captcha.getCaptchaCode()).up();
			if(eGainLiveConfig.enableChatDeflection && App.deflection.noArticlesReturned) {
				captchaxml.c('deflectedArticleCount').t('0').up()
			}
		} else {
			var captchaxml = body.c('authenticationData').c('captcha');
			captchaxml.c('id').t(captcha.getCaptchaId()).up()
			.c('response').t(captcha.getCaptchaCode()).up();
			if(eGainLiveConfig.enableChatDeflection && App.deflection.noArticlesReturned) {
				captchaxml.c('deflectedArticleCount').t('0').up()
			}
		}
	}

	this._changeConnectStatus(Strophe.Status.CONNECTING, null);

	this._requests.push(new Strophe.Request(body.tree(),
			this._onRequestStateChange.bind(this).prependArg(
					this._connect_cb.bind(this)), body.tree().getAttribute(
					"rid")));
	this._throttledRequestHandler();
}

/**
 * add eGain specific tags to $egainParameters for the supplied
 * parameterDefinition
 */
function addParamXml($egainParameters, parameterDefinition) {

	var attribName = parameterDefinition.attributeName;
	if(!attribName)
		return;
	var attributeValue = null;
	if(typeof App != 'undefined')
		attributeValue =  App.session.get(attribName);//
	else
		attributeValue = $('#' + parameterDefinition.attributeName).val();

	attributeValue = escapeXML(attributeValue);
	if (attributeValue.constructor != Array) {
		attributeValue = attributeValue.replace(/[\r\n]/g, '<br />');
	} else {
		for(var i=0; i < attributeValue.length; i++) {
			attributeValue[i] = attributeValue[i].replace(/[\r\n]/g, '<br />');
		}
	}
	$egainParameters.c('param', {
		'name' : parameterDefinition.paramName
	}) //
			.c('mapping') //
	if (parameterDefinition.egainAttributeName != 'undefined' && parameterDefinition.egainAttributeName) {
		$egainParameters.c('egainAttributeName').t(parameterDefinition.egainAttributeName).up() //
	}
		$egainParameters.c('attributeName').t(parameterDefinition.attributeName).up() //
			.c('objectName').t(parameterDefinition.objectName).up() //
			.c('attributeValue').t(attributeValue).up() //
			.c('validationString').t(parameterDefinition.validationString).up()
			.c('primaryKey').t(parameterDefinition.primaryKey).up() //
	if (parameterDefinition.secureAttribute != 'undefined' && parameterDefinition.secureAttribute) {
			$egainParameters.c('secureAttribute').t(parameterDefinition.secureAttribute).up() //
	}
			$egainParameters.c('minLength').t(parameterDefinition.minLength).up() //
			.c('maxLength').t(parameterDefinition.maxLength).up() //
			.c('required').t(parameterDefinition.required).up() //
			.c('fieldType').t(parameterDefinition.fieldType).up() //

			.up() // mapping
			.up(); // /param
}

/**
	Escape the string to be used in xml
**/
function escapeXML(str) {
	if (!str)
		return '';
	if (str.constructor != Array) {
		str = str.replace(/&/g, '&amp;') //
		.replace(/>/g, '&gt;') //
		.replace(/</g, '&lt;') //
		.replace(/'/g, '&#39;') //
		.replace(/"/g, '&quot;') //
		.replace(/[\r\n]/g, '<br />');
	}
	else {
		for(var i=0; i < str.length; i++) {
			str[i] = str[i].replace(/&/g, '&amp;') //
			.replace(/>/g, '&gt;') //
			.replace(/</g, '&lt;') //
			.replace(/'/g, '&#39;') //
			.replace(/"/g, '&quot;') //
			.replace(/[\r\n]/g, '<br />');
		}
	}
	return str;
};

//also creating a duplicate function in case it is not overwridden in chat.js where it (xmlEscape) is used
var xmlEscape = escapeXML;

/**
 * A modified copy of Strophe.Connection.prototype._connect_cb which does not do
 * standard authentication.
 */
Strophe.Connection.prototype._connect_cb = function(req) {
	Strophe.info("_connect_cb was called");

	this.connected = true;
	var bodyWrap = req.getResponse();
	if (!bodyWrap) {
		return;
	}

	this.xmlInput(bodyWrap);
	this.rawInput(Strophe.serialize(bodyWrap));

	var typ = bodyWrap.getAttribute("type");
	var cond, conflict, errorCode;
	if (typ !== null && typ == "terminate") {
		// an error occurred
		cond = bodyWrap.getAttribute("condition");
		conflict = bodyWrap.getElementsByTagName("conflict");
		for (var mindex = 0; mindex < bodyWrap.childNodes.length; mindex++) {
			var errorMsg = bodyWrap.childNodes[mindex];
			if(errorMsg.tagName && errorMsg.tagName.indexOf('error') != -1) {
				for ( var i = 0; i < errorMsg.childNodes.length; i++) {
				if (errorMsg.childNodes[i].tagName) {
					if(errorMsg.childNodes[i].tagName.indexOf('code') != -1) {
						errorCode = Strophe.getText(errorMsg.childNodes[i]);
						}
					}
				}
			}
		}
		if (cond !== null) {
			if (cond == "remote-stream-error" && conflict.length > 0) {
				cond = "conflict";
				} else if (cond == "remote-connection-failed" && typeof errorCode != 'undefined') {
				cond = cond +":"+ errorCode;
			}
			this._changeConnectStatus(Strophe.Status.CONNFAIL, cond);
		} else {
			this._changeConnectStatus(Strophe.Status.CONNFAIL, "unknown");
		}
		return;
	} else {
		//Parsing egain response parameters and populating the subject and full_name parameters
		//Response format is as follows:
		//<ns2:egainResponseParams>
        //	<ns2:responseParam name="L10N_NAME_PROMPT">
        //    <ns2:responseParamMapping>
        //        <ns2:attributeName>full_name</ns2:attributeName>
        //        <ns2:attributeValue>customerName</ns2:attributeValue>
        //    </ns2:responseParamMapping>
        //  </ns2:responseParam>
        //  <ns2:responseParam name="L10N_YOUR_QUESTION_PROMPT">
        //    <ns2:responseParamMapping>
        //        <ns2:attributeName>subject</ns2:attributeName>
        //        <ns2:attributeValue>question</ns2:attributeValue>
        //    </ns2:responseParamMapping>
        //  </ns2:responseParam>
		//</ns2:egainResponseParams>

		var formValues = {};
		for (var mindex = 0; mindex < bodyWrap.childNodes.length; mindex++) {
			var egainResponseParams = bodyWrap.childNodes[mindex];
			if(egainResponseParams.tagName && egainResponseParams.tagName.indexOf('egainResponseParams') != -1) {
				for (var responseParamCounter = 0; responseParamCounter < egainResponseParams.childNodes.length; responseParamCounter++) {
				    var responseParam = egainResponseParams.childNodes[responseParamCounter];
        			if(responseParam.tagName && responseParam.tagName.indexOf('responseParam') != -1) {
        			    for (var reseponseParamMappingCounter = 0; reseponseParamMappingCounter < responseParam.childNodes.length; reseponseParamMappingCounter++) {
        			        var responseParamMapping = responseParam.childNodes[reseponseParamMappingCounter];
        			        if(responseParamMapping.tagName && responseParamMapping.tagName.indexOf('responseParamMapping') != -1) {
								if (window.navigator.userAgent.indexOf("MSIE") != -1 && ((window.navigator.userAgent.indexOf("Trident/4.0") != -1) || (window.navigator.userAgent.indexOf("Trident/5.0") != -1))) {
									//For IE 8 and IE 9 only
									if(Strophe.getText(responseParamMapping.childNodes[0]) == 'full_name') {
										formValues['name'] = Strophe.getText(responseParamMapping.childNodes[1]);
									} else if(Strophe.getText(responseParamMapping.childNodes[0]) == 'subject') {
										formValues['subject'] = Strophe.getText(responseParamMapping.childNodes[1]);
									} else if(Strophe.getText(responseParamMapping.childNodes[0]) == 'first_name' ||
												Strophe.getText(responseParamMapping.childNodes[0]) == 'last_name') {
										formValues['name'] = formValues['name'] ? formValues['name'] + ' ' + Strophe.getText(responseParamMapping.childNodes[1]) : Strophe.getText(responseParamMapping.childNodes[1]);
									}
								} else {
									//For IE 10 & above and for other browsers
									for (var i = 0; i < responseParamMapping.childNodes.length; i++) {
										if(responseParamMapping.childNodes[i].tagName && responseParamMapping.childNodes[i].tagName.indexOf('attributeName') != -1) {
											if (Strophe.getText(responseParamMapping.childNodes[i]) == 'full_name') {
												formValues['name'] = Strophe.getText(responseParamMapping.childNodes[i+2]);
												i=i+2;
											} else if(Strophe.getText(responseParamMapping.childNodes[i]) == 'subject') {
												formValues['subject'] = Strophe.getText(responseParamMapping.childNodes[i+2]);
												i=i+2;
 											} else if(Strophe.getText(responseParamMapping.childNodes[i]) == 'first_name'
														|| Strophe.getText(responseParamMapping.childNodes[i]) == 'last_name') {
												formValues['name'] = formValues['name'] ? formValues['name'] + ' ' + Strophe.getText(responseParamMapping.childNodes[i+2]) : Strophe.getText(responseParamMapping.childNodes[i+2]);
												i=i+2;
											}
										}
									}
								}
        			        }
        			    }
        			}
					App.session.set(formValues);
                }
			}
		}
	}

	// check to make sure we don't overwrite these if _connect_cb is
	// called multiple times in the case of missing stream:features
	if (!this.sid) {
		this.sid = bodyWrap.getAttribute("sid");
	}
	if (!this.stream_id) {
		this.stream_id = bodyWrap.getAttribute("authid");
	}
	var wind = bodyWrap.getAttribute('requests');
	if (wind) {
		this.window = parseInt(wind, 10);
	}
	var hold = bodyWrap.getAttribute('hold');
	if (hold) {
		this.hold = parseInt(hold, 10);
	}
	var wait = bodyWrap.getAttribute('wait');
	if (wait) {
		this.wait = parseInt(wait, 10);
	}

	// we don't do standard authentication mechanisms
	this.authenticated = true;
	this._changeConnectStatus(Strophe.Status.CONNECTED, null);
}

/**
 * A modified copy of Strophe.Connection.prototype._processRequest so that we
 * can supply headers to the req.xhr.
 */
Strophe.Connection.prototype._processRequest = function(i) {
	var req = this._requests[i];
	var reqStatus = -1;

	try {
		if (req.xhr.readyState == 4) {
			reqStatus = req.xhr.status;
		}
	} catch (e) {
		Strophe.error("caught an error in _requests[" + i + "], reqStatus: "
				+ reqStatus);
	}

	if (typeof (reqStatus) == "undefined") {
		reqStatus = -1;
	}

	var time_elapsed = req.age();
	var primaryTimeout = (!isNaN(time_elapsed) && time_elapsed > Math
			.floor(Strophe.TIMEOUT * this.wait));
	var secondaryTimeout = (req.dead !== null && req.timeDead() > Math
			.floor(Strophe.SECONDARY_TIMEOUT * this.wait));
	var requestCompletedWithServerError = (req.xhr.readyState == 4 && (reqStatus < 1 || reqStatus >= 500));
	if (primaryTimeout || secondaryTimeout || requestCompletedWithServerError) {
		if (secondaryTimeout) {
			Strophe.error("Request " + this._requests[i].id
					+ " timed out (secondary), restarting");
		}
		req.abort = true;
		req.xhr.abort();
		// setting to null fails on IE6, so set to empty function
		req.xhr.onreadystatechange = function() {
		};
		this._requests[i] = new Strophe.Request(req.xmlData, req.origFunc,
				req.rid, req.sends);
		req = this._requests[i];
	}

	if (req.xhr.readyState === 0) {
		Strophe.debug("request id " + req.id + "." + req.sends + " posting");

		req.date = new Date();
		try {
			req.xhr.open("POST", this.service, true);
		} catch (e2) {
			Strophe.error("XHR open failed: " + e2.message);
			if (!this.connected) {
				this._changeConnectStatus(Strophe.Status.CONNFAIL,
						"bad-service");
			}
			this.disconnect();
			return;
		}

		req.xhr.setRequestHeader("Content-Type", "application/xml");
		req.xhr.setRequestHeader("X-egain-session", this.xEgainEscalationHeader);
		// eGain addition

		// Fires the XHR request -- may be invoked immediately
		// or on a gradually expanding retry window for reconnects
		var sendFunc = function() {
			req.xhr.send(req.data);
		};

		// Implement progressive backoff for reconnects --
		// First retry (send == 1) should also be instantaneous
		if (req.sends > 1) {
			// Using a cube of the retry number creats a nicely
			// expanding retry window
			var backoff = Math.pow(req.sends, 3) * 1000;
			setTimeout(sendFunc, backoff);
		} else if (req.sends === -1) {
			var backoff = 5 * 1000;
			setTimeout(sendFunc, backoff);
		} else {
			sendFunc();
		}

		req.sends++;

		this.xmlOutput(req.xmlData);
		this.rawOutput(req.data);
	} else {
		Strophe.debug("_processRequest: " + (i === 0 ? "first" : "second")
				+ " request has readyState of " + req.xhr.readyState);
	}
}

/**
 * A modified copy of Strophe.Connection.prototype._hitError which logs a
 * message to the transcript
 */
Strophe.Connection.prototype._hitError = function(reqStatus) {
	if(!App)
		clearPollQueueStatusTimer();
	else
		App.connection.clearPollQueueStatusTimer();
	this.errors++;
	Strophe.warn("request errored, status: " + reqStatus
			+ ", number of errors: " + this.errors);
	if (this.errors > 4) {
		if(typeof App != 'undefined'){
			App.messenger.showErrorNotification('error');
		}
		else
			transcribeHtml(L10N_ERROR + reqStatus + '. ' + L10N_ABANDONING, 'error');
		this._onDisconnectTimeout();
	} else {
		if(typeof App != 'undefined'){
			App.messenger.showErrorNotification('log');
		}
		else
			transcribeHtml(L10N_ERROR + reqStatus + '. ' + L10N_RETRYING, 'log');
	}
}

/**
 * A modified copy of Strophe.Connection.prototype._onRequestStateChange which logs a
 * message to the transcript on error and v11 template.
 */
Strophe.Connection.prototype._onRequestStateChange = function (func, req)
    {
		Strophe.debug("request id " + req.id +
                      "." + req.sends + " state changed to " +
                      req.xhr.readyState);

        if (req.abort) {
            req.abort = false;
            return;
        }

        // request complete
        var reqStatus;
        if (req.xhr.readyState == 4) {
            reqStatus = 0;
            try {
                reqStatus = req.xhr.status;
            } catch (e) {
                // ignore errors from undefined status attribute.  works
                // around a browser bug
            }

            if (typeof(reqStatus) == "undefined") {
                reqStatus = 0;
            }

            if (this.disconnecting) {
                if (reqStatus >= 400) {
                    this._hitError(reqStatus);
                    return;
                }
            }

            var reqIs0 = (this._requests[0] == req);
            var reqIs1 = (this._requests[1] == req);

            if ((reqStatus > 0 && reqStatus < 500) || req.sends > 5) {
                // remove from internal queue
                this._removeRequest(req);
                Strophe.debug("request id " +
                              req.id +
                              " should now be removed");
            }

            // request succeeded
            if (reqStatus == 200) {
				Strophe.RETRY_COUNT = 0;
                // if request 1 finished, or request 0 finished and request
                // 1 is over Strophe.SECONDARY_TIMEOUT seconds old, we need to
                // restart the other - both will be in the first spot, as the
                // completed request has been removed from the queue already
				if (reqIs1 ||
                    (reqIs0 && this._requests.length > 0 &&
                     this._requests[0].age() > Math.floor(Strophe.SECONDARY_TIMEOUT * this.wait))) {
                    this._restartRequest(0);
                }
                // call handler
                Strophe.debug("request id " +
                              req.id + "." +
                              req.sends + " got 200");
                func(req);
                this.errors = 0;
            } else {

				if(typeof App != 'undefined'){
					App.messenger.showErrorNotification('error');
				}
				else
					Strophe.error("request id " +
                              req.id + "." +
                              req.sends + " error " + reqStatus +
                              " happened");
                if (reqStatus === 0 ||
                    (reqStatus >= 400 && reqStatus < 600 && reqStatus != 502) ||
                    reqStatus >= 12000) {
                    this._hitError(reqStatus);
                    if (reqStatus >= 400 && reqStatus < 500) {
                        this._changeConnectStatus(Strophe.Status.DISCONNECTING,
                                                  null);
                        this._doDisconnect();
                    }
                }
				if(reqStatus === 502) {
					if (Strophe.RETRY_COUNT < 12) {
						Strophe.RETRY_COUNT ++;
						this._requests[0] = new Strophe.Request(req.xmlData,
                                                    req.origFunc,
                                                    req.rid,
                                                    -1);
						this._restartRequest(0);
					} else {
					    this._changeConnectStatus(Strophe.Status.DISCONNECTING,
                                null);
                        this._doDisconnect();
					}
				}
            }

            if (!(((reqStatus > 0 && reqStatus < 10000) && reqStatus != 502)||
                  req.sends > 5)) {
                this._throttledRequestHandler();
            }
        }
}
/**
 * A modified copy of Strophe.Connection.prototype._sendTerminate which takes an
 * xml element to add as a child node to the terminate message rather than the
 * presence tag.
 */
/*
 * not currently needed Strophe.Connection.prototype._sendTerminate =
 * function(elem) { Strophe.info("_sendTerminate was called"); var body =
 * this._buildBody().attrs( { type : "terminate" });
 *
 * if (elem) body.cnode(elem);
 *
 * this.disconnecting = true;
 *
 * var req = new Strophe.Request(body.tree(), this._onRequestStateChange.bind(
 * this).prependArg(this._dataRecv.bind(this)), body.tree()
 * .getAttribute("rid"));
 *
 * this._requests.push(req); this._throttledRequestHandler(); }
 */

function xmlOutput(elem) {
}

function xmlInput(elem) {
	// example message: two messages sent in a single wrapper
	// (white space added as _ so that automatic code formating doesn't remove
	// it!)
	// <body xmlns:ns4='urn:ietf:params:xml:ns:xmpp-stanzas'
	// ____xmlns:ns3='jabber:client'
	// ____xmlns:ns5='http://jabber.org/protocol/httpbind'
	// ____xmlns:ns2='com/egain/live/framework/bosh/gen'>
	// ____<ns3:message>
	// ________<ns3:body>
	// ____________An agent response
	// ________</ns3:body>
	// ____</ns3:message>
	// ____<ns3:message>
	// ________<ns3:body>
	// ____________Further agent response with markup%3A
	// ____________%3Cspan class%3D%5E22sourceRowText%5E22
	// ____________role%3D%5E22presentation%5E22%3Enormal %3Cstrong%3Ebold
	// ____________%3C/strong%3E%3C/span%3E
	// ____________%3Cspan style%3D%5E22color%3A %23ff0000%5E22%3E%3Cspan
	// ____________class%3D%5E22sourceRowText%5E22
	// ____________role%3D%5E22presentation%5E22%3Ered
	// ____________%3C/span%3E%3C/span%3E
	// ____________%3Cem%3E%3Cspan class%3D%5E22sourceRowText%5E22
	// ____________role%3D%5E22presentation%5E22%3Eitalic%3C/span%3E%3C/em%3E
	// ________</ns3:body>
	// ____</ns3:message>
	// </body>

	// the second <ns3:body> unescaped
	// Further agent response with markup:
	// <span class="sourceRowText" role="presentation">normal
	// <strong>bold</strong></span>
	// <span style="color: #ff0000">
	// <span class="sourceRowText" role="presentation">red </span>
	// </span>
	// <em><span class="sourceRowText" role="presentation">italic</span></em>

	// note that this is called before rawInput()
	if (false) {
		try {
			for ( var mindex = 0; mindex < elem.childNodes.length; mindex++) {
				var msg = elem.childNodes[mindex];
				for ( var i = 0; i < msg.childNodes.length; i++) {
					if (!msg.childNodes[i].tagName
							|| msg.childNodes[i].tagName.indexOf('body') < 0) {
						continue;
					}
					var messageHtml = msg.childNodes[i].textContent;
					if (!messageHtml) {
						messageHtml = msg.childNodes[i].text; // InternetExplorer
					}
					messageHtml = unescape(messageHtml);
					messageHtml = messageHtml.replace(/\^/g, '%');
					messageHtml = unescape(messageHtml);
					messageHtml = $.trim(messageHtml);
					if (messageHtml.length > 0) {
						transcribe(transcriptEntry(agentIdent, messageHtml),
								'xmlInput');
					}
				}
			}
		} catch (e) {
			alert(e.message);
		}
	}
}

function rawOutput(data) {
	transcribe(new Date().format(L10N_TIME_FORMAT) + ' SENT: ' + data,
			'rawOutput');
}

function rawInput(data) {
	transcribe(new Date().format(L10N_TIME_FORMAT) + ' RECV: ' + data,
			'rawInput');
}
