var pokemonRepository = (function() {
  var repository = [{
      name: 'Bulbasaur',
      height: 7,
      types: ['Grass', 'Monster']
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      types: ['Monster', 'Dragon']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['Monster', 'Water 1']
    }
  ]; // Closes repository[]

  // Make sure both getAll and add are defined separatetly
  //with the function keyword.
  function add(pokemon) {
    // Check if the typeof parameter is an object
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }
  // Return an object with public funtions assigned as keys
  return {
    add: add,
    getAll: getAll
  };

  // Attempting Bonus ro no Avail...
  function filteredNames() {
    var names = repository.name;
    return filteredNames === names.filter('Squirtle')
  }
  console.log(filteredNames);
})();

// Update to use one of the two functions returned by the IIFE in order to retrieve the repository array.
console.log(pokemonRepository.getAll());
pokemonRepository.add({
  name: 'Pikachu',
  height: 2,
  types: ['Water', "Air"]
});
console.log(pokemonRepository.getAll());

//  Validate whether all Object.keys()of the parameter are equal to the specific keys
Object.keys(pokemonRepository).forEach(function(property) {
  console.log(pokemonRepository[property]);
});
