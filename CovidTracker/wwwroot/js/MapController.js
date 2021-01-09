app.controller('MapController', function ($scope, $http) {
    var percents = {}
    // To query 5
    // check percents for each country
    //According to the percentages we received, we will color the map
    var map_coloring = 'covid/map_coloring'
    $http.get(map_coloring)
        .then(function success(response) {
            if (response.status != 200) {
                console.log(response.statusText);
            } else {
                //show the map
                var elementContainsMap = document.getElementById('the-map');
                elementContainsMap.children[0].children[0].style.position = "relative";
                //Get the percentage of patients for each country and insert to dictionary that his keys are the id of the
                //state and the values are the percents for each country respectively
                percents = angular.fromJson(response.data);
                var percents_dictionary = {};
                percents.forEach(function (item) {
                    percents_dictionary[item['state_str_id']] = parseFloat(item['percent']);
                });
                //Create a dictionary by which we will color the map
                var countryColor = {}
                for (var key of Object.keys(percents_dictionary)) {
                    //if the percents of the patints in this country is higher than 10 - we will color the country in red
                    if (percents_dictionary[key] > 10) {
                        countryColor[key] = "#a82b48"
                    }
                    //if the percents of the patints in this country is between 5 to 10 - we will color the country in orange
                    if (percents_dictionary[key] > 5 && percents_dictionary[key] <= 10) {
                        countryColor[key] = "#e38a0e"
                    }
                    //if the percents of the patints in this country is lower than 5 - we will color the country in green
                    if (percents_dictionary[key] <= 5) {
                        countryColor[key] = "#7CA82B"
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
                                    //the defult color for the diffrent states is green
                                    "background-color": "#7CA82B",
                                    "border-color": "#FFF",
                                    items: {

                                    }
                                }
                            }
                        }
                    ]
                };
                //Paint the map according to the percents we get
                for (var key of Object.keys(countryColor)) {
                    var color = countryColor[key];
                    $scope.myJson.shapes[0].options.style.items[key] = {
                        "background-color": color
                    }
                }
                
                    var loader = document.getElementById('the-loader-beginning');
                    loader.remove();
            }
        }, function error(response) {
            console.log(response.statusText);
        });


 
    



    zingchart.shape_click = function (e) {
        console.log(arguments);

        $('#modal').modal('show');
        // make graph visible
        var graph = document.getElementById("the-graph");
        graph.style.visibility = "visible";
        // get the current state
        var state_str_id = arguments[0].shapeid;
        var state_str_id_query = "?state_str_id=" + state_str_id
        var currentState = zingchart.maps.getItemInfo('usa', state_str_id).tooltip.text;
        var graphTitle = document.getElementById("graph-title");
        graphTitle.style.visibility = "visible";
        $scope.currentState = currentState;
        $scope.numberOfConfirmedCases = 5000;

        // get 3 months with biggest grow in current state
        var get3MonthsUrl = 'covid/state_growth' + state_str_id_query
        $http.get(get3MonthsUrl)
            .then(function success(response) {
                console.log("this is a success")
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    //keys: max_diff_month, growth
                    $scope.months = angular.fromJson(response.data);
                }

                //  $scope.months = response.data
            }, function error(response) {
                console.log(response.statusText);
            });

        // get all casualties for the state for the last 6 months
        var getStateUrl = 'covid/state_graph' + state_str_id_query
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
                        listForGraph.push([parseInt(item["month_as_number"]) - 1, parseInt(item["cases"])]);
                    }

                    );
                    zingchart.exec('the-graph', 'setseriesdata', {
                        graphid: 0,
                        plotindex: 0,

                        data: {
                            values: listForGraph,
                            lineColor: 'red'

                        },

                    });
                }
            }, function error(response) {
                console.log(response.statusText);
            });


        // To query 2
        //get month with greatest growth for each county and display it as a table in a pop-up window
        var table_growth = document.getElementById("scrolledTable");
        table_growth.style.visibility = "hidden";
        var getCountyUrl = 'covid/county_growth' + "?state_str_id=" + state_str_id
        $http.get(getCountyUrl)
            .then(function success(response) {
                if (response.status != 200) {
                    console.log(response.statusText);
                } else {
                    //initialize the scroll bar
                    table_growth.scrollTop = 0;
                    //Get the month with the largest increase compared to the previous month for each county
                    country_mounth = angular.fromJson(response.data);
                    $scope.counties = country_mounth;
                    // make table visible
                    table_growth.style.visibility = "visible";
                }
            }, function error(response) {
                console.log(response.statusText);
            });


        // zoom to map
        zingchart.maps.zoomToItem('usa', state_str_id);
    };

});

