// This hook customizes web form entry field for different type of subactivies.
function egainLiveCustomConfigHook()
{
	var subActivity = "chat";
	if (getUrlParameter('languageCode') && getUrlParameter('subActivity') != null) {
	         subActivity = getUrlParameter('subActivity').toLowerCase();
    	}
	eGainLiveConfig.showAudioButton = false;
	eGainLiveConfig.showVideoButton = false;
	if(eGainLiveConfig.loginParameters.length!=0 && subActivity=="delayedcallback"){
		eGainLiveConfig.loginParameters[eGainLiveConfig.loginParameters.length]={
												paramName : 'L10N_DELAY_TIME_PROMPT',
												objectName : 'casemgmt::activity_data',
												attributeName : 'delay_time_in_min',
												primaryKey : '0',
												required : '1',
												minLength : '1',
												maxLength : '10',
												fieldType : '1',
												validationString : ''
											}
	
	}
	if(eGainLiveConfig.loginParameters.length!=0 && (subActivity!="chat"))
	{
		var len =eGainLiveConfig.loginParameters.length;
		var i=1;
		for (i;i<len;i++)
		{
			if(eGainLiveConfig.loginParameters[i].attributeName=='phone_number')
			{
				eGainLiveConfig.loginParameters[i]= 			{
												paramName : 'L10N_PHONE_NUMBER_PROMPT',
												objectName : 'casemgmt::phone_number_data',
												attributeName : 'phone_number',
												primaryKey : '0',
												required : '1',
												minLength : '1',
												maxLength : '18',
												fieldType : '1',
												validationString : ''
											}
			}

		}	
			
	}
	return false;
}

//This hook displays custom messages.
function customWrapUpMessagesHook(condition){

	var returnVal = false;
    	App.chat_wrap_view.$el.html(App.chat_wrap_view.template());
    
	    //Append the wrap to the content parent element
	    $('#eg-chat-content').append(App.chat_wrap_view.$el);

	    App.chat_wrap_view.$('.box')          
		.append(App.chat_stream_view.el);
		  App.chat_stream_view.render();

            
	var CUSTOM_CONDITIONS= { 
			      "L10N_EXIT_TXT":L10N_EXIT_TXT,  
			      "L10N_LINES_ARE_BUSY":L10N_LINES_ARE_BUSY,
			      "L10N_SYSTEM_CANNOT_ASSIGN_AGENT":L10N_SYSTEM_CANNOT_ASSIGN_AGENT,
			      "L10N_MSG_CMB_FAILURE":L10N_MSG_CMB_FAILURE
			       };
			       
	App.chat_wrap_view.$('.window-view').hide(); 
	if(CUSTOM_CONDITIONS [condition]){
	    this.$('.notice').html(CUSTOM_CONDITIONS [condition]).show();
	    App.connection.confail = true;
	    return true;                                        
    	}

          return false;
}

//This hook validates that correct value is entered for the custom field in chat web form.
function customValidationHook(inputName, value,errors){
	var delayTime=null;
	var valid=false;
	if(inputName=="delay_time_in_min")
	{
		delayTime=value;
		valid=(delayTime.match(/[^0-9(\)]/) == null);
		if(!valid)
			errors.push(error_delay_time);
	}
}
