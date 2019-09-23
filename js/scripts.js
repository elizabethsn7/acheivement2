// Add three keys to each Pokémon object
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
];

for (var i = 0; i < repository.length; i++) {
  var pokeName = repository[i].name;
  var pokeHeight = repository[i].height;
  document.write('<br>' + pokeName + ' ' + ' (' +  'Height : ' + pokeHeight +  ')');

  if(pokeHeight> 2) {
    document.write(' - Wow, that\'s big!');
  }
}
