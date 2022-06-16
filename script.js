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
        open: function () {
          $('ul.ui-menu').width($(this).innerWidth());
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

function pokemonOptions(pokemonList) {
  for (let i = 0; i < pokemonList.results.length; i++) {
    array.push(
      pokemonList.results[i].name.charAt(0).toUpperCase() + pokemonList.results[i].name.slice(1)
    );
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
    $('#pokImg').attr('src', res.sprites.other.home.front_default);
    console.log(res);

    // Blank the input field
    $('#pokInput').val('');

    // Put the hint
    addResults(
      res.id, // dexNum
      res.types[0].type.name.charAt(0).toUpperCase() + res.types[0].type.name.slice(1), // type
      res.abilities[0].ability.name.charAt(0).toUpperCase() + res.abilities[0].ability.name.slice(1) // ability
    );
  } catch (e) {
    console.log(e);
  }
}
function addResults(dexNum, type, ability) {
  // Div base
  let div = document.createElement('div');
  div.setAttribute('class', 'row bg-primary text-center');

  // Region finder
  let region;
  if (dexNum <= 151) {
    region = 'Kanto';
  } else if (dexNum <= 251) {
    region = 'Jotho';
  } else if (dexNum <= 386) {
    region = 'Hoenn';
  } else if (dexNum <= 493) {
    region = 'Sinooh';
  } else if (dexNum <= 649) {
    region = 'Unova';
  } else if (dexNum <= 721) {
    region = 'Kalos';
  } else if (dexNum <= 809) {
    region = 'Alola ';
  } else if (dexNum <= 898) {
    region = 'Galar ';
  }

  // Region div
  let regionDiv = document.createElement('div');
  regionDiv.setAttribute('class', 'col');
  let regionP = document.createElement('p');
  let text = document.createTextNode(region);
  regionP.appendChild(text);
  regionDiv.appendChild(regionP);
  div.appendChild(regionDiv);

  // Type div
  let typeDiv = document.createElement('div');
  typeDiv.setAttribute('class', 'col');
  let typeP = document.createElement('p');
  text = document.createTextNode(type);
  typeP.appendChild(text);
  typeDiv.appendChild(typeP);
  div.appendChild(typeDiv);

  // Ability div
  let abilityDiv = document.createElement('div');
  abilityDiv.setAttribute('class', 'col');
  let abilityP = document.createElement('p');
  text = document.createTextNode(type);
  abilityP.appendChild(text);
  abilityDiv.appendChild(abilityP);
  div.appendChild(abilityDiv);

  // ID div
  let idDiv = document.createElement('div');
  idDiv.setAttribute('class', 'col');
  let idP = document.createElement('p');
  text = document.createTextNode(type);
  idP.appendChild(text);
  idDiv.appendChild(idP);
  div.appendChild(idDiv);

  // Add the div to the document
  document.getElementById('list').appendChild(div);
  //https://stackoverflow.com/questions/6840326/how-can-i-create-and-style-a-div-using-javascript
  //https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
}

// Document jquery function
$(document).ready(function () {
  // Get value on button click and show alert
  $('#button').click(function () {
    // Get value on the input field #pokInput
    var str = $('#pokInput').val();

    url = `https://pokeapi.co/api/v2/pokemon/${str.toLowerCase()}`;
    console.log('Pokemon url to search:', url);

    try {
      getPokemonData(url);
    } catch (e) {
      console.log(e);
    }
  });
});

function getPokemonOfTheDay() {}

url = 'https://pokeapi.co/api/v2/pokemon?limit=898'; //898
getPokemonList(url);
