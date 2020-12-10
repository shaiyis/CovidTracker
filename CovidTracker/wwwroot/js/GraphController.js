app.controller('GraphController', function ($scope) {
    $scope.setJson = function (newJson) {
        $scope.myJson = newJson;
    }
    $scope.myJson = {
        "title": {
            "text": "Covid-19 due time",
            "font-size": "24px"
        },
        "subtitle": {
            "text": "Montana",
            "font-size": "18px"
        },
        type: 'line',
        series: [
            { values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536] },
            /* { values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },*/
        ],
        "scale-x": {
            "min-value": 1576108800000,
            "shadow": 0,
            "step": 'day',
            "transform": {
                "type": "date",
                "all": "%d %M<br/>%Y"
            },
            "label": {
                "text": "Date",
                "font-size": "18px",
                "color": "red"
            }
        },
        "scale-y": {
            "exponent": true,
            "exponent-decimals": 2,
            "label": {
                "text": "Sick",
                "font-size": "18px",
                "color": "red"
            }
        }
    };
});
