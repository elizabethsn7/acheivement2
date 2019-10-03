var pokemonRepository = (function () {
  var repository = [ ];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function addListItem(pokemon) {
    var ulElement = document.querySelector('.pokemonList');
    var button = document.createElement('button');
    var listItem = document.createElement('li');
    button.innerText = (pokemon.name);
    button.classList.add('pokemonButton');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);
// **** Add Event listener  **** //
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      var pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }; // *** Closes Return
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded!
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});
