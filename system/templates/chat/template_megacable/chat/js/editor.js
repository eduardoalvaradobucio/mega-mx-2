/**

    Editor is a View object that wraps around a CKEditor instance.
    It listens for the editor's events and do things such as 
    submitting user messages to the application's messenger.
    
**/
App.Editor = Backbone.View.extend({
    
    className : 'eg-chat-editor',

    template : _.template($('#tpl-editor').html()),

    events : {
        
        'click input[type=button]' : 'onFormSubmit',
		'keyup textarea' : 'onEditorTyping'
    },

    initialize : function() {

    },

    render : function() {
        
        var _this = this;
        
        //Hide the element first, we'll show it when the CKEditor instance
        //is ready.
        this.$el.hide();
        
        //Render
        this.$el.html(this.template());
        if($.browser.msie && $.browser.version == "7.0")
			this.$el.find('.submit-section').height('50px');
        //Create ckeditor if the visitor is not mobile.
        //(mobile visitors will just get plain <textarea>
        if(!App.utils.isVisitorMobile() && eGainLiveConfig.useTextEditor == 0) {
            
            //The ckEditor config.
            var ckEditorConfig = {

				startupFocus : false,
				scayt_autoStartup : false,
				enterMode : CKEDITOR.ENTER_BR,
				shiftEnterMode : CKEDITOR.ENTER_BR,
				toolbar : 'Basic',
				toolbarCanCollapse : false,
				height : 55,
				removePlugins : 'editingblock,undo,elementspath',
				resize_enabled : false,
					toolbar_Basic : [

						{name:'styles', items:['Bold','Italic', 'Underline']}
					]
			};
				
				//Insert smiley in the editor if eGainLiveConfig said so.
			if(eGainLiveConfig.showSmileyTool) {
				
				ckEditorConfig.toolbar_Basic.push({
					name:'insert',
					items:['Smiley']
				});
			}

			this.ckeditor = CKEDITOR.replace('editor', ckEditorConfig);

			this.ckeditor.on('focus', _.bind(this.onEditorFocus, this));
			this.ckeditor.on('blur', _.bind(this.onEditorBlur, this));
			this.ckeditor.on('key', _.bind(this.chatEditorKeystrokeHandler,this));    
			this.ckeditor.on('key', _.bind(this.onEditorTyping, this));
			this.ckeditor.on('cut', _.bind(this.onEditorTyping, this));
			this.ckeditor.on('paste', _.bind(this.onEditorTyping, this));
			this.ckeditor.on('focus', _.bind(this.onEditorTyping, this));
			this.ckeditor.on('focus', _.bind(stopTitleAlert, this));
			this.ckeditor.on('key', _.bind(stopTitleAlert, this));
			this.ckeditor.on('click', _.bind(stopTitleAlert, this));
			
			//On editor instance ready, we'll show the whole editor view.
			this.ckeditor.on('instanceReady', function() {				
				_this.$el.show();
				_this.$el.find('.cke_wrapper').css({
					'padding-bottom':'0',
					'border-radius': '0',
					'-webkit-border-radius': '0',
					'-moz-border-radius': '0'
				});
			});

        } else {
			$('textarea').wrap($('<div>').addClass('textareawrap'));
			this.$el.find('textarea').keypress(this.chatEditorKeystrokeHandler)
			.blur(this.onEditorBlur)
			.focus(this.onEditorFocus)
			.focus(this.onEditorTyping)
			.focus(stopTitleAlert)
			.keypress(stopTitleAlert)
			.click(stopTitleAlert)
			.bind('cut', this.onEditorTyping)
			.bind('paste', this.onEditorTyping);
            this.$el.show();
			this.$el.find('#typing_status').addClass('texteditor');
        }
		if(App.utils.isVisitorMobile()){
			this.$el.find('textarea').height(26);
			this.$el.find('.submit-section').css('position','static');
			$('#eg-chat-content').addClass('freefloating-submit-section');
		}
		App.chat_wrap_view.resize();
		App.chat_stream_view.resize();
		if(!App.utils.isVisitorMobile()){
			if(this.ckeditor)
				this.ckeditor.focus();
			else
				this.$el.find('textarea').focus();
		}
    },
    
    chatEditorKeystrokeHandler : function(event){
			if (customerIsTyping) {
				clearTimeout(customerIsTyping);
			}
			else {
				App.connection.sendTypingMessage();
			}
			customerIsTyping = setTimeout('App.connection.sendNotTypingMessage();', eGainLiveConfig.customerNoTypingTimeout);

			if ((event.data && event.data.keyCode == 13 )|| ( event.keyCode && event.keyCode == 13)) {
				if (navigator.userAgent.indexOf('Opera') >= 0) {
					setTimeout('App.editor.sendChat()', 10);
				}
				else {
					App.editor.sendChat();
				}
				
				return App.editor.chatEditorCancelEvent(event);
			}
	},
	
	chatEditorCancelEvent : function(evt) {
		evt.cancelBubble = true;
		if (typeof evt.cancel == 'function') evt.cancel();
		else evt.cancel = true;
		evt.returnValue = false;
		if (evt.preventDefault) evt.preventDefault();
		if (evt.stopPropagation) evt.stopPropagation();
		return false;
	},

	//Callback that will be called when the user submitted the message.
    onFormSubmit : function(e) {
        
        e.preventDefault();
		this.sendChat();
    },

    onEditorFocus : function() {
		App.editor.isfocus = true;
    },

    onEditorBlur : function() {
		App.editor.isfocus = false;
    },

    onEditorSave : function(e) {
		App.editor.chatEditorKeystrokeHandler(e);
    },
	
	sendChat : function(){
		
        var message_str = '';
		if( this.ckeditor)	{
			message_str  = this.ckeditor.getData();
		}
		else{
			message_str = this.$el.find('textarea').val();
		}
			
		if(message_str == '')
			return;	   

		//Submit the message string to the messenger
		if(App.connection.sendNormalMessage(message_str)){
			App.messenger.submitMessageString(message_str,'customer',App.session.get('name'));
			if( this.ckeditor)	{
				this.ckeditor.setData('');
			}
			else{
				this.$el.find('textarea').val('');
			}
		}
		if(!App.utils.isVisitorMobile()){
			if(this.ckeditor)
				this.ckeditor.focus();
			else
				this.$el.find('textarea').focus();
		}
		else{
			this.$el.find('textarea').blur();
			$('.window-view').focus();
		}
		this.onEditorTyping();
    },
	
	onEditorTyping : function(e){
		//timeout so that the length is calculated after operation is complete
		setTimeout(function(){
			try{
			var maxCharacterCount = eGainLiveConfig.maxMessageSize;
			var currentCount = 0;
			if(App.editor.ckeditor)
				currentCount = App.editor.ckeditor.getData().length;
			else
				currentCount =  App.editor.$el.find('textarea').val().length;
			var remainderCount = maxCharacterCount - currentCount;
			App.editor.showCharacterLeft(L10N_CHARACTER_COUNT.replace('{0}', remainderCount));	
			}catch(error){}
		},10);
	},
	/**
		Display the number of character left message
	**/
	showCharacterLeft :  function(msg){
		this.$el.find("#typing_status").html(msg);
    }
});
