/**
    
    Session is the single model that constitutes a single chat session.
    Upon login submission success, App.Session will be instantiated and it will set up submodels (Connection) and subviews (ChatWrapView) that it needs.

**/
App.Session = Backbone.Model.extend({
    
	initialize : function(){
		 //Create the connection object
		App.connection = new App.Connection();
		App.audio = new App.Audio();
	},
    start : function() {
        
       //connect to the server
        App.connection.connect(this.attributes.email);
        //Initialize the messenger
        App.messenger = new App.Messenger();
            
        //Initialize the chat wrap view
        App.chat_wrap_view = new App.ChatWrapView();
        App.chat_wrap_view.render();

        this.trigger('start');
    },

    login : function(info) {
        
        this.set(info);
		this.start();
    },

    startWithInitialMessage : function(firstMessageString) {
        
        //start should be after a successful login
        setTimeout(function() {
        	//elayala 20170412
			var wait_message = null;
			wait_message = L10N_WAIT_MESSAGE;
			
            //Submit the initial message as the customer.
			firstMessageString = wait_message + firstMessageString.replace('\n','<br/>');
            App.messenger.submitMessageString(firstMessageString, 'customer',App.session.get('name'));

        }, 500);
    },

    end : function() {
	//unbind resize event from window not showing
	$(window).off('.egain.chatwrap');
	$(window).off('.egain.chatstream');
	if(App.chat_sidebar_view){
		App.chat_sidebar_view.hide();
		$(window).off('.egain.sidebar');
	}
	//Initialize the SurveyView and renders it.
	//If the video was showing first stop and remove the video and then render the survey
	if(App.chat_video_view.isVideoShowing()){
		App.chat_video_view.stopVideo(function(){			
			App.session.showSurvey();
		});
	}
	else
	{
		this.showSurvey();
	}

	this.trigger('end');
    },
    
    showSurvey : function() {
        //App.surveyView = new App.SurveyView();
        //App.surveyView.render();
	App.thanksView = new App.ThanksView();
	App.thanksView.render();

    }
})
