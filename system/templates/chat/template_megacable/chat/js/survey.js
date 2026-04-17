/**

    SurveyView is a view object that is responsible
    for showing and submitting the survey form.

**/
App.SurveyView = Backbone.View.extend({

    className : 'eg-chat-survey',

    template : _.template($('#tpl-survey').html()),

    events : {

        'submit form' : 'onSubmitForm'
    },

    initialize : function() {
		 App.chat_utilities_view = new App.ChatUtilitiesView();
        $(window).on('resize.egain.survey', _.bind(this.onWindowResize, this));
    },

    render : function() {
		var height = eGainLiveConfig.chatSurveyWindowHeight;
		if($.browser.msie && $.browser.version == '7.0')
			height+=10;
		else if($.browser.msie && $.browser.version == '9.0')
			height-=10;
		else if($.browser.mozilla)
			height-=10;
		if(!(CONFIG_KNOWLEDGE_BASE_URL && CONFIG_KNOWLEDGE_BASE_URL.length>0)){	
			height+=53;
		}
		var d = getDimensions('');
		if(App.offerConstraints.size){
			d.width = App.offerConstraints.size.width;
			height = App.offerConstraints.size.height;
		}
		if(top && top.resizeTo)
			top.resizeTo(d.width,height);
        this.$el.html(this.template());
		if($.browser.msie && $.browser.version == "7.0")
			this.$el.find('.submit-section').height('50px');
        

 		$('#eg-chat-header a.closechat').attr('title',L10N_WINDOW_CLOSE_BUTTON);

        //Initialize the raty plugin.
        this.$('#answerability, #promptness, #would-suggest').raty({

            path : 'libs/img',
            hints: [L10N_POOR, L10N_FAIR, L10N_GOOD, L10N_VERY_GOOD, L10N_EXCELLENT]
        });
		$('#eg-chat-content').css('width','100%');
		$('#eg-chat-header').width('100%');
        $('#eg-chat-content').html(this.$el);
		this.$('.box').append(App.chat_utilities_view.el);
		App.chat_utilities_view.render({

            'showFont' : false,
            'showVideo' : false,
            'showAudio' : false,
            'showSaveTranscript' : true && !App.utils.isVisitorMobile(),
            'showChangeFont' : false,
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

		$("#surveyText").focus(function() {
			if ($('#surveyText').val() == L10N_SURVEY_ADDITIONAL)
				$('#surveyText').val('');
				return true;
		});
		
		$("#surveyText").blur(function() {
			if ($('#surveyText').val() == '')
				$('#surveyText').val(L10N_SURVEY_ADDITIONAL);
		});		
		this.$el.find('.form-fields').tinyscrollbar({ sizethumb: App.scrollsize });
		this.resize();
    },

    onSubmitForm : function(e) {

        e.preventDefault();

        //Get all the ratings of all the input fields.
        var answerability = $('#answerability').raty('score');
        var promptness = $('#promptness').raty('score');
        var would_suggest = $('#would-suggest').raty('score');

		if (eGainLiveConfig.maxMessageSize)
			surveyCommentSize = eGainLiveConfig.maxMessageSize;

		if ($('#surveyText').val().length > surveyCommentSize) {
			if (L10N_SURVEY_VALIDATION_ERROR
					&& L10N_SURVEY_VALIDATION_ERROR.length > 0) {
				alert(L10N_SURVEY_VALIDATION_ERROR);
			}
			return;
		}

		var surveyURL = App.connection.SURVEY_URL;
		var inputXML = '<egainSurvey sid="' +App.connection.sid + '" xmlns="http://bindings.egain.com/chat">';
		inputXML += '<survey>' //
				+ '<question>' //
				+ xmlEscape(L10N_SURVEY_Q1) //
				+ '</question>' //
				+ '<answer>' //
				+ answerability //
				+ '</answer>' //
				+ '</survey>';
		inputXML += '<survey>' //
				+ '<question>' //
				+ xmlEscape(L10N_SURVEY_Q2)//
				+ '</question>' //
				+ '<answer>' //
				+ promptness //
				+ '</answer>' //
				+ '</survey>';
		inputXML += '<survey>' //
				+ '<question>' //
				+ xmlEscape(L10N_SURVEY_Q3) //
				+ '</question>' //
				+ '<answer>' //
				+ would_suggest //
				+ '</answer>' //
				+ '</survey>';
		inputXML += '<survey>' //
				+ '<question>surveyText</question>' //
				+ '<answer>' //
				+ xmlEscape($('#surveyText').val()) //
				+ '</answer>' //
				+ '</survey>';
		inputXML += '</egainSurvey>';

		//Put the ajax code to submit survey results below here...
		$.ajax( {
			url : surveyURL,
			type : 'POST',
			contentType : 'text/XML',
			data : inputXML,
			processData : false,

			dataType : 'xml',
			success : function(data) {

			}
		});
		//unbind resize event of this window
		$(window).off('.egain.survey');

		//Initialize the ThanksView and renders it.
		App.thanksView = new App.ThanksView();
        App.thanksView.render();
    },

    onWindowResize : function(e) {

        this.resize();
    },

    resize : function() {

        var windowHeight = $(window).height();
		var windowWidth = $(window).width();
        var topOffset = this.$el.offset().top;

		this.$('.submit-section').width(windowWidth-App.pageOffset);
		
		if(App.utils.isVisitorMobile()){
			var $form = this.$el.find('.form-fields');
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
			this.$el.height(windowHeight-App.submitSectionHeight-topOffset);
			var $form = this.$el.find('.form-fields');
			var formOffset = $form.offset().top;
			var submitTop = $('.submit-section').position().top;
			var height = submitTop-formOffset;
			$form.height(height);
			$form.find('.viewport').height(height);
			$form.find('.scrollbar').height(height);
			try{
				$form.tinyscrollbar_update('relative');
			}catch(error){}
		}
        console.log('offset', topOffset);

    }
});
