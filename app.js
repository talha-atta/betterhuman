function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

InboxSDK.load('1', 'sdk_betterHuman_5b680eb872').then(function(sdk){

	var emailCount = 0;

	// the SDK has been loaded, now do something with it!
	sdk.Compose.registerComposeViewHandler(function(composeView){
		var averageWPM = 265;
		var timeOutID;
		var mainDivID = 'better-human_' + emailCount;

		var updateCount = function() {

        	if (timeOutID == null) {
	        	timeOutID = window.setTimeout(function(){

					var bodyElement = $(composeView.getBodyElement()).clone();
					var bodyText = $(bodyElement).text().trim();
					var wordCount;
					
					
		        	if (bodyText.length == 0) {
		        		wordCount = 0;
		        	} else {
			        	wordCount = bodyText.split(/\s+/).length;
					}
					
					var timeToReadMin = wordCount / averageWPM;
					
					var timeToReadFormatted = "";

					timeToReadFloor = Math.floor(timeToReadMin);

	        		if (timeToReadFloor > 0) {
	        		timeToReadFormatted = timeToReadFloor + " Minute";	
	        		}

					var remaining = timeToReadMin - timeToReadFloor;
					
	        		if (remaining > 0) {
	        			if (timeToReadFormatted.length > 0) {
	        				timeToReadFormatted += " ";
						}
						
	        			timeToReadFormatted += Math.round(remaining * 60) + " Seconds";
	        		}

                    if (timeToReadFormatted.length == 0) {
                        timeToReadFormatted = "0 Second"
					}
					
					document.getElementById(mainDivID).textContent = timeToReadFormatted + " to Read | " + wordCount + " Word" + (wordCount == 1 ? "" : "s");

					timeOutID = null;
					
				},200);
				
        	}
		}

		var composeNotice = composeView.addComposeNotice({

		});

		composeNotice.el.innerHTML = "<div class='better-human' id='" + mainDivID + "'></div>";

        composeView.getBodyElement().onkeydown = function(){
        	updateCount();
        };

        updateCount();
        emailCount++;
	});
});
