zingchart.MODULESDIR = 'https://cdn.zingchart.com/2.1.4/modules/';
zingchart.loadModules('maps,maps-world-countries,maps-usa');
var app = angular.module('myApp', ['zingchart-angularjs']);

app.controller('MainController', function ($scope) {
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
        "background-color": "#FFF",
        shapes: [
            {
                type: 'zingchart.maps',
                options: {
                    name: 'usa',
                    style: {
                        label: {
                            visible: false
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
                                "background-color": "#003849"
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