// Fetch function to get the list of pokemons
function fetchList() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151') //The last number is the quantity of pokemons in the dex
    .then((res) => res.json())
    .then((data) => addPokemon(data));
}

// Add the list of pokemons to the selection tag
function addPokemon(data) {
  let select = document.getElementById('pokemonName');
  // Loop through the list of pokemons
  for (var i = 0; i < data.results.length; i++) {
    text = data.results[i].name;
    text = String(text).charAt(0).toUpperCase() + String(text).slice(1); // Format the name
    select.options[select.options.length] = new Option(text, i + 1); // Add the option
  }
}

fetchList();
