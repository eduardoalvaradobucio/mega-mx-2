/**

    Messenger object is basically the model that is responsible for
    all the message shuttling between the server and the client.

    To submit a message to the messenger (for example, from the connection)
    , you can do this:
    
    App.messenger.submitMessage(new App.Message({

        body : 'testing',
        author : 'Agent',
        type : 'agent' // or 'customer'
    });

**/

App.Messenger = Backbone.Model.extend({
    
    initialize : function() {
        
        this.connection = new App.Connection();
        
        //Transcript array contains all the messages that have been submitted
        //through the messenger so we can fetch them later (eg. for save and print
        //transcript functionalities)
        this._transcript = [];
    },

    submitMessage : function(message) {
    	
        this._transcript.push(message);        
        this.trigger('new-message', message);
    },

    submitMessageString : function(str, type, author,cssClass) {
        
        //randomize the message type for showing purposes.
        var type = type|| ['customer', 'agent'][Math.floor(Math.random()*2)]; 
		var author = author || L10N_CUSTOMER;
        var message = new App.Message({

            body:str || 'empty message', 
            author:author,
            type:type,
			time : new Date().format(L10N_TIME_FORMAT),
			cssClass : cssClass || "chatOutput"
        });
		
        this.submitMessage(message);
    },
    
    /**

        Call this method to show notification .

        Example : App.messenger.showNotification('Varsha has joined the chat.');

    **/
    showNotification : function(message,cssClass){
        this._transcript.push({
			message : message,
			cssClass : cssClass
		});
        this.trigger('notification', message);
    },

    addCBParamsToMsg: function(egCmd){
        var cbCmd = egCmd.substring(11);
        cbCmd = replaceHexToASCII(cbCmd);
        var cmd = eval('('+cbCmd+')');
        var action;
        var sessionId;
        var customerName;
        if(typeof(cmd) != 'undefined' && cmd.action == "add_anchor"){
            action = cmd.action;
            sessionId = cmd.sessionId;
            customerName = cmd.custName;
        }
        var length = this._transcript.length;

        for(var i=length; i > 0; i--){

            if(this._transcript[i-1].message && this._transcript[i-1].message.indexOf(sessionId) > 0){
                 this._transcript[i-1].cbAction = action;
                 this._transcript[i-1].cbSession = sessionId;
                 this._transcript[i-1].cbCustName = customerName;

            break;
            }
        }

    },

    /**

        Call this method to show error notification .

    **/
    showErrorNotification : function(cssClass){
        if(App.connection.connected){
			this._transcript.push({
				message : connection_error_message,
				cssClass : cssClass
			});
			App.connection.connected = false;
			this.trigger('notification', connection_error_message);
		}
    },
    
    /**
        Get all the messages in the transcript.
        Example usage:

        var messages = App.messenger.getAllMessages();

        for(var i = 0; i < messages.length; i++) {

            var body = message.get('body');
        }

    **/ 
    getAllMessages : function() {

        return this._transcript;
    }
});

/**

    A message basically has four attributes:

    - body 
    - submit time
    - username
    - type (agent or user)
    
**/
App.Message = Backbone.Model.extend({
    
    
});
