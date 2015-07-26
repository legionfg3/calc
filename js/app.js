(function(){

'use strict';

angular
    .module('app', [])
    .controller('MainCtrl', function ($scope) {
        var vm = $scope;
        var data = {
            RUB: {
                min: 100000,
                max: 999999999,
                trpl: 0.10
            },
            USD: {
                min: 1100,
                max: 999999999,
                trpl: 0.10
            },
            tp12r1: {
                min: 100000,
                max: 999999,
                trpl: 0.13
            },
            tp12r2: {
                min: 1000000,
                max: 1999999,
                trpl: 0.14
            },
            tp12r3: {
                min: 2000000,
                max: 999999999,
                trpl: 0.15
            }
        };

        vm.data = data;

        vm.calc = function() {
            if (!vm.vzns || (+vm.vzns < vm.data[vm.trp12r || vm.valut].min) || (+vm.vzns > vm.data[vm.trp12r || vm.valut].max)) { return; }
            var max = !vm.trp12r && (vm.vzns > data[vm.valut].max);
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var vmes = vm.trp12r? data[vm.trp12r].trpl: data[vm.valut].trpl[vm.mes];
            var first = (max? 0.05 : vmes) * vm.vzns;
            var last = (vm.trp12r? (1.07 + vmes): (1 + vmes)) * vm.vzns;
            var sum = null;

            vm.itogd = null;
            vm.lines = [];

            for (var i = 0; i < vm.mes; i++) {
                sum = Math.round(i? vm.mes - i > 1? vmes * vm.vzns: last : first);
                vm.itogd += sum;
                if (vm.trp12r && ([2,5,8].indexOf(i) + 1)) { sum *= 3; }
                if (vm.trp12r && (i === 11)) { sum += 2 * vmes * vm.vzns; }
                vm.lines.push({
                    date: new Date(year, month + i + 1, day),
                    sum: Math.round(sum),
                    rem: vm.trp12r? [2,5,8,11].indexOf(i) + 1? '(к выплате)': '(к зачислению)': ''
                });
            }

            vm.itogd -= vm.vzns;
            vm.itogp = Math.round((vm.itogd / vm.vzns) * 1000) / 10;
            vm.valutp = vm.valut;
            vm.mesp = vm.mes;
        }
    });
}());
