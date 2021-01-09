//To query 4
app.controller('AllUsaController', function ($scope, $http) {
    //Calculate the truncated-mean of the percentage of patients for all  United States
    var usa_avg = 'covid/usa_avg'
    $http.get(usa_avg)
        .then(function success(response) {
            console.log("this is a success")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                //get the average and display it in the top of the screen
                var average = angular.fromJson(response.data)[0]['average'];
                $scope.percent = average;
                var allCasualties = document.getElementById("all-casualties");
                allCasualties.style.visibility = "visible";
            }
        }, function error(response) {
            console.log(response.statusText);
        });
  

});