(function () {
    angular
        .module('coffee')
        .controller('coffeeController', function ($scope, myCoffees) {
            $('.datepicker').pickadate({
                format: 'dd/mm/yyyy',
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            });

            $scope.next_buyer = {};
              

            function resetObjects() {
                $scope.users = [];
                $scope.usersList = [];
                $scope.userInsert = { name: undefined, totalValue: 0, totalQtd: 0, itens: [{ date: new Date(), value: 0, weight: 0, qtd: 0 }] };
                $scope.userUpdate = { name: undefined, totalValue: null, totalQtd: 0, itens: [{ date: new Date(), value: null, weight: 50, qtd: 1 }] };
            }

            $scope.updateUser = function (userUpdate) {
                
                var user = $scope.users.find(function (item) { return item.id === userUpdate.id; });
                user.totalQtd = parseInt(user.totalQtd) + parseInt(userUpdate.itens[0].qtd);
                user.last_buy = userUpdate.itens[0].date;
                if (user) {
                  
                    if(!user.itens) user.itens = [];
                    user.itens.push(userUpdate.itens[0]);
                    myCoffees.update(user).then(function () {
                        resetObjects();
                        loadUsers();
                        $(novo).removeClass('active');
                        $(historico).addClass('active');
                        location.reload(true);
                       
                    });
                }
            }

            var loadUsers = function () {

                myCoffees.listar().then(function (users) {
                    $scope.users = users;

                    $scope.users.forEach(function (user) {
                        if(!$scope.next_buyer.last_buy || user.last_buy < $scope.next_buyer.last_buy){
                            $scope.next_buyer = user;
                        }
                        if(user.itens) user.itens.forEach(function (item) {
                            $scope.usersList.push({
                                name: user.name,
                                date: item.date,
                                value: item.value,
                                qtd: item.qtd,
                                weight: item.weight
                            });
                        });
                    });
                });
            }

            loadUsers();
            resetObjects();
        });
})();