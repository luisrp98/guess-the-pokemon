let array = [];
async function getPokemonList(url) {
  try {
    let res = await fetch(`${url}`);
    res = await res.json();
    console.log(res);
    console.log(res.results.length);
    array = pokemonOptions(res);
    $('#pokInput').autocomplete(
      { source: array },
      {
        autofocus: true,
        delay: 0,
        minLength: 1,
      }
    );
  } catch (e) {
    console.log(e);
  }
}

function pokemonOptions(pokemonList) {
  for (let i = 0; i < pokemonList.results.length; i++) {
    array.push(pokemonList.results[i].name);
  }
  return array;
}

// Function that get the input string of the pokemon and return his data
// This function is called by $(document).ready
async function getPokemonData(url) {
  try {
    // Fetch the url of the pokemon
    let res = await fetch(`${url}`);
    res = await res.json();

    // Change the img source to the front default sprite of the pokemon
    $('#pokImg').attr('src', res.sprites.front_default);

    // Blank the input field
    $('#pokInput').val('');
  } catch (e) {
    console.log(e);
  }
}

// Document jquery function
$(document).ready(function () {
  // Get value on button click and show alert
  $('#button').click(function () {
    // Get value on the input field #pokInput
    var str = $('#pokInput').val();

    url = `https://pokeapi.co/api/v2/pokemon/${str}`;
    console.log('Pokemon url to search:', url);

    try {
      getPokemonData(url);
    } catch (e) {
      console.log(e);
    }
  });
});

url = 'https://pokeapi.co/api/v2/pokemon?limit=898'; //898
getPokemonList(url);
