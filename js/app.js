(function(){

'use strict';

angular
    .module('app', [])
    .controller('Main', function ($scope) {
        var data = {
            RUB: {
                min: 35000,
                max: 5000000,
                trpl: {
                    6: 0.15,
                    12: 0.17
                }
            },
            USD: {
                min: 1000,
                max: 150000,
                trpl: {
                    6: 0.10,
                    12: 0.12
                }
            },
            EUR: {
                min: 1000,
                max: 100000,
                trpl: {
                    6: 0.10,
                    12: 0.12
                }
            },
            tp12r1: {
                min: 100000,
                max: 999999,
                trpl: 0.18
            },
            tp12r2: {
                min: 1000000,
                max: 1999999,
                trpl: 0.19
            },
            tp12r3: {
                min: 2000000,
                max: 1000000000,
                trpl: 0.20
            }
        };
        $scope.data = data;
        $scope.calc = function() {
            var max = !$scope.trp12r && ($scope.vzns > data[$scope.valut].max);
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var vmes = $scope.trp12r? data[$scope.trp12r].trpl: data[$scope.valut].trpl[$scope.mes];
            var first = (max? 0.05 : vmes) * $scope.vzns;
            var last = (1 + vmes) * $scope.vzns * ($scope.trp12r? 1.07: 0.9);
            var sum = null;

            $scope.needMin = false;
            $scope.itogd = null;
            $scope.lines = [];

            for (var i = 0; i < $scope.mes; i++) {
                sum = Math.floor(i? $scope.mes - i > 1? vmes * $scope.vzns: last : first);
                $scope.itogd += sum;
                $scope.lines.push({
                    date: new Date(year, month + i, day),
                    sum: sum
                });
            }

            $scope.itogp = Math.floor((($scope.itogd / $scope.vzns) - 1) * 1000) / 10;
            $scope.valutp = $scope.valut;
            $scope.mesp = $scope.mes;
        }
    });
}());
