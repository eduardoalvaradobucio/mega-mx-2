App.Video = Backbone.Model.extend({
    initialize: function () {
        videoShowing: false
    },

    invite: function () {
        var CMD_CUST_INITIATE_VIDEO = 'custinitiatevideo';
        var customerIdent = "Customer";
        var sid = App.connection._connection.sid;
        var entryPointId = App.connection._connection.entryPointId
        var initiateVideoChatUrl = App.connection.BOSH_SERVICE + "/initiatevideochat";
		if(agentInitiatedVideo)
		{
			var msg = cust_cannot_offer_vchat.replace('{0}',agentName);
			alert(msg);
		}
		else
		{
			$.ajax({
				type: 'POST',
				url: initiateVideoChatUrl,
				data : {'sid' : sid,'entryPointId' : entryPointId,'customerIdent' : customerIdent},
				dataType: 'text',
				success: function (rettext) {
					if (rettext == "1") {
						var msgAgentConsole = customer_offer_text_to_video.replace('{0}',App.session.get('name'));
						var msgCustConsole = customer_offer_text_to_video_cust;
						var cssClass = 'chatInput headline';
						if(App.connection.sendNormalMessage(msgAgentConsole, 'headline', CMD_CUST_INITIATE_VIDEO))
							App.messenger.showNotification(msgCustConsole,cssClass);
					} else if(rettext == "-1"){
						alert(cannot_offer_vchat_as_already_invited);
					}
					else{
						alert(agent_not_available_for_vchat);
					}
				}
			});
		}
    },

    /**

        Include the logic to put Flash Video object here.

    **/
    show: function (wrapper_element){
        if (!this.videoShowing){
            $.ajax({
                type: 'GET',
                url: App.connection.GET_MEDIA_SERVER_URL,
                dataType: 'xml',
                success: function (xml) {
                    var mediaServerObj = new Object();
                    mediaServerObj.mediaServerURL = $(xml).find('mediaServer').attr('mediaServerURL');
                    mediaServerObj.mediaServerSecEnabled = $(xml).find('mediaServer').attr('mediaServerSecEnabled');
                    mediaServerObj.mediaServerSecToken = $(xml).find('mediaServer').attr('mediaServerSecToken');
                    mediaServerObj.mediaServerSecConnectParam = $(xml).find('mediaServer').attr('mediaServerSecConnectParam');
                    mediaServerObj.mediaServerSecPlayParam = $(xml).find('mediaServer').attr('mediaServerSecPlayParam');
                    mediaServerObj.mediaServerSecPublishParam = $(xml).find('mediaServer').attr('mediaServerSecPublishParam');

                    App.chat_video_view.mediaServerObject = mediaServerObj;
                    App.chat_video_view.video.videoShowing = true;
                    var url = "../../../web/view/live/videochat/videochat.html?height=186&width=330&lwidth=80&lheight=45&lx=10&ly=10&captureWd=426&captureHt=240";
                    $(wrapper_element).html('<iframe style="width:100%;height:100%;border:0;" SCROLLING=NO id="videoChatFrame" src="' + url + '">');

                }
            });
        }
    },

    /**

        Include the logic to delete the flash video object here.

    **/
    hide: function () {


    },

    stop: function (callback) {
    	var videoFrame = document.getElementById("videoChatFrame").contentWindow;    	
        videoFrame.stopVideoChat();
        //load blank in the frame
        $('iframe#videoChatFrame').load(function () { 
        	App.chat_video_view.video.videoShowing = false;
        	if(callback) callback();
        });
        document.getElementById("videoChatFrame").style.display = "none";
        videoFrame.location.href = "../../../web/blank.htm";  
    },

    pause: function () {
        var videoFrame = document.getElementById("videoChatFrame").contentWindow;
        videoFrame.pause();
    },

    resume: function () {
    	var videoFrame = document.getElementById("videoChatFrame").contentWindow;
        videoFrame.resume();
    },

    mike: function (flag) {
    	var videoFrame = document.getElementById("videoChatFrame").contentWindow;    	
        videoFrame.mike(flag);
    },
	
	getMikeStatus : function() {
    	var videoFrame = document.getElementById("videoChatFrame").contentWindow;    	
        return videoFrame.getMikeStatus();
    }		

});