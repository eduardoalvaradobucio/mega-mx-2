App.HeaderView = Backbone.View.extend({
        
    el : $('#eg-chat-header'),

    initialize : function() {
        
        console.log('header is initialized');

        App.session.on('start', this.onSessionStart, this);
        App.session.on('end', this.onSessionEnd, this);
        $('#eg-chat-header a.closechat').attr('title',L10N_WINDOW_CLOSE);
		$('#eg-chat-header a.closechat').click(_.bind(this.onEndSessionClick, this));
		
		if(App.utils.isVisitorMobile())
			$('#eg-chat-header').addClass('mobileDevice');
        
    },

    onSessionStart : function() {
        
        this.$('.buttons').fadeIn();
    },

	onEndSessionClick : function(e) {
        
        e.preventDefault();
		if(App.connection._connection != null && App.connection._connection.authenticated)
		{
			if (confirm(L10N_BROWSER_CLOSE_MESSAGE)) {
				App.connection.logout();
				//End the application's session.
				App.session.end();

			} else {
				if(App.editor.ckeditor)
					App.editor.ckeditor.focus();
			}
		}
		else
		{
			top.window.close();
		}
    },
    
    onSessionEnd : function() {

        this.$('.buttons').hide();
    }
});
