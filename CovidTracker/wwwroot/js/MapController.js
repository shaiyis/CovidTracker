app.controller('MapController', function ($scope, $http) {
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

       // $('#modal').modal('show');
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
                        // -1 to match index of graph
                        listForGraph.push([item["month_as_number"]-1, item["cases"]]);
                    }

                    );
                        
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
        // zoom to map
        zingchart.maps.zoomToItem('usa', shape);
    };

});

