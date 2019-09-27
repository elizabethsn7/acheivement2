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

  function addListItem(pokemon) {
    var button = document.createElement('button');
    button.innerText = pokemon;
    button.classList.add('pokemonButton');
    $element.appendChild(button);
  }
  // Return an object with public funtions assigned as keys
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({
  name: 'Pikachu',
  height: 2,
  types: ['Water', "Air"]
});

var $element = document.querySelector('ul');

pokemonRepository.getAll().forEach(function(property) {
  var listItem = document.createElement('li');
  $element.appendChild(listItem);
  pokemonRepository.addListItem(property.name);
})
