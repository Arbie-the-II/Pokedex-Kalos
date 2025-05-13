/* -------------------------------------------------------------------------- */
/*                                   OBJECTS                                  */
/* -------------------------------------------------------------------------- */
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#ffeea8",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const statNameMapping = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

/* -------------------------------------------------------------------------- */
/*                              GLOBAL FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

function inchesToFeet(inches) {
  let feet = Math.floor(inches / 12);
  let inchesLeft = Math.round(inches % 12);
  return `${feet}'${inchesLeft}"`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/* -------------------------------------------------------------------------- */
/*                            GET POKEMON FROM API                            */
/* -------------------------------------------------------------------------- */

async function getPokemon(specifiedValue = null) {
  let value = specifiedValue || document.querySelector("#poke-input").value.toLowerCase();
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${value}`;
  const speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${value}`;

  try {
    const [pokemonData, speciesData] = await Promise.all([
      fetch(pokemonURL).then((res) => res.json()),
      fetch(speciesURL).then((res) => res.json()),
    ]);

    const pokemon = {
      name: pokemonData.name,
      id: pokemonData.id,
      image: pokemonData.sprites.other["official-artwork"].front_default,
      shiny: pokemonData.sprites.other["official-artwork"].front_shiny,
      type: pokemonData.types.map((type) => type.type.name),
      weight: `${Math.round((pokemonData.weight / 4.536) * 100) / 100} lbs`,
      height: `${inchesToFeet(pokemonData.height * 3.937)} in`,
      abilities: pokemonData.abilities.map((index) => index.ability.name).join(", "),
      stats: {
        name: pokemonData.stats.map((stat) => stat.stat.name),
        base: pokemonData.stats.map((stat) => stat.base_stat),
      },
      description: speciesData.flavor_text_entries
        .filter((entry) => entry.language.name === "en")
        .map((entry) => entry.flavor_text.replace(/\f/g, " "))[0],
    };

    displayPokemon(pokemon);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    document.querySelector(".error").innerText = `**Could not find Pokémon**`;
  }
}

/* -------------------------------------------------------------------------- */
/*                               DISPLAY POKEMON                              */
/* -------------------------------------------------------------------------- */

function displayPokemon(pokemon) {
  const pokeInfo = document.querySelector(".pokemon-info");

  // Apply type-based color
  const mainType = pokemon.type[0];
  const typeColor = typeColors[mainType] || "#A8A878"; // Default to normal type color
  pokeInfo.style.borderColor = typeColor;

  // Dynamically update stats
  const statsHTML = pokemon.stats.name.map((stat, index) => {
    return `
      <div class="stat">
        <span>${statNameMapping[stat]}</span>
        <progress value="${pokemon.stats.base[index]}" max="100"></progress>
      </div>
    `;
  }).join("");

  // Update the Pokémon info section
  pokeInfo.innerHTML = `
    <div class="pokemon-details">
      <div class="pokemon-header" style="background-color: ${typeColor};">
        <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image" />
        <h2>${capitalizeFirstLetter(pokemon.name)} <span>#${pokemon.id}</span></h2>
      </div>
      <div class="pokemon-body">
        <p><strong>Type:</strong> ${pokemon.type.map(capitalizeFirstLetter).join(", ")}</p>
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities}</p>
      </div>
      <div class="pokemon-stats">
        <h2>Stats</h2>
        ${statsHTML}
      </div>
      <div class="pokemon-description">
        <p>${pokemon.description}</p>
      </div>
    </div>
  `;
}

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

document.querySelector("#get-pokemon").addEventListener("click", (event) => {
  event.preventDefault();
  getPokemon();
});

document.querySelector("#poke-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getPokemon();
  }
});