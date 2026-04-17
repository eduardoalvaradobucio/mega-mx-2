/**

    Audio basically plays the different sounds.

**/
App.Audio = Backbone.Model.extend({
    
	initialize : function(){
		this.alertSoundThreshold = 2000;
		this.chatSoundURL = eGainLiveConfig['chatSoundURL'];
		this.lastSoundAlert = 0;
	},
	
    playChatMessageSound : function() {
		var currTime = new Date().getTime();
		if(!App.editor.isfocus && this.chatSoundURL != null && this.chatSoundURL != "" && (currTime - this.lastSoundAlert) > this.alertSoundThreshold)
		{
			this.playSound(this.chatSoundURL);
			this.lastSoundAlert = currTime;
		}        
    },
	
	playSound : function(url){
		if(document.all)
		{
			var egsound = document.getElementById("iesound");
			egsound.src = url;
		}
		else
		{
			var egsound = document.getElementById("html5sound");
			egsound.src = url;
			egsound.play();
		}
	}
});
