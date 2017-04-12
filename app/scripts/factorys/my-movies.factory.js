angular.module("movies").factory("myMovies", function($q,$http){
    
   return {
		listar: function() {
			var promessa = $q.defer();

			$http.get("https://movies-watched.firebaseio.com/filmes.json").then(
				function(result){
					var filmes = [];

					angular.forEach(result.data, function(filme, id){
						filme.id = id;
						filmes.push(filme);
					});

					promessa.resolve(filmes);
				}
			);

			return promessa.promise;
		},
		insert: function(filme) {
			var id = filme.id;
			delete filme.id;

			return $http.put("https://movies-watched.firebaseio.com/filmes/" + id + ".json", filme);
		},
		delete: function(id) {
			return $http.delete("https://movies-watched.firebaseio.com/filmes/" + id + ".json");
		}
}

});
