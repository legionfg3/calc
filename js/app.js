(function(){

'use strict';

angular
    .module('app', [])
    .controller('MainCtrl', function ($scope) {
        var vm = $scope;

        function razvitie(num) {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var sum = Math.round(num * vm.vznos / 100);
            vm.nsum = Math.round(5 * vm.vznos / 100);
            vm.itogp = 7 + 12 * (num + 5);
            vm.itog = Math.round(vm.itogp * vm.vznos / 100);
            for (var i = 0; i < 12; i++) {
                vm.lines.push({
                    date: new Date(year, month + i + 1, day),
                    sum: [2,5,8,11].indexOf(i) + 1? 3 * sum: sum,
                    rem: [2,5,8,11].indexOf(i) + 1? '(к выплате)': '(к зачислению)'
                });
            }
        }

        vm.calc = function() {
            if (!vm.vznos) { return; }
            vm.lines = [];
            if ((vm.trp > 3) && (vm.vznos > 99999)) {
                vm.trp = vm.vznos > 1999999? 6: vm.vznos > 999999? 5: 4;
                razvitie(vm.trp + 9);
            }
        };
        //vm.calc = function() {
        //    if (!vm.vzns || (+vm.vzns < vm.data[vm.trp12r || vm.valut].min) || (+vm.vzns > vm.data[vm.trp12r || vm.valut].max)) { return; }
        //    var max = !vm.trp12r && (vm.vzns > data[vm.valut].max);
        //    var date = new Date();
        //    var day = date.getDate();
        //    var month = date.getMonth();
        //    var year = date.getFullYear();
        //    var vmes = vm.trp12r? data[vm.trp12r].trpl: data[vm.valut].trpl[vm.mes];
        //    var first = (max? 0.05 : vmes) * vm.vzns;
        //    var last = (vm.trp12r? (1.07 + vmes): (1 + vmes)) * vm.vzns;
        //    var sum = null;
        //
        //    vm.itogd = null;
        //    vm.lines = [];
        //
        //    for (var i = 0; i < vm.mes; i++) {
        //        sum = Math.round(i? vm.mes - i > 1? vmes * vm.vzns: last : first);
        //        vm.itogd += sum;
        //        if (vm.trp12r && ([2,5,8].indexOf(i) + 1)) { sum *= 3; }
        //        if (vm.trp12r && (i === 11)) { sum += 2 * vmes * vm.vzns; }
        //        vm.lines.push({
        //            date: new Date(year, month + i + 1, day),
        //            sum: Math.round(sum),
        //            rem: vm.trp12r? [2,5,8,11].indexOf(i) + 1? '(к выплате)': '(к зачислению)': ''
        //        });
        //    }
        //
        //    vm.itogd -= vm.vzns;
        //    vm.itogp = Math.round((vm.itogd / vm.vzns) * 1000) / 10;
        //    vm.valutp = vm.valut;
        //    vm.mesp = vm.mes;
        //}
    });
}());
