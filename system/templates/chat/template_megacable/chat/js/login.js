/**
    
    LoginView is the view that encapsulates the login form.

**/
App.LoginView = Backbone.View.extend({
    
    className : 'eg-chat-login',

    template : _.template($('#tpl-login').html()),

    events : {
        
        'submit form' : 'onFormSubmit',
        'focus input[type=text], textarea' : 'onInputFocus',
		'keydown textarea' : 'onEnter',
        'blur input[type=text], textarea, select' : 'onInputBlur'
	},

    initialize : function() {

        this._loginParameters = eGainLiveConfig.loginParameters;

        console.log(this._loginParameters);
        
        this.validator = new App.LoginValidator();

        $(window).on('resize.egain.login', _.bind(this.onWindowResize, this));
    },

    render : function() {
        var html = this.template({param:this._loginParameters, window:window})
        this.$el.html(html);
		if($.browser.msie && $.browser.version == "7.0")
			this.$el.find('.submit-section').height('50px');
		var _this =this;
		this.populateoptions(function(){
			$('#eg-chat-content').html(App.login.el);
			_this.$formWrap= _this.$el.find('.form-fields');
			_this.$formWrap.tinyscrollbar({ sizethumb: App.scrollsize });			
			App.login.resize();
		});
    },
	
	populateoptions : function(callback){
		App.connection.populateoptions(function(xml){
			/*
				<attributesInfo languageCode="en" countryCode="US" xmlns:ns2="com/egain/live/framework/bosh/gen" xmlns:ns4="urn:ietf:params:xml:ns:xmpp-stanzas" xmlns:ns3="jabber:client">
				    <ns2:attributeInfo>
				        <ns2:attributeName>account_type</ns2:attributeName>
				        <ns2:objectName>casemgmt::activity_data</ns2:objectName>
				        <ns2:internalValue>bank_checking,bank_saving,bank_cc,bank_cd</ns2:internalValue>
				        <ns2:defaultValue>bank_saving</ns2:defaultValue>
				        <ns2:displayValue>Checking,Saving,Credit Card,CD</ns2:displayValue>
				    </ns2:attributeInfo>
				</attributesInfo>
				*/
				try{
					var attributeName = $(xml).find('ns2\\:attributeName, attributeName').text();
					var objectName = $(xml).find('ns2\\:objectName, objectName').text();
					var internalValue = $(xml).find('ns2\\:internalValue, internalValue').text();
					var defaultValue = $(xml).find('ns2\\:defaultValue, defaultValue').text();
					var displayValue = $(xml).find('ns2\\:displayValue, displayValue').text();
					var parameterDefinitions = eGainLiveConfig.loginParameters;
					for ( var ij = 0; ij < parameterDefinitions.length; ij++) {

						var paramDef = parameterDefinitions[ij];

						if (paramDef.fieldType == 3 && paramDef.attributeName == attributeName && paramDef.objectName == objectName){

							var inputOptions = "";
							var internalValArray = internalValue.split(',');
							var displayValArray = displayValue.split(',');

							if (internalValArray.length == displayValArray.length) {

								for ( var i = 0; i < internalValArray.length; i++) {

									inputOptions += "<option value='";
									inputOptions += internalValArray[i];
									inputOptions += "'";

									if (internalValArray[i] == defaultValue)
										inputOptions += "selected='true'";

									inputOptions += ">";
									inputOptions += displayValArray[i];
									inputOptions += "</option>";
								}
							}
							App.login.$el.find("#" + paramDef.attributeName).append(inputOptions);
						}
					}
				}
				catch(error){}
				callback();
		
		});
	},

    onInputFocus : function(e) {

        var $input = $(e.target);
        
        if(!$input.attr('typed')) {

            $input.val('');
			$input.css('color','#000');
			$(e.target.parentElement).css("background-color","#FFFFFF")
			$(e.target.parentElement).css('-moz-box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
			$(e.target.parentElement).css('-webkit-box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
			$(e.target.parentElement).css('box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
            $input.attr('typed', true);
        } 
    },

    onWindowResize : function() {

        this.resize();
    },

    resize : function() {
		var width = $(window).width() ;
		var windowHeight = $(window).height() ;
		var topOffset = this.$el.offset().top;
        console.log('offset', topOffset);
       
        if(	App.chat_sidebar_view && App.chat_sidebar_view.isVisible()){
			
			width = width/2 - App.pageOffset;
			$('#eg-chat-content').css('width',width);
			$('#eg-chat-header').width(width);
			this.$el.find('.submit-section').width(width);
		}else{
			this.$el.find('.submit-section').width(width-App.pageOffset);
		}
		if(!App.utils.isVisitorMobile()){
			this.$el.height(windowHeight - topOffset -App.submitSectionHeight);
			var $form = this.$formWrap;
			var formOffset = $form.offset().top;
			var submitTop = this.$el.find('.submit-section').position().top;
			var height = submitTop-formOffset;
			$form.height(height);
			//bottom padding 28px for login form
			$form.find('.viewport').height(height-28);
			$form.find('.scrollbar').height(height-28);
			try{
				$form.tinyscrollbar_update('relative');
			}catch(error){}
		}
		if(App.utils.isVisitorMobile()){
			
			//alert($form.find('.viewport .overview').height());
			var $form = this.$formWrap;
			this.$el.height('auto');
			var height = $form.find('.viewport .overview').height();
			height = (windowHeight - topOffset -App.submitSectionHeight) < height ? (windowHeight - topOffset -App.submitSectionHeight) : height;
			$form.height(height);
			$form.find('.viewport').height(height);
			$form.find('.scrollbar').height(height);
			try{
				$form.tinyscrollbar_update('relative');
			}catch(error){}
			$('#eg-chat-content').addClass('freefloating-submit-section');
		}			
    },

    
    onInputBlur : function(e) {

        //Let's validate the input when it's blurred.
        var $input = $(e.target);
        var value = $input.val();
        var inputName = $input.attr('name');

        var errors = this._validateInputElement(e.target);

        console.log('errors', errors);
        
        //Show errors if there are some
        if(errors.length) {
            
            console.log('errors', errors);

            this._showInputValidationErrors(inputName, errors);

        } else {
            
            this._showInputValidatedSignal(inputName);
        }
    },

    _getInputParam : function(name) {

        return _.find(this._loginParameters, function(param) { 
            
            return param.attributeName == name;
        });
    },

    onFormSubmit : function(e) {
        
        e.preventDefault();

        var $form = $(e.target);
        var _this = this;

        //Get all the input elements references.
        var $inputs = $form.find("input[type=text], textarea, "+
                                 "select");
        
        var errors = {};
        //`formValues` is a map containing all the values of the inputs, with the
        //key being the attributeName of the form inputs.
        var formValues = {};

        //Go through each $input element.
        $inputs.each(function() {
            
            var name = $(this).attr('name');
            
            //Get the errors for the corresponding element.
            errors[name] = _this._validateInputElement(this);

            formValues[name] = $(this).val();
        });
        
        formValues['subject'] = $form.find('textarea[name="subject"]').val();
		

        //if there are still any errors, then show the errors and don't login.
        if(this._errorsArePresent(errors)) {
            
            this._showFormValidationErrors(errors);

        } else {

            //If not, then let's login and submit the initial message.

			this.login(formValues);         
            App.session.startWithInitialMessage(formValues['subject']);
        }
    },
	
	login : function(formValues){
		formValues['name'] = formValues['full_name'] ;
		if(!formValues['name'])
		{
			formValues['name'] = formValues['first_name'];
			formValues['name'] = formValues['name'] ?  (formValues['last_name'] ? ( formValues['first_name'] + ' ' +  formValues['last_name']) : formValues['name'] ): formValues['last_name']  ;
		}
		formValues['name'] = formValues['name'] || L10N_CUSTOMER;
		$(window).off('.egain.login');
		App.session.login(formValues);
	},

    _validateInputElement : function(input) {

        var $input = $(input);
        var name = $input.attr('name');
        var inputValue = $input.val();
        var param = this._getInputParam(name);
        var _errors = [];
		
		if(!$input.attr('typed') && inputValue == window[param.paramName]){
			$input.val('');
			inputValue ='';
		}
		//checking for name , email, etc.
        var err = this.validator.getInputValidationErrors(name,inputValue);
		if(err.length)
			return err;
        //Check emptiness / char minLength
        if((param.minLength == '1' || param.required == '1') 
            && inputValue.length == 0) {

            _errors.push(error_input);
        }
        //Check if the length is valid.
        else if(!(parseInt(param.minLength) <= inputValue.length)) {

            _errors.push(error_minLength.replace('{0}', param.minLength ));
        }
        
        //check count maxLength
        if(!(inputValue.length <= parseInt(param.maxLength))) {

            _errors.push(error_maxLength.replace('{0}', param.maxLength ));
        }
    
        //Check if the inputValue is valid based on the validationString.
        if(!this._validateInputValue(inputValue, param.validationString)) {

            _errors.push(error_invalidInput);         
        }

        return _errors;
    },

    _errorsArePresent : function(errors) {
        
        for(var key in errors) {
            
            if(errors[key].length > 0)
                return true;
        }

        return false;
    },

    _validateInputValue : function(inputValue, regexString) {

        return new RegExp(regexString, "g").test(inputValue);
    },
    
    /**

        Show the errors to the input wrap.
        
        @inputName - string - the name of the input validated
        @errors - arrays of string - the error messages of the input.

    **/
    _showInputValidationErrors : function(inputName, errors) {
        

        var $inputWrap = this
                        .$('.input-wrap[data-input-name="'+ inputName +'"]'); 

        var $errors = this
                        .$('.errors[error-input-name="'+ inputName +'"]');

       $inputWrap.find('.input-wrap-sub').css('background-color','#FEEDC1');
       $inputWrap.find('.input-wrap-sub').css('border-color' ,'#FF8109' );
       $inputWrap.find('.input-wrap-sub').css('-moz-box-shadow' ,'inset 0px 0px 2px 1px #FF8109' );
       $inputWrap.find('.input-wrap-sub').css('-webkit-box-shadow' ,'inset 0px 0px 2px 1px #FF8109' );
       $inputWrap.find('.input-wrap-sub').css('box-shadow' ,'inset 0px 0px 2px 1px #FF8109' );

       if(errors.length) {

            $inputWrap.find('.checkmark').hide();
            $inputWrap.find('.errormark').show();
            $errors.empty();
        }
        
        for(var i = 0; i < errors.length; i++) {

            $errors.append(errors[i]);
        }
		if($.browser.msie && $.browser.version == '7.0'){
			$errors.css('top','0');
			$inputWrap.find('.errormark').css('top','27px');
		}
    },

    _showInputValidatedSignal : function(inputName) {

        var $inputWrap = this
                        .$('.input-wrap[data-input-name="'+ inputName +'"]'); 


		$inputWrap.find('.input-wrap-sub').css('background-color','#FFFFFF');
		$inputWrap.find('.input-wrap-sub').css('border-color' ,'#B8B8B8 #B8B8B8 #B8B8B8 #B8B8B8' );
		$inputWrap.find('.input-wrap-sub').css('-moz-box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
		$inputWrap.find('.input-wrap-sub').css('-webkit-box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
		$inputWrap.find('.input-wrap-sub').css('box-shadow' ,'inset 0px 1px 2px 1px #B8B8B8' );
		$inputWrap.find('.errormark').hide();
		$inputWrap.find('.errors').empty();
		if($.browser.msie && $.browser.version == '7.0'){
			$inputWrap.find('.checkmark').css('top','29px');
		}
        $inputWrap.find('.checkmark').show();
    },

    _showFormValidationErrors : function(formErrors) {

        _.each(_.keys(formErrors), function(inputName) {
        
            var errors = formErrors[inputName];
        
            if(errors.length) {

                this._showInputValidationErrors(inputName,
                                                formErrors[inputName]);
            } else {

                this._showInputValidatedSignal(inputName);
            }

        }, this);
    },
	
	onEnter : function(e) {
		if(e.keyCode == 13 && !e.shiftKey){
			$('input[type=submit]').click();
			return false;
		}
    }
});
