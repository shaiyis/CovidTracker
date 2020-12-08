app.controller('MapController', function ($scope,$http) {
    $http.get('index.html')
        .then(function (response) {
            console.log("got message");
        });
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

});