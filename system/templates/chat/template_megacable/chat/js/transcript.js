App.transcript = {
	getTranscriptCSS : function(){
		var templateName = getUrlParameter('templateName');
		if(templateName){	
			$.ajax({
				url : 'css/mailtranscript.css',
				type: 'GET',
				dataType : 'text',
				success : function(data){ 
					App.transcript.checkTranscriptCSSVersion(data, templateName);
				}
			});
		}
	},

	checkTranscriptCSSVersion : function(css, templateName){
		var hash = CryptoJS.MD5(css);
		$.ajax({
			url : App.connection.BOSH_SERVICE+'/checktranscriptcssversion/'+templateName,
			type: 'POST',
			data: {md5: hash.toString()},
			dataType : 'text',
			success : function(data){ 
				if(data == 'false')
				App.transcript.postTranscriptCSS(css, templateName, hash.toString());
			}
		});
	},

	postTranscriptCSS : function(css, templateName, md5){
		$.ajax({
			url : App.connection.BOSH_SERVICE+'/posttranscriptcss/'+templateName,
			type: 'POST',
			data: {css: css, md5:md5}
		});
	}
}