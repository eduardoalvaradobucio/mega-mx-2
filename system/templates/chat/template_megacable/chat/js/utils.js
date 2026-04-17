App.utils = {

    //Name cannot be null.
    isNameValid : function(name) {

        if(!name.length)
            return false;

        return true;
    },

    isEmailValid : function(email) {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    
    isSuscriptorValid : function(suscriptor) {
        
        return suscriptor.match(/[^0-9]/) == null;
    },
    
    isPhoneValid : function(phone) {
        
        return phone.match(/[^0-9 \-\(\)]/) == null;
    },
        
    //Question cannot be null.
    isQuestionValid : function(question) {

        if(!question.length)
            return false;

        return true;
    },

    isVisitorMobile : function() {

        var ua = navigator.userAgent;

        return ua.match(/(iPhone|iPod|iPad)/) ||
                ua.match(/Blackberry/) ||
                ua.match(/Android/);
    }
}
