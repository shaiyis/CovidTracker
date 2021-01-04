app.controller('GraphController', function ($scope) {
    $scope.myJson = {

        plotarea: {
            margin: 'dynamic',
            adjustLayout: true
        },
        type: 'line',
        series: [
            {
                values: [(0, 2), (1, 42), (2, 82), (3, 122), (4, 162), (5, 202), (6, 242), (7, 282), (8, 322), (9, 362), (10, 402), (11, 442)]
            }
        ],
        "scale-x": {
            "items-overlap": true,
            "max-items": 20,
            "label": {
                "text": "Date",
                "font-size": "18px",
                "color": "black"
            },
            "values": ["January", "February", "March", "April", "May",
                "June", "July", "August", "September",
                "October", "November", "December"],
        },
        "scale-y": {
            "label": {
                "text": "Sick",
                "font-size": "18px",
                "color": "black"
            }
        }
    };
});



