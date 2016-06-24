// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'tabSlideBox'])

.run(function($ionicPlatform, $cordovaPush, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        window.mixpanelanalytics.setUp("304de001c86eac55e6cb5de93812b16a");
        window.mixpanelanalytics.trackEvent('App Launch');
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('dash', {
            url: '/dash',
            controller: 'DashCtrl',
            abstract: false,
            templateUrl: 'templates/tab-dash.html'
        })
        .state('notification', {
            url: '/notification',
            controller: 'NotificationCtrl',
            abstract: false,
            templateUrl: 'templates/notification.html'
        })
        .state('camera', {
            url: '/camera',
            controller: 'CameraCtrl',
            abstract: false,
            templateUrl: 'templates/camera.html'
        })
        .state('contacts', {
            url: '/contacts',
            controller: 'ContactsCtrl',
            abstract: false,
            templateUrl: 'templates/contacts.html'
        })
        .state('device', {
            url: '/device',
            controller: 'DeviceCtrl',
            abstract: false,
            templateUrl: 'templates/deviceinfo.html'
        })
        .state('barcode', {
            url: '/barcode',
            controller: 'BarcodeCtrl',
            abstract: false,
            templateUrl: 'templates/barcodescanner.html'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/dash');

});
