var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  function addListItem(pokemon) {
    var $element = document.querySelector('ul');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButton');
    $element.appendChild(listItem);
    $element.appendChild(button);
    button.addEventListener('click', function(showDetails) {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    });
  }
  // Return an object with public funtions assigned as keys
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});
