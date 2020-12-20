app.controller('AllUsaController', function ($scope, $http) {
    // gets percent of casualties in the US
    $http.get('index.html')
        .then(function success(response) {
            console.log("this is a success beginning")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                $scope.percent = 70;
            }

            //  $scope.months = response.data
        }, function error(response) {
            console.log(response.statusText);
        });

});