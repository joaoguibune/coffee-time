(function () {
    angular
        .module('coffee')
        .controller('coffeeController', function ($scope, myCoffees) {
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });

            function resetObjects() {
                $scope.users = [];
                $scope.userInsert = { name: undefined, totalValue: 0, totalQtd: 0, itens: [{ date: new Date(), value: 0, weight: 0, qtd: 0 }] };
                $scope.userUpdate = { name: undefined, totalValue: 0, totalQtd: 0, itens: [{ date: new Date(), value: 0, weight: 0, qtd: 0 }] };
            }

            $scope.updateUser = function (userUpdate) {
                debugger;
                var user = $scope.users.find(function(item){ return item.id === userUpdate.id; });

                if(user){
                    user.itens.push(userUpdate.itens[0]);
                    myCoffees.update(user).then(function(){
                        resetObjects();
                        loadUsers();
                        $(novo).removeClass('active');
                        $(historico).addClass('active');
                        $scope.$apply();
                    });
                }
            }

            var loadUsers = function () {

                myCoffees.listar().then(function (users) {
                    $scope.users = users;
                })
            }

            loadUsers();
            resetObjects();
        });
})();