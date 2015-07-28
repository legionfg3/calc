(function(){

'use strict';

angular
    .module('app', [])
    .controller('MainCtrl', function ($scope) {
        var vm = $scope;

        function calendar() {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var arr = [];
            for (var i = 0; i < 12; i++) {
                arr.push(new Date(year, month + i + 1, day));
            }
            return arr;
        }

        function razvitie(num) {
            var sum = Math.round(num * vm.vznos / 100);
            vm.nsum = Math.round(5 * vm.vznos / 100);
            vm.itogp = 7 + 12 * (num + 5);
            vm.itog = Math.round(vm.itogp * vm.vznos / 100);
            vm.lines = calendar().map(function(item, i) {
                return {
                    date: item,
                    sum: [2,5,8,11].indexOf(i) + 1? 3 * sum: sum,
                    rem: [2,5,8,11].indexOf(i) + 1? '(к выплате)': '(к зачислению)'
                }
            });
            vm.lines[11].sum += +vm.vznos;
        }

        function valut() {
            vm.usd = true;
            vm.itogp = 120;
            vm.itog = Math.round(vm.itogp * vm.vznos / 100);
            vm.lines = calendar().map(function(item) {
                return {
                    date: item,
                    sum: Math.round(vm.vznos / 10),
                    rem: '(к выплате)'
                }
            });
            vm.lines[11].sum += +vm.vznos;
        }

        function start() {
            vm.itogp = 62;
            vm.itog = Math.round(vm.itogp * vm.vznos / 100);
            vm.lines = calendar().map(function(item, i) {
                return {
                    date: item,
                    sum: Math.round((i < 6? 17: 10) * vm.vznos / 100),
                    rem: '(к выплате)'
                }
            });
        }

        function standart() {
            vm.itogp = 204;
            vm.itog = Math.round(vm.itogp * vm.vznos / 100);
            vm.nsum = Math.round(7 * vm.vznos / 100);
            vm.lines = calendar().map(function(item) {
                return {
                    date: item,
                    sum: Math.round(vm.vznos / 10),
                    rem: '(к выплате)'
                }
            });
            vm.lines[11].sum += +vm.vznos;
        }

        vm.calc = function() {
            vm.lines = [];
            vm.nsum = null;
            vm.usd = false;
            if (vm.trp === 1) { start(); }
            if ((vm.trp === 2) && (vm.vznos > 99999)) { standart(); }
            if ((vm.trp === 3) && (vm.vznos > 1099)) { valut(); }
            if ((vm.trp > 3) && (vm.vznos > 99999)) {
                vm.trp = vm.vznos > 1999999? 6: vm.vznos > 999999? 5: 4;
                razvitie(vm.trp + 9);
            }
        };
    });
}());
