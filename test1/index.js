var service = new pokeapi();

var app = angular.module('app', []).controller('pokemonCtrl', function($scope) {
  var offset = 0;
  var types = [];

  $scope.pokemons = [];
  $scope.isLoading = false;
  $scope.selected = -1;

  $scope.onItemClick = function(index) {
    if ($scope.selected == index) {
      $scope.selected = -1;
    } else {
      $scope.selected = index;
      var pokemon = $scope.pokemons[index];
      $scope.image = service.getImageURL(pokemon.id);
      $scope.name = pokemon.name;

      var types = [];
      for (var i = 0; i < pokemon.types.length; i++) {
        types.push(pokemon.types[i].name);
      }

      $scope.types = types.join(", ");
      $scope.attack = pokemon.attack;
      $scope.defense = pokemon.defense;
      $scope.hp = pokemon.hp;
      $scope.sp_attack = pokemon.sp_attack;
      $scope.sp_defense = pokemon.sp_defense;
      $scope.speed = pokemon.speed;
      $scope.weight = pokemon.weight;
      $scope.total_moves = pokemon.total_moves;
    }
  };

  $scope.onClickLoad = function() {
    offset += 12;
    loadPokemons();
  };

  function loadTypes() {
    update(true);

    service.loadData(service.getTypesURL(), function(text) {
      var data = JSON.parse(text);
      data.objects.forEach(function(data) {
        var type = new typeVO(data);
        $scope.types.push(type);
      });
      update(false);
      loadPokemons();
    }, function (text) {
      update(false);
    });
  }

  function loadPokemons() {
    update(true);

    service.loadData(service.getListURL(offset), function(text) {
      var data = JSON.parse(text);
      data.objects.forEach(function(data) {
        var pokemon = new pokemonVO(data);
        pokemon.image = service.getImageURL(pokemon.id);
        $scope.pokemons.push(pokemon);
        console.log(data);
      });
      update(false);
    }, function (text) {
      update(false);
    });
  }

  function update(loading) {
    $scope.isLoading = loading;

    if(!$scope.$$phase)
      $scope.$apply();
  }

  update(false);
  loadTypes();
  loadPokemons();
});

function pokemonVO(data) {
  var raw = data;

  this.id = raw.pkdx_id;
  this.name = raw.name;
  this.image = "";
  this.types = raw.types;
  this.attack = raw.attack;
  this.defense = raw.defense;
  this.hp = raw.hp;
  this.sp_attack = raw.sp_atk;
  this.sp_defense = raw.sp_def;
  this.speed = raw.speed;
  this.weight = raw.weight;
  this.total_moves = raw.moves.length;
}

function typeVO(data) {
  var raw = data;

  this.id = raw.id;
  this.name = raw.name;
}
