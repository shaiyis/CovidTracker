﻿app.controller('MapController', function ($scope, $http) {
    var percents = {}
    // check percents for each country
    $http.get('index.html')
        .then(function success(response) {
            console.log("this is a success")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                percents = response.data;
            }

            //  $scope.months = response.data
        }, function error(response) {
            console.log(response.statusText);
        });
 
    
    var countryOfpatients = {};
    countryOfpatients["WA"] = "900"
    countryOfpatients["OR"] = "600"
    countryOfpatients["IL"] = "800"
    countryOfpatients["OH"] = "600"


    var countryNumberPeople = {};
    countryNumberPeople["WA"] = "1000"
    countryNumberPeople["OR"] = "1000"
    countryNumberPeople["IL"] = "1000"
    countryNumberPeople["OH"] = "1000"

    //check how we get back and iterate on this 
    var contryColor = {}
    for (var key of Object.keys(countryOfpatients)) {
        if (countryOfpatients[key] / countryNumberPeople[key] > 0.75) {
            contryColor[key] = "#a82b48"
        }
        if (countryOfpatients[key] / countryNumberPeople[key] > 0.5 && countryOfpatients[key] / countryNumberPeople[key] <= 0.75) {
            contryColor[key] = "#e38a0e"
        }
        if (countryOfpatients[key] / countryNumberPeople[key] <= 0.5) {
            contryColor[key] = "#7CA82B"
        }
    }
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
                           // "WA": {
                           //     "background-color": contryColor["WA"]
                           // },
                            //"VA": {
                          //      "background-color": "#e38a0e"
                           // },
                        }
                    }
                }
            }
        ]
    };
    for (var key of Object.keys(contryColor)) {
        var color = contryColor[key];
        $scope.myJson.shapes[0].options.style.items[key] = {
            "background-color": color
        }
    }
    zingchart.shape_click = function (e) {
        console.log(arguments);

        $('#modal').modal('show');
        // make graph visible
        var graph = document.getElementById("the-graph");
        graph.style.visibility = "visible";
        // get the current state
        var shape = arguments[0].shapeid;
        var currentState = zingchart.maps.getItemInfo('usa', shape).tooltip.text;
        var graphTitle = document.getElementById("graph-title");
        graphTitle.style.visibility = "visible";
        $scope.currentState = currentState;
        $scope.numberOfConfirmedCases = 5000;

        // get 3 months with biggest grow in current state
        $http.get('covid/state_growth')
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


        // get all casualties for the state for the last 6 months
        $http.get('covid/state_graph')
            .then(function (response) {
                console.log("got message");
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    var listFromJson = angular.fromJson(response.data);
                    var listForGraph = [];
                    listFromJson.forEach(function (item) {
                        listForGraph.push([item["Key"], item["Value"]]);
                    }
                    );
                        
                   
                       /* [(1576108800000, 2), (1576108886400, 42), (1576108972800, 82), (1576109059200, 122), (1576109145600, 162), (1576109232000, 202), (1576109318400, 242), (1576109404800, 282), (1576109491200, 322), (1576109577600, 362), (1576109664000, 402), (1576109750400, 442), (1576109836800, 482), (1576109923200, 522), (1576110009600, 562), (1576110096000, 602), (1576110182400, 642), (1576110268800, 682), (1576110355200, 722), (1576110441600, 762), (1576110528000, 802), (1576110614400, 842), (1576110700800, 882), (1576110787200, 922), (1576110873600, 962), (1576110960000, 1002), (1576111046400, 1042), (1576111132800, 1082), (1576111219200, 1122), (1576111305600, 1162), (1576111392000, 1202), (1576111478400, 1242), (1576111564800, 1282), (1576111651200, 1322), (1576111737600, 1362), (1576111824000, 1402), (1576111910400, 1442), (1576111996800, 1482), (1576112083200, 1522), (1576112169600, 1562), (1576112256000, 1602), (1576112342400, 1642), (1576112428800, 1682), (1576112515200, 1722), (1576112601600, 1762), (1576112688000, 1802), (1576112774400, 1842), (1576112860800, 1882), (1576112947200, 1922), (1576113033600, 1000000)]*/
                    if (shape == "MT") {
                        zingchart.exec('the-graph', 'setseriesdata', {
                            graphid: 0,
                            plotindex: 0,

                            data: {
                                values: listForGraph,
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
                } 
            }, function error(response) {
                console.log(response.statusText);
            });
        

        // get month with greatest growth for each city
        $http.get('index.html')
            .then(function success(response) {
                console.log("this is a success")
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    $scope.cities = [{ city: "noa", month: "July" }, { city: "Gilad", month: "August" }, { city: "Israel", month: "September" }];
                }

                //  $scope.months = response.data
            }, function error(response) {
                console.log(response.statusText);
            });
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

