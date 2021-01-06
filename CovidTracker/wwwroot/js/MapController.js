app.controller('MapController', function ($scope, $http) {
    var percents = {}

    // check percents for each country
    var map_coloring = 'covid/map_coloring'
    $http.get(map_coloring)
        .then(function success(response) {
            console.log("this is a success")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                percents = response.data;
                // keys: state_str_id, percent
            }

            //  $scope.months = response.data
        }, function error(response) {
            console.log(response.statusText);
        });

    // all USA-chek with gilad
    var usa_avg = 'covid/usa_avg'
    $http.get(usa_avg)
        .then(function success(response) {
            console.log("this is a success")
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                percents = response.data;
            }
         // keys: percent

            //  $scope.months = response.data
        }, function error(response) {
            console.log(response.statusText);
        });
 
    


    //check how we get back and iterate on this 
    var contryColor = {}
    for (var key of Object.keys(percents)) {
        if (percents[key] > 0.75) {
            contryColor[key] = "#a82b48"
        }
        if (percents[key] > 0.5 && percents[key] <= 0.75) {
            contryColor[key] = "#e38a0e"
        }
        if (percents[key] <= 0.5) {
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
        var state_str_id = arguments[0].shapeid;
        var currentState = zingchart.maps.getItemInfo('usa', state_str_id).tooltip.text;
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
                    //keys: month, growth
                    $scope.months = [{ month: "February", growth: 800 }, { month: "March", growth: 600 }, { month: "April", growth: 500 }];
                }

                //  $scope.months = response.data
            }, function error(response) {
                console.log(response.statusText);
            });


        // get all casualties for the state for the last 6 months
        var getStateUrl = 'covid/state_graph' + "?state_str_id=" + state_str_id
        $http.get(getStateUrl)
            .then(function (response) {
                console.log("got message");
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    var listFromJson = angular.fromJson(response.data);
                    var listForGraph = [];
                    //keys: month_as_number, cases

                    listFromJson.forEach(function (item) {
                        // -1 to match index of graph
                        listForGraph.push([item["month_as_number"]-1, item["cases"]]);
                    }

                    );
                        
                    if (state_str_id == "MT") {
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
        
        
        // get month with greatest growth for each county
        var getCountyUrl = 'covid/county_growth' + "?state_str_id=" + state_str_id
        $http.get(getCountyUrl)
            .then(function success(response) {
                console.log("this is a success")
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    // keys: county, month
                    //$scope.counties = [{ county: "noa", month: "July" }, { county: "Gilad", month: "August" }, { county: "Israel", month: "September" }];
                    country_mounth = response.data;
                    $scope.counties = country_mounth
                }

                //  $scope.months = response.data
            }, function error(response) {
                console.log(response.statusText);
            });


        // zoom to map
        zingchart.maps.zoomToItem('usa', state_str_id);
    };

});

