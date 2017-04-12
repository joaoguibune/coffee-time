(function(){
  angular
  .module('movies')
  .controller('moviesController', function($scope) {
    $scope.titulo = "Filmes que já assisti";

    $scope.filmes = [];

    var carregarFilmes = function(){
      MeusFilmes.listar().then(function(filmes){
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

      MeusFilmes.inserir(filme).then(carregarFilmes);

      $scope.novoFilme = {};
    }

    $scope.removerFilme = function(id) {
      MeusFilmes.remover(id).then(carregarFilmes);
    }

    carregarFilmes();

  });
})();