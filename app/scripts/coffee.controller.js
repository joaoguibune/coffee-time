(function(){
  angular
  .module('coffee')
  .controller('coffeeController', function($scope, myCoffees) {
  

        function resetObjects(){
            $scope.users = [];
            $scope.userInsert = { code: -1, name: undefined, total: 0, itens: [ { date: new Date(), value: 0, weight: 0, qtd: 0 } ] };
            $scope.userUpdate = { code: -1, name: undefined, total: 0, itens: [ { date: new Date(), value: 0, weight: 0, qtd: 0 } ] };
        }

        function updateUser(){
            myCoffees.updateUser($scope.userUpdate).then(loadUsers);
        }

        var loadUsers = function(){
          myCoffees.listar().then(function(users){
            $scope.users = users;
          })
        }

        loadUsers();
        resetObjects();
    });
})();