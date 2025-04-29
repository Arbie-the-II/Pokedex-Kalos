document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById('poke-input');
  const searchButton = document.getElementById('get-pokemon');
  inputField.style.display = 'none';
  searchButton.style.display = 'none';
});

function togglePokedex() {
  const pokedexTop = document.querySelector('.pokedex-top');
  const pokedexBottom = document.querySelector('.pokedex-bottom');
  const pokedexInfo = document.querySelector('.pokedex-info');
  const closeButton = document.getElementById('pokedex-close');
  const startButton = document.getElementById('pokedex-start');
  const pokemonInfo = document.querySelector('.pokemon-info');
  const inputField = document.getElementById('poke-input');
  const searchButton = document.getElementById('get-pokemon');
  const errorMessage = document.querySelector('.error');

  if (closeButton.style.display === 'block' || closeButton.style.display === '') {
    pokedexTop.classList.remove('open-one');
    pokedexBottom.classList.remove('open-two');
    pokedexInfo.classList.remove('while-open');
    closeButton.style.display = 'none';
    startButton.style.display = 'block';
    pokemonInfo.innerHTML = '';
    inputField.value = '';
    errorMessage.innerText = '';
    inputField.style.display = 'none';
    searchButton.style.display = 'none';
  } else {
    pokedexTop.classList.add('open-one');
    pokedexBottom.classList.add('open-two');
    pokedexInfo.classList.add('while-open');
    closeButton.style.display = 'block';
    startButton.style.display = 'none';
    inputField.style.display = 'block';
    searchButton.style.display = 'block';
    inputField.focus();
  }
}
