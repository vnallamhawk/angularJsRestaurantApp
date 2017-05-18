/**
 * Created by rakes on 5/17/2017.
 */
(function () {
    angular.module('myInfo',[]).controller("myInfoController",myInfoController);
    myInfoController.$inject = ['menuListService'];
    function myInfoController(menuListService){
        var myInfo = this;

        myInfo.savedUserItem = menuListService.getUserData();
        console.log(myInfo.savedUserItem.length);



    }

})();
