app.controller('GraphController', function ($scope) {
    $scope.myJson = {
        type: "bar",
        title: {
            backgroundColor: "transparent",
            fontColor: "black",
            text: "Graph for the state"
        },
        backgroundColor: "white",
        series: [
            {
                text: "asdfaswf",
                values: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,14,15,15,16,16],
                backgroundColor: "#4DC0CF"
            }
        ]
    };
});
