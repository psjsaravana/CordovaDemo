angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$cordovaCamera,$cordovaPush,$rootScope,$http,$state) {
  
  $scope.listItems=[
      {"name":"Push Notification"},
      {"name":"Camera"},
      {"name":"Contacts"},
      {"name":"Device"},
      {"name":"Barcode Scanner"},
      {"name":"Bluetooth"}
    ];

  $scope.listItemTap = function(item) {
    switch(item) {
        case "Push Notification":
            $state.go('notification');
            break;
        case "Camera":
            $state.go('camera');
            break;
        case "Contacts":
            $state.go('contacts');
            break;
        case "Device":
            $state.go('device');
            break;
        case "Barcode Scanner":
            $state.go('barcode');
            break;
        case "Bluetooth":
            $state.go('bluetooth');
            break;
        default:
            $state.go('notification');
    }
  };
})
.controller('NotificationCtrl', function($scope,$http,$rootScope) {
  if(window.localStorage.getItem("registerNotification") == "true") {
     $scope.enableNotification = { checked: true };
  }else {
     $scope.enableNotification = {checked : false};;
  };
  $scope.toggleChange = function() {
    if($scope.enableNotification.checked) {
        //window.mixpanelanalytics.trackEvent('Push Notification registeration');
        $rootScope.push = PushNotification.init({
              android: {
                  senderID: "510489419201"
              }
          });
        $rootScope.push.on('notification', function(data) {
          alert(data.message);
        });
        $rootScope.push.on('registration',function(data) {
          $http.put("http://localhost:3000/addtoken",{"token":data.registrationId}).then(function(response) {
            console.log("response "+response);
          })
        });
         window.localStorage.setItem("registerNotification","true");
    }else {
        //window.mixpanelanalytics.trackEvent('Push Notification UnRegisteration');
        $rootScope.push.unregister(function() {
            console.log('successfully unregistered');
            window.localStorage.setItem("registerNotification","false");
        }, function() {
            console.log('error in unregistering');
        });
    }
  }
})
.controller('CameraCtrl', function($scope,$http,$rootScope,$cordovaCamera) {
  $scope.showImage= false;
  $scope.launchCamera = function() {
    //window.mixpanelanalytics.trackEvent('Camera');
    $cordovaCamera.getPicture({ quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
      }).then(function(imageData) {
        var image = document.getElementById('cameraImageContainer');
        $scope.showImage = true;
        image.src= "data:image/jpeg;base64," + imageData;
        }, function(error) {
            alert(error);
        });
  };  

})

.controller('ContactsCtrl', function($scope,$http,$rootScope,$cordovaContacts) {
  $scope.contactsList= [];
  $scope.getAllContacts = function() {
    $cordovaContacts.find({}).then(function(allContacts) { 
      $scope.contactsList = allContacts;
    });
  };

  $scope.getContactsByName = function(searchTerm) {
    var opts = {                                           
      filter : searchTerm,                        
      multiple: true,                                      
      fields:  [ 'displayName', 'name' ]                  
    };
    $cordovaContacts.find(opts).then(function (contactsFound) {
      $scope.contactsList = contactsFound;
    });
  };  

})

/*.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});*/
