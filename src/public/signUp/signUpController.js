/**
 * Created by rakes on 5/11/2017.
 */
(function () {

    angular.module('public')
        .controller('signUpController', signUpController)
        .service('menuListService',menuListService)
    signUpController.$inject=['menuListService'];
    function signUpController(menuListService) {
        var signUp = this;
        signUp.menuItemExist = true;
        signUp.menuItems=[];

        signUp.formSubmit = function (menuNumber) {
            var firstName = this.signUpForm.firstName.$viewValue;
            var lastName = this.signUpForm.lastName.$viewValue;
            var email = this.signUpForm.email.$viewValue;
            var phone = this.signUpForm.phone.$viewValue;

            var promise = menuListService.getMenuItems(menuNumber);
            console.log("firstname"+signUp.firstName);
            console.log("scondname"+signUp.signUpForm.firstName);
            promise.then(function (response) {
                signUp.menuItemExist= true;
                signUp.menuItems = response;
                var menuName = response.name;
                var menuDesc = response.description;
                var saved = menuListService.savedUserItem(firstName,lastName,email,phone,menuNumber,menuName,menuDesc);

            }).catch(function (reason) {
                signUp.menuItemExist= false;
                // err
                //console.log("catch");
                // if (reason.status === 500) {
                //     // do something
                //   //  console.log('Encountered server error');
                // }
            });
        }
    }

    menuListService.$inject = ['$http','$q','$log'];
    //function without error handling - returning console errors.
    // function menuListService($http){
    //   var service = this;
    //   service.getMenuItems = function(menuNumber){
    //       var url = "https://restaurantbackendserver.herokuapp.com/menu_items/"+menuNumber+".json";
    //     return $http.get(url).then(function(response){
    //         return response.data;
    //     });
    //   };
    //
    // }

    function menuListService($http,$q,$log) {
        var service = this;
        var userArray = [];
        var savedMenu = "";
        service.getMenuItems = function (menuNumber) {
            var url = "https://restaurantbackendserver.herokuapp.com/menu_items/" + menuNumber + ".json";
            var deferred = $q.defer();
            $http.get(url).success(function (response) {
                savedMenu = response;
                console.log(response);
                deferred.resolve(response);
                console.log("inside resolve");

            }).error(function (msg, code) {
                console.log("inside reject");
                deferred.reject(msg);
                $log.error(msg, code)

            });

            return deferred.promise;
            // var url = "https://restaurantbackendserver.herokuapp.com/menu_items/"+menuNumber+".json";
            // return $http.get(url).then(function(response){
            //     return response.data;
            // });
        };

        service.savedUserItem = function (firstName, lastName, email, phone, menuNumber, menuName, menuDesc) {
            var userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                menuName: menuName,
                menuDesc: menuDesc
            };
            console.log(userData);
            userArray.push(userData);
            return true;
        };

        service.getUserData = function(){
            return userArray

        };


        //function without error handling - returning console errors.
        // function menuListService($http){
        //   var service = this;
        //   service.getMenuItems = function(menuNumber){
        //       var url = "https://restaurantbackendserver.herokuapp.com/menu_items/"+menuNumber+".json";
        //       var response = $http ({
        //           method : "GET",
        //           url : url
        //       });
        //       return response.data;
        //   };
        //
        // }
    }
    })();
