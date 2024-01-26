<script lang="ts">
  import SinglePokemon from "src/pages/SinglePokemon.svelte"

    let searchQuery = '';
    let pokemonData = null;
    let error = '';
    let timeout;
  
    async function fetchPokemon(name) {
      const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Pokémon non trouvé');
      }
      return await response.json();
    }
  
    function search() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        if (searchQuery) {
          fetchPokemon(searchQuery)
            .then(data => {
              pokemonData = data;
              error = '';
            })
            .catch(err => {
              error = err.message;
              pokemonData = null;
            });
        }
      }, 500); 
    }
  
    $: searchQuery, search();
  </script>
  
  <style>
    .search-container {
      max-width: 400px;
      margin: 20px auto;
      text-align: center;
    }
  
    .search-bar {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
  
    .error {
      color: red;
    }
  
    .pokemon-info {
        border: 2px solid #ddd;
        border-radius: 4px;
        padding: 10px;
    }
  </style>
  
  <div class="search-container">
    <input
      bind:value={searchQuery}
      class="search-bar"
      type="text"
      placeholder="Rechercher un Pokémon"
    />
    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if pokemonData}
      <div class="pokemon-info">
        <h2>{pokemonData.name}</h2>
        <a href="pokemon/{pokemonData.name}"><img src={pokemonData.sprites.front_default} alt={pokemonData.name} /></a>
        <h2>{pokemonData.type}</h2>
        
      </div>
    {/if}
  </div>
  
  
