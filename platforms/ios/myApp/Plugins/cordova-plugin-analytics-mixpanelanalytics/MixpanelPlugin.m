#import "MixpanelPlugin.h"

@implementation MixpanelPlugin
	
-(void) setUp:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    NSArray* arguments = command.arguments;
    NSString* token = [arguments objectAtIndex:0];

    if (token == nil || 0 == [token length])
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Token is missing"];
    }
    else
    {
        [Mixpanel sharedInstanceWithToken:token];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//addEventProperty

-(void) trackEvent:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSString* eventName = [arguments objectAtIndex:0];
    NSDictionary* eventProperties = [command.arguments objectAtIndex:1];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else if(eventName == nil || 0 == [eventName length])
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Event name missing"];
    }
    else
    {
        [mixpanelInstance track:eventName properties:eventProperties];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void) identifyPeople:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    NSArray* arguments = command.arguments;
    NSString* distinctId = [arguments objectAtIndex:0];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        if(distinctId == nil || 0 == [distinctId length])
        {
            distinctId = mixpanelInstance.distinctId;
        }
        [mixpanelInstance identify:distinctId];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

//addPeopleProperty

//https://mixpanel.com/site_media/doctyl/uploads/iPhone-spec/Classes/MixpanelPeople/index.html#//apple_ref/occ/instm/MixpanelPeople/deleteUser
-(void) changePeopleProperties:(CDVInvokedUrlCommand*)command;
{
    NSDictionary* peopleProperties = [command.arguments objectAtIndex:0];

    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
	[mixpanelInstance.people set:peopleProperties];
	
	CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	//[pr setKeepCallbackAsBool:YES];
	[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
	//CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	//[pr setKeepCallbackAsBool:YES];
	//[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
}

-(void) incrementPeopleProperty:(CDVInvokedUrlCommand*)command;
{
	NSString *name = [command.arguments objectAtIndex: 0];
	int value = [[command.arguments objectAtIndex: 1] intValue];

    //http://stackoverflow.com/questions/16292278/numbers-in-nsmutabledictionary
	NSDictionary *properties = @{
		name: [NSNumber numberWithInteger:value]
	};
			
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
	[mixpanelInstance.people increment:properties];
		
	CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	//[pr setKeepCallbackAsBool:YES];
	[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
	//CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	//[pr setKeepCallbackAsBool:YES];
	//[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];	
}		

-(void) deletePeople:(CDVInvokedUrlCommand*)command;
{
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];
    [mixpanelInstance.people deleteUser];
	
	CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	//[pr setKeepCallbackAsBool:YES];
	[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];
	//CDVPluginResult* pr = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	//[pr setKeepCallbackAsBool:YES];
	//[self.commandDelegate sendPluginResult:pr callbackId:command.callbackId];		
}

/*
-(void) flush:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance flush];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
*/
		
/*
-(void) reset:(CDVInvokedUrlCommand*)command;
{
    CDVPluginResult* pluginResult = nil;
    Mixpanel* mixpanelInstance = [Mixpanel sharedInstance];

    if (mixpanelInstance == nil)
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Mixpanel not initialized"];
    }
    else
    {
        [mixpanelInstance reset];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
*/

@end
