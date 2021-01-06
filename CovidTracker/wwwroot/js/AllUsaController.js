app.controller('AllUsaController', function ($scope, $http) {
    // all USA percents
    var usa_avg = 'covid/usa_avg'
    $http.get(usa_avg)
        .then(function success(response) {
            console.log("this is a success")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                var average = angular.fromJson(response.data)[0]['average'];
                $scope.percent = average;
                var allCasualties = document.getElementById("all-casualties");
                allCasualties.style.visibility = "visible";
            }
            // keys:  average
        }, function error(response) {
            console.log(response.statusText);
        });
  

});