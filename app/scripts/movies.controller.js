(function(){
  angular
  .module('movies')
  .controller('moviesController', function($scope, myMovies) {
    $scope.titulo = "Filmes que já assisti";

    $scope.filmes = [];

    var carregarFilmes = function(){
      myMovies.listar().then(function(filmes){
        $scope.filmes = filmes;
      });
    }

    $scope.novoFilme = {};

    $scope.criarFilme = function() {
      var filme = {
        id: Date.now() + "",
        titulo: $scope.novoFilme.titulo,
        ano: $scope.novoFilme.ano,
        produtora: $scope.novoFilme.produtora,
        sinopse: $scope.novoFilme.sinopse,
        cartaz: $scope.novoFilme.cartaz
      };

      myMovies.insert(filme).then(carregarFilmes);

      $scope.novoFilme = {};
    }

    $scope.removerFilme = function(id) {
      myMovies.delete(id).then(carregarFilmes);
    }



    carregarFilmes();

  });
})();