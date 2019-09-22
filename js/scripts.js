// Add three keys to each Pokémon object
var repository= [
  {
    name: 'Bulbasaur',
    height: 7,
    types: [ 'Grass', 'Monster']
  },
  {
    name: 'Charmeleon',
    height: 1.1,
    types: [ 'Monster', 'Dragon']
  },
  {
    name: 'Squirtle',
    height: 0.5,
    types: [ 'Monster', 'Water 1' ]
  }
];

for (var i = 0; i < repository.length; i++) {
  var pokemonHeight = repository[i].height;
  var tallestPokemon = Math.max(pokemonHeight);

  document.write('<br>' + repository[i].name  + ' ' +  'Height: ' + repository[i].height);

  if (tallestPokemon) {
    document.write('-Wow, that\'s tall!');
  }
}





 // I have to list all of the pokemons. THen I want to find the tallestPokemon and once I find it, I want to add a string to it. I think I need to use math.max and then the .push method.


// var tallestPokemon =
//   if(tallestPokemon) {
//     repository[i].height.push(' -Wow, that\'s big!')
//   }
