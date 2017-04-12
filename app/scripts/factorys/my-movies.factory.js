angular.module("movies").factory("myMovies", function($q,$http){
    
    return{
       listar: function(){
           var q = $q.defer();

           $http.get("https://movies-watched.firebaseio.com/filmes.json").then(
               function(result){
                    var filmes = [];

                    angular.forEach(result.data, function(filme, id){
                        filme.id = id;
                        filmes.push(filme);
                    });

                    q.resolve();
                })

           return q.promise;

       }     
    }
});