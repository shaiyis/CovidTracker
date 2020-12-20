﻿app.controller('GraphController', function ($scope) {
    $scope.myJson = {
        
        plotarea: {
            margin: 'dynamic',
            adjustLayout: true
        },
       /* "title": {
            "text": "Covid-19 due time",
            "font-size": "24px"

        },
        "subtitle": {
            "text": "Montana",
            "font-size": "18px"
        },*/
        type: 'line',
        series: [
            {
                values: [(1576108800000, 2), (1576108886400, 42), (1576108972800, 82), (1576109059200, 122), (1576109145600, 162), (1576109232000, 202), (1576109318400, 242), (1576109404800, 282), (1576109491200, 322), (1576109577600, 362), (1576109664000, 402), (1576109750400, 442), (1576109836800, 482), (1576109923200, 522), (1576110009600, 562), (1576110096000, 602), (1576110182400, 642), (1576110268800, 682), (1576110355200, 722), (1576110441600, 762), (1576110528000, 802), (1576110614400, 842), (1576110700800, 882), (1576110787200, 922), (1576110873600, 962), (1576110960000, 1002), (1576111046400, 1042), (1576111132800, 1082), (1576111219200, 1122), (1576111305600, 1162), (1576111392000, 1202), (1576111478400, 1242), (1576111564800, 1282), (1576111651200, 1322), (1576111737600, 1362), (1576111824000, 1402), (1576111910400, 1442), (1576111996800, 1482), (1576112083200, 1522), (1576112169600, 1562), (1576112256000, 1602), (1576112342400, 1642), (1576112428800, 1682), (1576112515200, 1722), (1576112601600, 1762), (1576112688000, 1802), (1576112774400, 1842), (1576112860800, 1882), (1576112947200, 1922), (1576113033600, 1000000)]
}
            //{ values: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536] },
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
                "color": "black"
            }
        },
        "scale-y": {
           // "exponent": true,
         //   "exponent-decimals": 2,
            "label": {
                "text": "Sick",
                "font-size": "18px",
                "color": "black"
            }
        }
    };
});



