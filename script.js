let array = [];
async function getPokemonList(url) {
  try {
    let res = await fetch(`${url}`);
    res = await res.json();
    console.log(res);
    console.log(res.results.length);
    //console.log(pokemonOptions(res));
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

url = 'https://pokeapi.co/api/v2/pokemon?limit=151'; //898
getPokemonList(url);
