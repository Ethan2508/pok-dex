<script lang="ts">
  import Await from "src/components/Await.svelte"
  import {
    fetchPokemon,
    pagination,
    pokemonList,
    uppercase,
  } from "src/stores/pokemon"
  import { navigate } from "svelte-navigator"
  import { writable } from 'svelte/store';

  let offset = 0
  let limit = 20
  let searchQuery = writable('');
  let filteredPokemon = []; 

  $: promise = fetchPokemon({ offset, limit })

  $: searchQuery.subscribe((query) => {
    if (query) {
      filteredPokemon = $pokemonList.filter(poke => 
        poke.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filteredPokemon = $pokemonList;
    }
  });

  const getPokeNum = (url: string): number => {
    const urlParts = url.split("/")
    const result = +urlParts[urlParts.length - 2]
    return result
  }

  const goBack = () => {
    offset -= 20
  }
  const goFoward = () => {
    offset += 20
    limit = 20
  }
</script>

<style>
    .search-bar {
      margin: 20px auto;
      max-width: 400px;
      display: flex;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 25px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.3s ease-in-out;
    }
  
    .search-bar input {
      flex-grow: 1;
      padding: 10px 20px;
      border: none;
      border-radius: 25px;
      outline: none;
    }
  
    .search-bar input:focus {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    }
  
    .search-icon {
      padding: 0 15px;
      color: #666;
    }
  </style>
  
  <div class="w-11/12 mx-auto">
    <div class="search-bar">
      <input
        bind:value={$searchQuery}
        type="text"
        placeholder="Rechercher un Pokémon"
      />
      <span class="search-icon">🔍</span>
    </div>

  <div class="grid grid-cols-12">
    <div class="h-screen flex items-center justify-center">
    </div>
    <Await {promise}>
      <div slot="waiting" class="grid grid-cols-1 lg:grid-cols-3 w-full col-span-10" />
      <div class="grid grid-cols-1 lg:grid-cols-3 w-full col-span-10" slot="content">
        {#each filteredPokemon as poke}
          <button
            class="card p-3 m-2 bg-base-300 flex justify-center items-center hover:bg-black hover:text-white"
            on:click={() => navigate(`/pokemon/${poke.name}`)}
          >
            <h3 class="text-[30px] mt-8">{uppercase(poke.name)}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPokeNum(poke.url)}.png`}
              class="object-contain h-44"
              alt=""
            />
          </button>
        {/each}
      </div>
    </Await>
    <div class="h-screen flex items-center justify-center">
    </div>
  </div>
</div>
