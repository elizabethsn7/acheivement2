var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(pokemon.name);
      });
    }); // ** closes (Promise?) ** //
  } //  ***** Closes showDetails ***** //

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

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    }).catch(function(e) {
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

function showModal(title, text) {
  var $modalContainer = document.querySelector('#modal-container');
  //Clear existing modal conent
  $modalContainer.innerHTML = ' ';
  var modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  var closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  var titleElement = document.createElement('h1');
  titleElement.innerText = title;

  var contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  $modalContainer.appendChild(modal);

  $modalContainer.classList.add('is-visible');
} // *** Closes showModal *** //

function hideModal() {
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.remove('is-visible');
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal Title', 'This is the modal content.');
});

window.addEventListener('keydown', (e) => {
  var $modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
})
