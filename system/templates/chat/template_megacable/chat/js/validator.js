App.LoginValidator = Backbone.Model.extend({

    initialize : function() {


    },
    /**
        Returns a list of error messages.
    **/
    getFormValidationErrors : function(formValues) {
        
        var errors = {};

        _.each(['full_name', 'email_address', 'subject', 'suscriptor', 'phone_number'], function(name) {
            
            errors[name] = this.getInputValidationErrors(name, formValues[name])

        }, this);

        return errors ;
    },

    getInputValidationErrors : function(inputName, value) {
        
        var errors = [];

        switch(inputName) {

            case "full_name":
            
                if(!App.utils.isNameValid(value)) 
                    errors.push(error_name);
				break;

            case "email_address":

                if(!App.utils.isEmailValid(value))
                    errors.push(error_email);
				break;

            case "subject":

                if(!App.utils.isQuestionValid(value))
                    errors.push(error_subject);
				break;
				
			case "phone_number":	
				if(!App.utils.isPhoneValid(value))
					errors.push(error_phone);
				break;
				
			case "suscriptor":	
				if(!App.utils.isSuscriptorValid(value))
					errors.push(error_suscriptor);
				break;
		
			default:
				customValidationHook(inputName, value,errors);
				break;
        }

        return errors;
    }
});
