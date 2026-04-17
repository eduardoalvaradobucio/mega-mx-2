/**

    ChatWrapView is the view object that wraps 4 views:
    
    - ChatVideoView
    - ChatUtilitiesView 
    - ChatStreamView
    - EditorView
**/
App.ChatWrapView = Backbone.View.extend({
    
    className : 'eg-chat-wrap',

    template : _.template($('#tpl-wrap').html()),

    initialize : function() {

        $('#eg-chat-content').empty();

        //Initialize all the subviews
        App.chat_video_view = new App.ChatVideoView();
        App.chat_utilities_view = new App.ChatUtilitiesView();
        App.chat_stream_view = new App.ChatStreamView();
        App.editor = new App.Editor();

        $(window).on('resize.egain.chatwrap', _.bind(this.onWindowResize, this));
    },

    render : function() {
        resizeWindow(CONFIG_DIALOGUE_WIDGET_URL, eGainLiveConfig.chatWindowHeight);
        $('#eg-chat-header a.closechat').attr('title',L10N_WINDOW_END_BUTTON);

        this.$el.html(this.template());

        //Append the wrap to the content parent element
        $('#eg-chat-content').append(this.$el);
        
        //Append the wrapper element of the subviews.
        this.$('.video')
            .append(App.chat_video_view.el);

        this.$('.box')
            .append(App.chat_utilities_view.el)
            .append(App.chat_stream_view.el)
            .append(App.editor.el);

        //Render all the subviews
        App.chat_video_view.render();
        App.chat_utilities_view.render({
            'showVideo' : eGainLiveConfig.showVideoButton && !App.utils.isVisitorMobile() ,
            'showAudio' : eGainLiveConfig.showAudioButton && !App.utils.isVisitorMobile() ,
            'showSaveTranscript' : true && !App.utils.isVisitorMobile(),
            'showChangeFont' : true,
            'showPrintTranscript' : true,
            'showDivider' : false,
            'showFontDivider':true,
			//show faq button only if kb url is configured
            'showFaq' : CONFIG_KNOWLEDGE_BASE_URL && CONFIG_KNOWLEDGE_BASE_URL.length>0
        });
		if(App.utils.isVisitorMobile())
			$('#eg-chat-content').addClass('noutilitiesbar');
        App.chat_stream_view.render();
		this.resize();
    },

    showSidebar : function() {

        this.$el.animate({width:400});
    },

    fulfillWidth : function() {
        
        var width = $(window).width() - App.pageOffset;

        $('#eg-chat-content').animate({width:width});
        this.$el.animate({width:width});
		App.chat_stream_view.resize();
    },

	showOffHours : function(){
		this.$el.html(this.template());

        //Append the wrap to the content parent element
        $('#eg-chat-content').append(this.$el);
        
        this.$('.box')          
            .append(App.chat_stream_view.el);
		  App.chat_stream_view.render();
          App.chat_stream_view.showOffHours();
    },
	
	showDuplicateSession : function() {
		this.$el.html(this.template());

        //Append the wrap to the content parent element
        $('#eg-chat-content').append(this.$el);
        
        this.$('.box')          
            .append(App.chat_stream_view.el);
		  App.chat_stream_view.render();
          App.chat_stream_view.showDuplicateSession();
	},

    resize : function() {
        
        //Resize height
        var windowHeight = $(window).height();
        this.$el.height(windowHeight - 300);

        var windowWidth = $(window).width();
        
        console.log(eGainLiveConfig.mi);

        //Resize width.
        //if the sidebar is visible and the eGainLiveConfig.showSidebar is true
        //,then resize to half the width
        //with some 20px padding buffer, if the windowWidth is still
        //wider than minWidthForShowingSidebar.
        if(eGainLiveConfig.minWidthForShowingSidebar < windowWidth
            &&
            eGainLiveConfig.showSidebar && App.chat_sidebar_view && App.chat_sidebar_view.isVisible())  {
            var width = windowWidth / 2 - App.pageOffset;
            this.$el.width(width);
			$('#eg-chat-content').css('width',width);
			$('#eg-chat-header').width(width);
			if(!App.utils.isVisitorMobile())
			this.$el.find('.submit-section').width(width);

        } else {
            
            //If the sidebar is not visible, then resize to whole window
            //width with 20px padding buffer.
			var width = windowWidth - App.pageOffset;
			this.$el.width(width);
			if(!App.utils.isVisitorMobile())
			this.$el.find('.submit-section').width(width);
        }
    },

    onWindowResize : function() {

        this.resize();
	}
});

	
/**
    
    ChatStreamView is the view object that is responsible for
    the stream of the chat messages views. It listens to the
    messenger for any new messages.

**/
App.ChatStreamView = Backbone.View.extend({
    
    className : 'eg-chat-stream',

    template : _.template($('#tpl-stream').html()),

    fonts : [
    	'10pt', '12pt', '14pt', '16pt', '14pt', '12pt'
    ],
    
    fontSeq : 0,
    currFont : 10,

    initialize : function() {
        
        //Listen to the messenger's events.
        App.messenger.on('new-message', this.onNewMessage, this);
        App.messenger.on('chatter-start-typing', 
                          this.onChatterStartTyping, this);
        App.messenger.on('chatter-stop-typing', 
                          this.onChatterStopTyping, this);
        App.messenger.on('notification', this.onNotification, this);

        App.chat_video_view.on('show', this.onVideoShowing, this);
        
        //Listen to window size change.
        $(window).on('resize.egain.chatstream', _.bind(this.onWindowSizeChange, this));
        
        //This is a map of temporary message bubbles, the key being
        //the typer's. 
        this._temporaryMessageViews = {};
    },

    render : function() {
        
        
        this.$el.html(this.template());
		this.$('.window-view').tinyscrollbar({ sizethumb: App.scrollsize });
        setTimeout(function(){App.chat_stream_view.resize();},450);
    },
    
    //Callback that will be called everytime the messenger
    //receives a message.
    onNewMessage : function(message) {
        
        console.log('new message on', message);
        
        //Get the first name of the chatter.
        var firstName = message.get('author');

        //On new message, we'll check whether there is already a temporary
        //message view for the message author.
        var messageView = this._getTemporaryMessageView(firstName);

        //Render the new messages, passing along the messageView
        this._renderMessage(message, messageView);
		var sizePt = this.currFont +"pt";
    	console.log('sizePt = ', sizePt);
    	$(".bubble").css('font-size',sizePt);
		this.arrangeTypingMessagesAtEnd();
		//try catch to prevent error in IE
		try{
			this.$('.window-view').tinyscrollbar_update('bottom');
		}catch(error){}
   },
    
	arrangeTypingMessagesAtEnd : function(){
		for(author in this._temporaryMessageViews){
			var msg = this._temporaryMessageViews[author];
			if(msg.$el){
				var parent = msg.$el.parent();
				msg.$el.detach();
				parent.append(msg.$el);
			}
		}
		var sizePt = Math.floor(this.currFont*0.8) +"pt";
    	console.log('typing sizePt = ', sizePt);
    	$(".typing").css('font-size',sizePt);
	},
    
    increaseFontSize : function() {
    
	   console.log('Currrent fontSize = ', this.currFont);
    	this.currFont++;
   		console.log('Font Size will be changed to = ', this.currFont);
    	var sizePt = this.currFont +"pt";
    	console.log('sizePt = ', sizePt);
    	$(".bubble").css('font-size',sizePt);
    	//try catch to prevent error in IE
		try{
			this.$('.window-view').tinyscrollbar_update('relative');
		}catch(error){}
	},
	
	 decreaseFontSize : function() {
	console.log('fontSeq = ', this.fontSeq);
    	if(this.currFont >=5)
    	{   this.currFont--;
			console.log('Font Size will be changed to = ', this.currFont);
    	    var sizePt = this.currFont +"pt";
    	    console.log('sizePt = ', sizePt);
			$(".bubble").css('font-size',sizePt);
			//try catch to prevent error in IE
			try{
				this.$('.window-view').tinyscrollbar_update('relative');
			}catch(error){}
    	}
	},
	
    //Callback that will be called everytime the server reports
    //that someone is typing.
    //Note : it needs the chatter name and also their type (agent or customer).
    onChatterStartTyping : function(chatter, type) {
        type = type || 'agent'; //make customer the default type

        //Get the first name of the chatter.
        var firstName = chatter||L10N_AGENT;
		var messageView = this._temporaryMessageViews[firstName];
		if(!messageView)
        this._createTemporaryMessageView(firstName, type);
		var sizePt = Math.floor(this.currFont*0.8) +"pt";
    	console.log('typing sizePt = ', sizePt);
    	$(".typing").css('font-size',sizePt);
    	//try catch to prevent error in IE
		try{
			this.$('.window-view').tinyscrollbar_update('bottom');
		}catch(error){}
    },
    
    //Temporary message view is basically a message view that shows a currently
    //typing message of a chatter. When that chatter finally submits a message,
    //we are going to reuse the same messageView to show the new message, so it 
    //appears that the newly submitted message pops up within the same bubble.
    _createTemporaryMessageView : function(author, type) {
        
        var messageView = new App.MessageView({author:author, temporary:true, type:type});

        this._temporaryMessageViews[author] = messageView;

        this._insertMessageView(messageView);
		
		messageView.timeoutId = setTimeout(function(){
			App.chat_stream_view._deleteTemporaryMessageView(messageView);
		}, 10000);
    },

    _deleteTemporaryMessageView : function(messageView) {
        
        if(messageView && messageView.options.temporary) {

            console.log('delete temporary message');
			messageView.$el.fadeOut();
			// we should completely remove the messageView.     
			setTimeout(function() {
             messageView.$el.remove();
				//Always scroll down to the bottom of the list.
				try{
					App.chat_stream_view.$('.window-view').tinyscrollbar_update('bottom');
				}catch(error){}
			 },800);
            
            delete this._temporaryMessageViews[messageView.options.author];
        }
    },

    _getTemporaryMessageView : function(author) {

        return this._temporaryMessageViews[author];     
    },
    
    onChatterStopTyping : function(chatter) {

        var firstName = chatter||L10N_AGENT;
        var messageView = this._temporaryMessageViews[firstName];
		this._deleteTemporaryMessageView(messageView);
    },
    
    /**

        Callback that will be called when
        the window size changes. 

    **/
    onWindowSizeChange : function(e) {

        console.log('on window size change!'); 
        this.resize();
    },

    onNotification : function(message) {
        
        var $hDiv = $('<div class="notification-message"/>');
        var $notification = $('<span/>'); 

        $notification.html(message);

        $hDiv.append($notification);
        this.$('.window-view ul').append($hDiv);
        $("#convertvideo").parent().parent().css("border-width","0px");
        $("#convertvideo").parent().parent().css("text-align","left");
        $("#convertvideo").parent().css("padding","0px");
         //Always scroll down to the bottom of the list
		 this.arrangeTypingMessagesAtEnd();
		try{
		this.$('.window-view').tinyscrollbar_update('bottom');
		}catch(error){}
    },

    resize : function() {

        var window_height = $(window).height();
        var offset = this.$el.find('.window-view').offset();

        console.log('offset', offset);
        console.log('window height', window_height);
		//110 for editor and  submit section
        var height = window_height - offset.top - (110+App.submitSectionHeight);
		if($.browser.msie && $.browser.version == '7.0')
			height+=4;
		else if($.browser.msie && $.browser.version == '9.0' && eGainLiveConfig.useTextEditor == 0 )
			height-=11;
		if(App.utils.isVisitorMobile()){
			height+=50;
			if(height<100)
				height= 100;
		}
		console.log('height', height);
        this.$('.window-view').height(height);
		this.$('.viewport').height(height);
		this.$('.scrollbar').height(height);
		//try catch to prevent error in IE
		try{
			this.$('.window-view').tinyscrollbar_update('relative');
		}catch(error){}
    },
    
    /**
        Show the queue status.
    **/
    showQueueStatus : function(queueStatus) {

		if(queueStatus != undefined && queueStatus != null)
			this.$('.queue-status').html(queueStatus).css("display",'inline');
		else
			this.$('.queue-status').html("").css("display",'none');
    },
	
	
    /**


    **/
    showConnectionError : function() {

        this.$('.notice').html(L10N_CONNFAIL).show();
    },
        
     /**

        Show off hour agent message.

    **/
    showOffHours : function() {
		this.$('.window-view').hide();
        this.$('.notice').html(L10N_OFF_HOURS).show();
    },
	
	showDuplicateSession : function() {
		this.$('.window-view').hide();
        this.$('.notice').html(L10N_SESSION_EXISTS).show();
	
	},
    
    showTypingStatus : function(name, type) {
        
         
    },
    
    /**
        
        This is the specific animating resize function that
        will be called when the video is slided down.

    **/
    onVideoShowing : function(isShowingVideo) {
        
        console.log('on video showing', isShowingVideo);

        setTimeout(function(){App.chat_stream_view.resize()},370);
    },
    
    _renderMessage : function(message, messageView) {
        
        if(messageView) {
            //If there is already a temporaru messageView, insert the message to the
            //messageView, allowing it to transform from a temporary to a real one.
            messageView.insertMessage(message);

        } else {
            var messageView = new App.MessageView({message:message});
            //Insert the messageView
            this._insertMessageView(messageView);
        }
    },

    /**

        Inserts a single message view to the stream.

        @param : An App.Message model instance.

    **/
    _insertMessageView : function(messageView) {
        
        this.$('ul').append(messageView.el);

        //Render the message view.
        messageView.render(true);
        
        //Always scroll down to the bottom of the list.
		try{
		this.$('.window-view').tinyscrollbar_update('bottom');
		}catch(error){}
    }
});


/**
    
    ChatUtilitiesView responsible for auxiliary functionalities such as 
    saving, printing, call, increase and decrease font size.

**/

App.ChatUtilitiesView = Backbone.View.extend({
    
    className : 'eg-chat-utilities',

    template : _.template($('#tpl-utilities').html()),

    events : {

        'click #videoBt' : 'onShowVideoClick',
        'click #audioBt' : 'onShowAudioClick',
		'mouseover #audioBt' : 'onAudioMouseOver',
		'mouseout #audioBt' : 'onAudioMouseOut',
        'click .js-save' : 'onSaveClick',
		'click .js-print' : 'onPrintClick',
        'click .js-click_to_call' : 'onClickToCallClick',
        'click .js-faq' : 'onFaqClick',
        'click .increase-font' : 'onIncreaseFontClick',
        'click .decrease-font' : 'onDecreaseFontClick'
    },
    
    initialize : function() {

         
    },

    render : function(options) {

        //We can put these settings on eGainLiveConfig.js
        this.$el.html(this.template(options));
    },

    onSaveClick : function() {

		chatSave();
    },
	
	onPrintClick : function() {
		chatPrint();
	},

    onShowVideoClick : function(e) {

        e.preventDefault();
        App.chat_video_view.show();
    },
    
    onShowAudioClick : function(e) {
	
	        e.preventDefault();
	        App.chat_video_view.audioClick();
    },

    onDecreaseSizeClick : function(e) {

        e.preventDefault();
    },

    onFaqClick : function(e) {
        e.preventDefault();
		if(CONFIG_KNOWLEDGE_BASE_URL && CONFIG_KNOWLEDGE_BASE_URL.length>0){
			var url = CONFIG_KNOWLEDGE_BASE_URL+ '#q='	+ escape(App.session.get('subject'));
			var target = CONFIG_KNOWLEDGE_BASE_TARGET;
			if (target == '_parent') {
				window.opener.location.href = url;
			} else if (target == '_self') {
				window.location.href = url;
			} else if (target == '_top') {
				window.top.location.href = url;
			} else if (target == '_new') {
				window.open(url);
        } else {
				window.open(url, target, CONFIG_KNOWLEDGE_BASE_FEATURES);
			}
        }
    },

        

    onClickToCallClick : function(e) {

        e.preventDefault();
        
        this.trigger('click-to-call');
    },

    onIncreaseFontClick : function(e) {
        
        e.preventDefault();

        App.chat_stream_view.increaseFontSize();
    },

    onDecreaseFontClick : function(e) {

        e.preventDefault();

        App.chat_stream_view.decreaseFontSize();
    },
	/**
		Function called when pointer goes over audio button
	*/
	onAudioMouseOver : function(e){
		$audiobt = $("#audioBt");
		if(typeof App.chat_video_view.video.videoShowing != 'undefined' && App.chat_video_view.video.videoShowing && !$audiobt.hasClass('active'))
			$audiobt.addClass('hover');
		return true;
	},
	/**
		Function called when pointer goes out of audio button
	*/
	onAudioMouseOut : function(e){
		$audiobt = $("#audioBt");
		if($audiobt.hasClass('hover'))
			$audiobt.removeClass('hover');
    }
});

/**

    ChatVideoView is the view that wraps Adobe Flash Video Chat object.

**/

App.ChatVideoView = Backbone.View.extend({
    
    className : 'eg-chat-video',   
    
    mediaServerObject : null,

    template : _.template($('#tpl-video').html()),

    events : {

        'click .pause-video' : 'pauseVideo',
        'click .resume-video' : 'resumeVideo',
        'mouseenter' : 'onMouseEnter',
        'mouseleave' : 'onMouseLeave'
    },

    initialize : function() {
        
        this.videoInitialized = false;
		this.paused = false;
        this.video = new App.Video();
    },

    initializeVideo : function(val) {
        
        this.videoInitialized = val;
        $('#audioBt').addClass('active');
		$('#audioBt').attr('title', L10N_MUTE);
		$('#videoBt').click();
    },
    
    hideVideo : function() {  
    	if(this.video.videoShowing)
    		this.show(false);
    },
    
    isVideoShowing : function() {
    	return this.video.videoShowing;
    },
    setVideoChatConfig : function(obj) {          
        obj.send = true;
	obj.agent = 0;
	if(App.connection.avmode == 1){
		obj.video = false;
		obj.audio = false;
	}
	else{
		obj.video = true;
		obj.audio = true;	
	}
	obj.publishid =  "customer_" + App.connection._connection.sid;
	obj.subscribeid =  "agent_" + App.connection._connection.sid;
	obj.serverurl = this.mediaServerObject.mediaServerURL;
	obj.isSecure = (this.mediaServerObject.mediaServerSecEnabled == '1') ? true : false,
	obj.secureToken = this.mediaServerObject.mediaServerSecToken;
	obj.doConnectToken = this.mediaServerObject.mediaServerSecConnectParam;
	obj.doPlayToken = this.mediaServerObject.mediaServerSecPlayParam ;
	obj.doPublishToken = this.mediaServerObject.mediaServerSecPublishParam;
	obj.avmode = App.connection.avmode;
	return obj;
    },    
    
    render : function() {
        
        this.$el.html(this.template());
        this.$el.hide();

    },

    show : function(notify) {
        if(!App.connection.sid)
			return;
        var $videoButton = $("#videoBt");
		var $audioButton = $('#audioBt');
        
        if(this.videoInitialized)
        	this.$el.slideToggle(function(){
				App.chat_stream_view.resize();
			});

        if(this.$el.hasClass('visible')) {
        	
        		this.stopVideo();
			
			//Check if the close message needs to sent to the agent.
			//Close should not be sent if the close is a result of agent closing the video
			if(typeof notify == 'undefined' || notify == true)
			{
				var msg = video_chat_ended_cust.replace('{0}',App.session.get('name'));
				var cssClass = 'chatInput headline';
				if(App.connection.sendNormalMessage(msg, 'headline', 'stopVideo'))
					App.messenger.showNotification(msg,cssClass);
			}
	
			this.video.videoShowing = false;
       	 	$videoButton.removeClass('active');
			$videoButton.attr('title',L10N_VIDEO_CHAT);
			//audio to off state
			$audioButton.removeClass('active');
			$audioButton.removeAttr('title');
			$audioButton.addClass('inactive');
			this.$el.toggleClass('visible');
        	//Pass isVideoShowing as false
        	this.trigger('show', false);

        } else {
        
        	if(this.videoInitialized)
        	{
		    //Get the flash wrap element.
				var flashWrap = this.$('.flash-wrap')[0];

				//And pass it to the video model.
				this.video.show(flashWrap);

				$videoButton.addClass('active');
				$audioButton.removeClass('inactive');
				$audioButton.addClass('active');
				$audioButton.attr('title',L10N_MUTE);
				this._hideTimeout = setTimeout(_.bind(this.hideControls, this),
							   1000);

				//Pass isVideoShowing as true
				this.trigger('show', true);
				$videoButton.attr('title',L10N_CLOSE_VIDEO);
				this.$el.toggleClass('visible');
			    
			    if(App.connection.avmode == 1){
			    	$audioButton.hide(); 
			    	$videoButton.hide(); 
			    }
			}
			else
			{
				this.video.invite();
			}
        }

        
    },

    pauseVideo : function() {
		this.paused = true;
		this.$('.pause-video').hide();
		this.$('.resume-video').show();
        this.video.pause();
		$("#audioBt").removeClass('active');
    },
    
    resumeVideo : function() {
		this.paused = false;
		this.$('.pause-video').show();
		this.$('.resume-video').hide();
        this.video.resume();
		if(this.video.getMikeStatus())
			$("#audioBt").addClass('active');
		else 
			$("#audioBt").removeClass('active');
    },
    

    stopVideo : function(callback) {
        this.video.stop(callback); 
    },
    

    pauseAudio : function() {

        this.video.mike(false);
    },

    resumeAudio : function() {

        this.video.mike(true); 
    },    
    
    audioClick : function(e){
		if(typeof App.chat_video_view.video.videoShowing != 'undefined' && App.chat_video_view.video.videoShowing){
	    	var $audioButton = $("#audioBt");
	
	        if($audioButton.hasClass('active')) {
	    
	                $audioButton.removeClass('active');
					$audioButton.attr('title', L10N_UNMUTE);
	                this.pauseAudio();
	    
	        } else {
	        	$audioButton.addClass('active');        	
				$audioButton.attr('title', L10N_MUTE);
	        	this.resumeAudio();
	        }
		}
    
    },    

    onMouseEnter : function() {

        if(App.connection.avmode != 1){
        if(this._hideTimeout)
            clearTimeout(this._hideTimeout);

        this.showControls();
        }
    },

    onMouseLeave : function() {

        this._hideTimeout = setTimeout(_.bind(this.hideControls, this), 500);
    },

    showControls : function() {
		if(this.paused){
			this.$('.pause-video').hide();
			this.$('.resume-video').show();
		}
		else{
			this.$('.pause-video').show();
			this.$('.resume-video').hide();
		}
        this.$('.flash-controls').fadeIn();
    },

    hideControls : function() {

        this.$('.flash-controls').fadeOut();
    }
});


/**

    ChatSidebarView is the view that wraps the sidebar.

**/
App.ChatSidebarView = Backbone.View.extend({

    el : $('#eg-chat-sidebar'),

    initialize : function() {
        
        $(window).on('resize.egain.sidebar', _.bind(this.onWindowResize, this));
    },

    render : function() {
        var url = 'blank.html';
		if (url && url.length > 0) {
			this.$sideFrame = $('<iframe>').attr({'src': url,'id':'sideFrame'}).css({width:'100%',height:'100%',border:0,background:'white'})
				.appendTo(this.$el.find('.sideFrameDiv'));
		} 
        this.resize();
    },

	setURL : function(url){
			document.getElementById('sideFrame').contentWindow.location.href = url;
	},

    isVisible : function(){ 

        return this.$el.hasClass('visible');
    },

    resize : function() {

        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        
			this.$el.height(windowHeight);
			//bottom and top padding 22px
			this.$el.find('.sideFrameDiv').height(windowHeight - 22);
        //If the width is less than the minmum with for showing sidebar, then we'll just hide it.
        if(eGainLiveConfig.minWidthForShowingSidebar > windowWidth || !eGainLiveConfig.showSidebar) {
            this.hide();
        } else {
			this.show();
        }
			this.$el.width(windowWidth / 2 - App.pageOffset/2);
    },

    onWindowResize : function() {

        this.resize();
    },

    show : function() {
        if(!this.isVisible()) {
       		this.$el.show();
			this.$el.addClass('visible');
			this.$el.animate({'margin-right' : 0});
		}
    },

    hide : function() {
        this.$el.removeClass('visible');
		var width = $(window).width()-App.pageOffset;
		$('#eg-chat-content').width(width);
		$('#eg-chat-header').width(width);
        this.$el.hide(); 
    }
});

App.ChatHeaderView = Backbone.View.extend({

});

var agentCssList = new Array();
/**
    
    MessageView is the view object that is responsible
    for a single chat message. It shows the data of 
    an App.Message instance.

**/
App.MessageView = Backbone.View.extend({

    template : _.template($('#tpl-message').html()),

    className : 'eg-chat-message',

    initialize : function(options) {
        
        this.message = options.message;

        this.temporary = !!options.temporary;
        this.author = options.author;
        this.type = options.type;
		this.cssList = new Array('','agent3','agent2','agent1');
        console.log("TEMPORARY", this.temporary);
    },

    render : function() {
        
        var _this = this;

        if(this.temporary) {

            this.$el.html(this.template({temporary:this.temporary, author:this.author}));
            this.temporary = false;
            var dotCount = 1;


            //Add the message type class
            this.$el.addClass(this.type);
			if(this.type == 'agent')
			{
				var cssClass = this.getCssClass(this.author);
				if(cssClass != undefined && cssClass!= '' )
					this.$el.addClass(cssClass);
			}
			//Apply the right-to-left text direction to the body element if the config says so.
			if(chattextClass === 'chattextRtl') {
			
				this.$('.body').css({'direction':'rtl'});
			}
			this.$el.find(".author").addClass("typing");
			this.$el.find(".bubble").addClass("typing");

        } else {
            
            this.$el.html(this.template({temporary:this.temporary, message:this.message}));

            //Add the message type class
            this.$el.addClass(this.message.get('type'));
			if(this.message.get('type') == 'agent')
			{
				var cssClass = this.getCssClass(this.message.get('author'));
				if(cssClass != undefined && cssClass!= '' )
					this.$el.addClass(cssClass);
			}
        }
        
       this.$el.fadeIn(function(){
       		//try catch to prevent error in IE
			try{
				if(App.chat_stream_view)
					App.chat_stream_view.$('.window-view').tinyscrollbar_update('bottom');
			}catch(error){}
		});
    },
	
	getCssClass : function(agent){
		var cls ='';
		var cssLen = 0;
		var id = 0;	
			cls = agentCssList[agent];
			if(cls == undefined || cls == null)
			{
				for(a in agentCssList)
					cssLen++;
				id = cssLen%this.cssList.length;			
				cls = agentCssList[agent] = this.cssList[id];				
			}
		return cls;
	},
        
    //This is a method that transform a messageView to a real one.
    //(Basically it just inserts the body and the bottom information)
    insertMessage : function(message) {
    
        if(this._interval) clearInterval(this._interval);
		if(this.timeoutId) clearTimeout(this.timeoutId)
		this.$el.hide();
		var parent = this.$el.parent();
		this.$el.detach();
		
		this.options.temporary = false;
        console.log('new message', message);
        this.$el.find(".author").removeClass("typing");
        this.$el.find(".bubble").removeClass("typing");

        this.$el.find('.body').html(message.get('body'));
        this.$el.find('.bottom').html('<b>'+message.get('author') + '</b> &bull; ' + new Date().format(L10N_TIME_FORMAT));
        App.chat_stream_view._temporaryMessageViews[message.get('author')] = null;
        delete App.chat_stream_view._temporaryMessageViews[message.get('author')];
		parent.append(this.$el);
		this.$el.fadeIn(function(){
			//try catch to prevent error in IE
			try{
				if(App.chat_stream_view)
					App.chat_stream_view.$('.window-view').tinyscrollbar_update('bottom');
			}catch(error){}
		});
    }
});
