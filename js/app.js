(function(){

'use strict';

angular
    .module('app', [])
    .controller('Main', function ($scope) {
        var sum = {
            RUB: {
                min: 35000,
                max: 5000000,
                trpl: {
                    tp1: {
                        itogd: [1.785, 1.685],
                        itogp: [78.5, 68.5],
                        mes: 6,
                        vmes: 0.15
                    },
                    tp2: {
                        itogd: [2.923, 2.803],
                        itogp: [192.3, 180.3],
                        mes: 12,
                        vmes: 0.17
                    }
                }
            },
            USD: {
                min: 1000,
                max: 150000,
                trpl: {
                    tp1: {
                        itogd: [1.785, 1.44],
                        itogp: [49, 44],
                        mes: 6,
                        vmes: 0.10
                    },
                    tp2: {
                        itogd: [2.328, 2.258],
                        itogp: [132.8, 125.8],
                        mes: 12,
                        vmes: 0.12
                    }
                }
            },
            EUR: {
                min: 1000,
                max: 100000,
                trpl: {
                    tp1: {
                        itogd: [1.785, 1.44],
                        itogp: [49, 44],
                        mes: 6,
                        vmes: 0.10
                    },
                    tp2: {
                        itogd: [2.328, 2.258],
                        itogp: [132.8, 125.8],
                        mes: 12,
                        vmes: 0.12
                    }
                }
            }
        };

        var item = {};

        $scope.calc = function() {
            if (!$scope.vzns || +$scope.vzns < sum[$scope.valut].min) {
                $scope.needMin = true;
            } else {
                var max = $scope.vzns > sum[$scope.valut].max;
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var year = date.getFullYear();
                $scope.needMin = false;
                $scope.itogd = Math.floor($scope.vzns * sum[$scope.valut].trpl[$scope.trpl].itogd[+max]) + ' ' + $scope.valut;
                $scope.itogp = sum[$scope.valut].trpl[$scope.trpl].itogp[+max];
                $scope.mes = sum[$scope.valut].trpl[$scope.trpl].mes;
                $scope.lines = [];

                for (var i = 0; i < $scope.mes; i++) {
                    item.date = new Date(year + (month + i > 11), month + i, day);
                    item.sum = i? $scope.mes - i > 2? sum[$scope.valut].trpl[$scope.trpl].vmes:
                        (+$scope.vzns + +$scope.vmes) - ((+$scope.vzns + +$scope.vmes) / 10):
                        Math.floor($scope.vzns * (max? 0.05 : $scope.vmes));
                    item.sum += ' ' + $scope.valut;
                    $scope.lines.push(item);
                }
            }
        }
    });
}());
