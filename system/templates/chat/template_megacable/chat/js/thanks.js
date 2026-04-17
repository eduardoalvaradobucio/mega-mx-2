/**

    ThanksView is a view object that is responsible
    for showing the final page.

**/
App.ThanksView = Backbone.View.extend({

    className : 'eg-chat-thanks',

    template : _.template($('#tpl-thanks').html()),

    events : {

        'submit form' : 'onSubmitForm'
    },

    initialize : function() {
		 App.chat_utilities_view = new App.ChatUtilitiesView();
        $(window).on('resize', _.bind(this.onWindowResize, this));
    },

    render : function() {

        this.$el.html(this.template());
		if($.browser.msie && $.browser.version == "7.0")
			this.$el.find('.submit-section').height('50px');

        $('#eg-chat-header a.closechat').attr('title',L10N_WINDOW_CLOSE_BUTTON);

        $('#eg-chat-content').html(this.$el);
		this.$('.box').append(App.chat_utilities_view.el);
		this.$el.find('.thanksBox').tinyscrollbar({ sizethumb: App.scrollsize });
		App.chat_utilities_view.render({

            'showFont' : false,
            'showVideo' : false,
            'showAudio' : false,
            'showChangeFont' : false,
            'showSaveTranscript' : true && !App.utils.isVisitorMobile(),
            'showPrintTranscript' : true,
            'showDivider' : true && !App.utils.isVisitorMobile(),
			'showFontDivider':false,
            'showFaq' : false
        });

        $(".eg-chat-utilities .buttons a.divider").addClass("divider-toolbar");
		$(".eg-chat-utilities .buttons a.js-save").addClass("save-left");
		$(".eg-chat-utilities .buttons a.js-print").addClass("print-left");

		//Use tooltip as text
        $(".eg-chat-utilities .buttons a").each(function(){ $(this).text($(this).attr("title"));});
		// Changing the size of the window.
		var height = eGainLiveConfig.chatThanksWindowHeight;
			if($.browser.msie && $.browser.version == '7.0')
				height+=10;
		else if($.browser.msie && $.browser.version == '8.0')
			height+=4;
		else if($.browser.mozilla)
			height+=10;
		var d = getDimensions('');
		if(App.offerConstraints.size){
			d.width = App.offerConstraints.size.width;
			height = App.offerConstraints.size.height;
		}
		if(top && top.resizeTo)
			top.resizeTo(d.width,height);
		this.resize();
    },

    onSubmitForm : function(e) {

        e.preventDefault();

		window.close();
    },

    onWindowResize : function(e) {

        this.resize();
    },

    resize : function() {

        var windowHeight = $(window).height();
		var width = $(window).width();
        var topOffset = this.$el.offset().top;
        console.log('offset', topOffset);
		this.$el.find('.submit-section').width(width-App.pageOffset);
		if(App.utils.isVisitorMobile()){
			var $form = this.$el.find('.thanksBox');
			this.$el.height('auto');
			var height = $form.find('.viewport .overview').height();
			height = (windowHeight - topOffset -App.submitSectionHeight) < height ? (windowHeight - topOffset -App.submitSectionHeight) : height;
			$form.height(height);
			$form.find('.viewport').height(height);
			$form.find('.scrollbar').height(height);
			try{
				$form.tinyscrollbar_update('relative');
			}catch(error){}
			this.$el.find('.submit-section').css('position','static');
		}
		else{
            this.$el.height(windowHeight - topOffset -App.submitSectionHeight);
			var $form = this.$el.find('.thanksBox');
			var formOffset = $form.offset().top;
			var submitTop = this.$el.find('.submit-section').position().top;
			var height = submitTop-formOffset;
			$form.height(height);
			$form.find('.viewport').height(height);
			$form.find('.scrollbar').height(height);
			try{
				$form.tinyscrollbar_update('relative');
			}catch(error){}
		}
    }
});
