var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=3';

  // Make sure both getAll and add are defined separatetly
  //with the function keyword.
  function add(pokemon) {
      repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
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
          detailsUrl: item.url,
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

// Modal
function showModal (title, text) {
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.innerHTML= ' ';
  var modal =document.createElement('div');
  modal.classList.add('modal');

  // Add the modal content
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
}

function hideModal() {
  var $modalContainer = document.querySelector('#modal-container');
  $modalContainer.classList.remove('is-visible');
}

document.querySelector('.pokemonList').addEventListener('click', () => {
  showModal('Append the current pokemons name here', 'this is the modal content that needs to be replaced with the pokemons info');
});

window.addEventListener('keydown', (e) => {
  var $modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
  $modalContainer.addEventListener('click', (e) => {
    // Closes the modal if the user clicks directly on the overlay
    var target = e.target;
    if(target === $modalContainer) {
      hideModal();
    }
    console.log(target);
  });
})
