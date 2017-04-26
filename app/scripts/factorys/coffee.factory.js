angular.module("coffee").factory("myCoffees", function($q,$http){
    
   return {
		listar: function() {
			
			var promessa = $q.defer();

			$http.get("https://coffee-time-1c2fc.firebaseio.com/lancamentos.json").then(
				function(result){
					var users = [];
					
					angular.forEach(result.data, function(user, id){
						user.id = id;
						
						users.push(user);
					});

					promessa.resolve(users);
				}
			);

			return promessa.promise;
		},
		
		insert: function(user) {		
			 return $http.post("https://coffee-time-1c2fc.firebaseio.com/lancamentos.json", user);
		},
		
		update: function(user) {
			var id = user.id;
			delete user.id;
			
			return $http.put("https://coffee-time-1c2fc.firebaseio.com/lancamentos/" + id + ".json", user);
		},

		delete: function(id) {
			return $http.delete("https://coffee-time-1c2fc.firebaseio.com/lancamentos/" + id + ".json");
		}
}

});
