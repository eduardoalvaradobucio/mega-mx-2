var eGainLiveConfig = {

	maxMessageSize : 800,

    showSidebar : false, //Show sidebar containing the iframe.

	showSmileyTool : true,

	sessionStastics	: 1, // This flag can have three values: 0 to show nothing, 1 to show wait time, 2 to show queue depth.. default value is 1.

    showAudioButton : true, //true to show audio button on the top.

    showVideoButton : true, //true to show video chat button on the top.

    minWidthForShowingSidebar : 796, //we only show sidebar if the window width is more than this. If the window resizes to less than this, then we have to force hide the sidebar,and show only the chat stream instead for better user experience.

	chatWindowWidthWithWidget : 830, //width of chat window with widget

	customerNoTypingTimeout : 5 * 1000, // milliseconds
	
	chatWindowWidth : 519, //required
	
	chatLoginWindowHeight : 723, //height of login page
	
	chatSurveyWindowHeight : 715, //height of survey page
	
	chatThanksWindowHeight : 650, //height of thankyou page

	chatWindowHeight: 778, //height of chat window

	cobrowseWindowWidth : -1, /* -2: leave it to the browser, -1: take up available width, +ve values: use the value */

	cobrowseWindowHeight : -1, /* -2: leave it to the browser, -1: take up available height, +ve values: use the value */

	autoLogin : 0, // This flag can have two values - 0 or 1: if 1, then autologin is set to true for these templates

	useTextEditor : 0, // This flag can have two values - 0 or 1: if 1, then text editor will be used instead of CKEditor.
	
	chatSoundURL : "sound/notify.wav",

	debug : 0, // This flag can have two values - 0 or 1: if 1, then $debug flag will be passed with Web Service requests and all requests and responses will be logged on the server.

	// These are the loginParameters that are displayed in the customer login page.
	// fieldType can be of three types: 1 - <input> i.e. text field; 2 - <textarea> i.e. text area; 3 - <select> i.e. dropdown
	loginParameters : [ {
		paramName : 'L10N_NAME_PROMPT',
		objectName : 'casemgmt::individual_customer_data',
		attributeName : 'full_name',
		primaryKey : '0',
		required : '1',
		minLength : '1',
		maxLength : '120',
		fieldType : '1',
		validationString : ''
	}, {
		paramName : 'L10N_EMAIL_PROMPT',
		objectName : 'casemgmt::email_address_contact_point_data',
		attributeName : 'email_address',
		primaryKey : '1',
		required : '1',
		minLength : '1',
		maxLength : '250',
		fieldType : '1',
		validationString : ''
	}, {
		paramName : 'L10N_PHONE_NUMBER_PROMPT',
		objectName : 'casemgmt::phone_number_data',
		attributeName : 'phone_number',
		primaryKey : '0',
		required : '0',
		minLength : '0',
		maxLength : '18',
		fieldType : '1',
		validationString : ''

	}, {
		paramName : 'L10N_NUMERO_SUSCRIPTOR_PROMPT',
		objectName : 'casemgmt::activity_data',
		attributeName : 'suscriptor',
		primaryKey : '0',
		required : '1',
		minLength : '10',
		maxLength : '10',
		fieldType : '1',
		validationString : ''

	}, {
		paramName : 'L10N_YOUR_QUESTION_PROMPT',
		objectName : 'casemgmt::activity_data',
		attributeName : 'subject',
		primaryKey : '0',
		required : '1',
		minLength : '1',
		maxLength : '800',
		fieldType : '2',
		validationString : ''
	}	]
};
