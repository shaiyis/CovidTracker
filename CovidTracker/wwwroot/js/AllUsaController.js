//To query 4
app.controller('AllUsaController', function ($scope, $http) {
    //Calculate the truncated-mean of the percentage of patients for all  United States
    var usa_avg = 'covid/usa_avg'
    $http.get(usa_avg)
        .then(function success(response) {
            if (response.status != 200) {
                alert("There was a problem with DB access, Refresh and Try again");
            } else {
                //get the average and display it in the top of the screen
                var average = angular.fromJson(response.data)[0]['average'];
                $scope.percent = average;
                var allCasualties = document.getElementById("all-casualties");
                allCasualties.style.visibility = "visible";
            }
        }, function error(response) {
            alert("There was a problem with DB access, Refresh and Try again");
        });


});