angular.module("APP", []);
	angular.module("APP").controller("ctrl", function($scope, $http, $location, $window){

	$scope.unidades = ["hectares", "alqueires"];
	$scope.fazenda = {area_total: 0, area_produtiva: 0, area_reserva: 0, valor_por_hectare: 0, geometria: ''};
	var aux = {id_fazenda: 0, nm_fazenda: ""}
	var resp;
	
	var carregarFazenda = function () {
        $http.post("busca_fazenda.php").success(function(data){
			resp = parseInt(data);
			if(resp === 1){
				$window.location.href = "login.html";
			}
			else{
			}
		}).error(function(data, status){
			console.log(data);
		});
    };		
		
	$scope.Salvar = function (fazenda) {
		console.log(fazenda);
		if((fazenda.area_produtiva + fazenda.area_reserva) <= fazenda.area_total){
			$http.post("cadastra_fazenda.php", fazenda).success(function(data){
				console.log(data);
				aux.id_fazenda = data;
				aux.id_fazenda = parseInt(aux.id_fazenda);
				aux.nm_fazenda = fazenda.nm_fazenda;
				$http.post("cadastra_e2.php", aux).success(function(data){
						console.log(data);	
					}).error(function(data, status){
						console.log(data);
			});	
			}).error(function(data, status){
				console.log(data);
			});
		}
		else{
			$window.alert("Área Produtiva mais a Reserva Averbada não podem ultrapassar a Área Total");
		}
    };	
	carregarFazenda();
	
});