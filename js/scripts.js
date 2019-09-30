var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=5';

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

// Modal
(function() {
  function showModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.add('is-visible');
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  function showModal(title, text) {
    var $modalContainer = document.querySelector('#modal-container');
    // Clear all existing Modal content
    $modalContainer.innerHTML = ' ';

    var modal = document.createElement('div');
    modal.classList.add('modal');

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

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  function hideModal() {
    var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');
  }

  function showDialog(title, text) {
    showModal(title, text);
    var $modalContainer = document.querySelector('#modal-container');
    // We want to add a confirm cancel button to the Modal
    var modal = $modalContainer.querySelector('.modal');
    var confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    var cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    confirmButton.focus();

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', () => {
        hideModal();
        reject();
      });
      confirmButton.addEventListener('click', () => {
        hideModal();
        resolve();
      })
    });
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  window.addEventListener('keydown', (e) => {
    var $modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
    $modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the Modal, We only want to close it if the user clicks directly on the overlay
      var target = e.target;
      if(target === $modalContainer) {
        hideModal();
      }
    });
  });
})();
