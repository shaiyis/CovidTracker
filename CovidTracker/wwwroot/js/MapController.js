app.controller('MapController', function ($scope, $http) {

    $scope.myJson = {
        gui: {
            contextMenu: {
                button: {
                    visible: false
                }
            }
        },
        globals: {
            shadow: false
        },
        "background-color": "#FFFFFF",
        shapes: [
            {
                type: 'zingchart.maps',
                options: {
                    name: 'usa',
                    style: {
                        label: {
                            visible: true

                        },
                        "background-color": "#7CA82B",
                        "border-color": "#FFF",
                        items: {
                            "CA": {
                                "background-color": "#C30"
                            },
                            "VA": {
                                "background-color": "#00BAF0"
                            },
                            "TX": {
                                "background-color": "#FFFF00"
                            },
                            "MT": {
                                "background-color": "#333"
                            },
                            "IL": {
                                "background-color": "#F0F0F0"
                            },
                            "FL": {
                                "background-color": "#D9D9D9"
                            }
                        }
                    }
                }
            }
        ]
    };
    zingchart.shape_click = function (e) {
        console.log(arguments);

        var graph = document.getElementById("the-graph");
        graph.style.visibility = "visible";
        var shape = arguments[0].shapeid;
        var currentState = zingchart.maps.getItemInfo('usa', shape).tooltip.text;
        var paragraph = document.getElementById("casualties");
        paragraph.style.visibility = "visible";
        var table = document.getElementById("table-growth");
        table.style.visibility = "visible";
        var graphTitle = document.getElementById("graph-title");
        graphTitle.style.visibility = "visible";
        $scope.currentState = currentState;
        $scope.numberOfConfirmedCases = 5000;

        // get 3 months with biggest grow in current state
        $http.get('index.html')
            .then(function success(response) {
                console.log("this is a success")
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    $scope.months = [{ month: "February", grow: 800 }, { month: "March", grow: 600 }, { month: "April", grow: 500 }];
                }

                //  $scope.months = response.data
            }, function error(response) {
                console.log(response.statusText);
            });


        // get all casualties for the state for the last x months
        $http.get('index.html')
            .then(function (response) {
                console.log("got message");
            }, function error(response) {
                console.log(response.statusText);
            });
        list = [(1576108800000, 2), (1576108886400, 42), (1576108972800, 82), (1576109059200, 122), (1576109145600, 162), (1576109232000, 202), (1576109318400, 242), (1576109404800, 282), (1576109491200, 322), (1576109577600, 362), (1576109664000, 402), (1576109750400, 442), (1576109836800, 482), (1576109923200, 522), (1576110009600, 562), (1576110096000, 602), (1576110182400, 642), (1576110268800, 682), (1576110355200, 722), (1576110441600, 762), (1576110528000, 802), (1576110614400, 842), (1576110700800, 882), (1576110787200, 922), (1576110873600, 962), (1576110960000, 1002), (1576111046400, 1042), (1576111132800, 1082), (1576111219200, 1122), (1576111305600, 1162), (1576111392000, 1202), (1576111478400, 1242), (1576111564800, 1282), (1576111651200, 1322), (1576111737600, 1362), (1576111824000, 1402), (1576111910400, 1442), (1576111996800, 1482), (1576112083200, 1522), (1576112169600, 1562), (1576112256000, 1602), (1576112342400, 1642), (1576112428800, 1682), (1576112515200, 1722), (1576112601600, 1762), (1576112688000, 1802), (1576112774400, 1842), (1576112860800, 1882), (1576112947200, 1922), (1576113033600, 1000000)]
        if (shape == "MT") {
            zingchart.exec('the-graph', 'setseriesdata', {
                graphid: 0,
                plotindex: 0,

                data: {
                    values: list,
                    lineColor: 'red'
                },
            });
        } else {
            zingchart.exec('the-graph', 'setseriesdata', {
                graphid: 0,
                plotindex: 0,

                data: {

                    values: [0, 30, 100, 100],
                    lineColor: 'red'
                }
            });
        }
        /* zingchart.exec('the-graph', 'modify', {
             graphid: 0,
             data: {
                 subtitle: {
                     text: currentState
                 }
             }
         });*/
        zingchart.maps.zoomToItem('usa', shape);
    };

});