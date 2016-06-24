cordova.define("cordova-plugin-analytics-mixpanelanalytics.mixpanelanalytics", function(require, exports, module) {

var mixpanelanalytics = {
	eventProperties: {},
	peopleProperties: {},	
	setUp: function(token) {
		var self = this;	
        cordova.exec(
			function (result) {
				console.log('setUp succeeded.');
/*				
				if (typeof result == "string") {
					if (result == "onFullScreenAdPreloaded") {
						if (self.onFullScreenAdPreloaded)
							self.onFullScreenAdPreloaded();
					}
					else if (result == "onFullScreenAdLoaded") {
						if (self.onFullScreenAdLoaded)
							self.onFullScreenAdLoaded();
					}
					else if (result == "onFullScreenAdShown") {
						self._isShowingFullScreenAd = true;
						
						if (self.onFullScreenAdShown)
							self.onFullScreenAdShown();
					}
					else if (result == "onFullScreenAdHidden") {
						self._isShowingFullScreenAd = false;
						
						if (self.onFullScreenAdHidden)
							self.onFullScreenAdHidden();
					}
				}
				else {
					//if (result["event"] == "onXXX") {
					//	//result["message"]
					//	if (self.onXXX)
					//		self.onXXX(result);
					//}
				}
*/				
			},
			function (error) {
				console.log('setUp failed.');
			},
            'MixpanelAnalytics',
            'setUp',			
			[token]
        ); 
    },
	//cranberrygame start: pure javascript
    addEventProperty: function(propertyName, propertyValue) {
		if (propertyName && propertyValue)
			this.eventProperties[propertyName] = propertyValue;
    },
    trackEvent: function(eventName) {
        cordova.exec(
			null,
            null,
            'MixpanelAnalytics',
            'trackEvent',
            [eventName, this.eventProperties]
        );
		this.eventProperties	= {};		
    },
	//cranberrygame end: pure javascript
    identifyPeople: function(distinctId) {
        cordova.exec(
			null,
            null,
            'MixpanelAnalytics',
            'identifyPeople',
            [distinctId]
        );

    },
	//cranberrygame start: pure javascript
    addPeopleProperty: function(propertyName, propertyValue) {
		if (propertyName && propertyValue)
			this.peopleProperties[propertyName] = propertyValue;
    },
	//cranberrygame end: pure javascript
    changePeopleProperties: function() {
        cordova.exec(
			null,
            null,
            'MixpanelAnalytics',
            'changePeopleProperties',
            [this.peopleProperties]
        );
		this.eventProperties = {};		
    },	
    incrementPeopleProperty: function(propertyName, propertyValue) {
        cordova.exec(
			null,
            null,
            'MixpanelAnalytics',
            'incrementPeopleProperty',
            [propertyName, propertyValue]
        );
    },	
    deletePeople: function() {
        cordova.exec(
			null,
            null,
            'MixpanelAnalytics',
            'deletePeople',
            []
        );
    }
}

module.exports = mixpanelanalytics;

});
