#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "Mixpanel.h"


@interface MixpanelPlugin : CDVPlugin

//@see https://mixpanel.com/site_media/doctyl/uploads/iPhone-spec/Classes/Mixpanel/index.html
-(void) setUp:(CDVInvokedUrlCommand*)command;
//addEventProperty
-(void) trackEvent:(CDVInvokedUrlCommand*)command;
-(void) identifyPeople:(CDVInvokedUrlCommand*)command;
//addPeopleProperty
-(void) changePeopleProperties:(CDVInvokedUrlCommand*)command;
-(void) incrementPeopleProperty:(CDVInvokedUrlCommand*)command;
-(void) deletePeople:(CDVInvokedUrlCommand*)command;
/*
-(void)flush:(CDVInvokedUrlCommand*)command;
*/
/*
-(void)reset:(CDVInvokedUrlCommand*)command;
*/

@end

