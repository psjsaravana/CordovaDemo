package com.cranberrygame.cordova.plugin.mixpanelanalytics;

import android.content.Context;
import android.text.TextUtils;
import com.mixpanel.android.mpmetrics.MixpanelAPI;

import java.util.Map;
import java.util.HashMap;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MixpanelPlugin extends CordovaPlugin {
    private static String LOG_TAG = "MIXPANEL PLUGIN";
    private static MixpanelAPI mixpanel;

    private enum Action {
        SET_UP("setUp"),
		//addEventProperty
        TRACK_EVENT("trackEvent"),
        IDENTIFY_PEOPLE("identifyPeople"),
		//addPeopleProperty
        CHANGE_PEOPLE_PROPERTIES("changePeopleProperties"),
		INCREMENT_PEOPLE_PROPERTY("incrementPeopleProperty"),
		DELETE_PEOPLE("deletePeople");
/*
        FLUSH("flush"),
*/		
/*		
        RESET("reset"),
*/		
       
        private final String name;
        private static final Map<String, Action> lookup = new HashMap<String, Action>();

        static {
            for (Action a : Action.values())
                lookup.put(a.getName(), a);
        }

        private Action(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public static Action get(String name) {
            return lookup.get(name);
        }

    }

    private void error(CallbackContext cbCtx, String message) {
        LOG.e(LOG_TAG, message);
        cbCtx.error(message);
    }

  	@Override
    public void onPause(boolean multitasking) {		
        super.onPause(multitasking);
		//
    }
      
    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
		//
    }
  	
/*	
    @Override
    public void onDestroy() {
        super.onDestroy();
		//
    }
*/
	
    @Override
    public void onDestroy() {
        if (mixpanel != null) {
            mixpanel.flush();
        }
        super.onDestroy();
    }
	
    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext cbCtx){
        // throws JSONException
        Action act = Action.get(action);
//        JSONObject properties;

        if (act == null){
            this.error(cbCtx, "unknown action");
            return false;
        }

        if (mixpanel == null && Action.SET_UP != act) {
            this.error(cbCtx, "you must initialize mixpanel first using \"setUp\" action");
            return false;
        }

        switch (act) {
            case SET_UP:
                String token = args.optString(0, "");
                if (TextUtils.isEmpty(token)) {
                    this.error(cbCtx, "missing token for mixpanel project");
                    return false;
                }
                Context ctx = cordova.getActivity();
                mixpanel = MixpanelAPI.getInstance(ctx, token);
                //people = mixpanel.getPeople();//cranberrygame
                cbCtx.success();
                break;
            case TRACK_EVENT:
                String event = args.optString(0, "");
                if (TextUtils.isEmpty(event)) {
                    this.error(cbCtx, "missing event name");
                    return false;
                }
				JSONObject properties_track = args.optJSONObject(1);
                if (properties_track == null) {
                    properties_track = new JSONObject();
                }
                mixpanel.track(event, properties_track);
                cbCtx.success();
                break;
            case IDENTIFY_PEOPLE:
                String uniqueId = args.optString(0, "");
                if (TextUtils.isEmpty(uniqueId)) {
                    this.error(cbCtx, "missing unique id");
                    return false;
                }
                //mixpanel.identify(uniqueId);//ok//cranberrygame
				mixpanel.getPeople().identify(uniqueId);//ok//cranberrygame
                cbCtx.success();
                break;
			//http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html
            case CHANGE_PEOPLE_PROPERTIES:
				JSONObject properties = args.optJSONObject(0);
                if (properties == null) {
                    properties = new JSONObject();
                }				
				mixpanel.getPeople().set(properties);
                cbCtx.success();
                break;
            case INCREMENT_PEOPLE_PROPERTY:
				String name = args.optString(0, "");
				int value = args.optInt(1, 1);				
				Map<String, Integer> properties_increment = new HashMap<String, Integer>();
				properties_increment.put(name, value);
				mixpanel.getPeople().increment(properties_increment);
                cbCtx.success();
                break;
			case DELETE_PEOPLE:
				mixpanel.getPeople().deleteUser();
                cbCtx.success();
                break;
/*				
            case FLUSH:
                Runnable runnable = new Runnable() {
                    @Override
                    public void run() {
                        mixpanel.flush();
                        cbCtx.success();
                    }
                };
                cordova.getThreadPool().execute(runnable);
                cbCtx.success();
                break;
*/				
/*
            case RESET:
                mixpanel.reset();
                cbCtx.success();
                break;
*/


            default:
                this.error(cbCtx, "unknown action");
                return false;
                //break;
        }

        //success if got here
        return true;
    }
}
