// Add three keys to each Pokémon object
var repository= [
  {
    name: 'Bulbasaur',
    height: 7,
    types: [
      'Grass',
      'Monster',
    ]
  },
  {
    name: 'Charmeleon',
    height: 1.1,
    types: [
      'Monster' ,
      'Dragon'
    ]
  },
  {
    name: 'Squirtle',
    height: 0.5,
    types: [
      'Monter',
      'Water1'
    ]
  }
];

for (var i = 0; i < repository.length; i++) {
  document.write(repository.name.height.types);
}
