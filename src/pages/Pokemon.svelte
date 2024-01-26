<script lang="ts">
  import Await from "src/components/Await.svelte"
  import {
    fetchPokemon,
    pagination,
    pokemonList,
    uppercase,
  } from "src/stores/pokemon"
  import { navigate } from "svelte-navigator"

  let offset = 0
  let limit = 20

  $: promise = fetchPokemon({ offset, limit })

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

<div class="w-11/12 grid grid-cols-12 mx-auto">
  <div class="h-screen flex items-center justify-center">
    <button
      class="btn btn-ghost"
      disabled={$pagination.prev == null}
      on:click={goBack}>Back</button
    >
  </div>
  <Await {promise}>
    <div
      slot="waiting"
      class="grid grid-cols-1 lg:grid-cols-3 w-full col-span-10"
    />
    <div
      class="grid grid-cols-1 lg:grid-cols-3 w-full col-span-10"
      slot="content"
    >
      {#each $pokemonList as poke}
        <button
          class="card p-3 m-2 bg-base-300 flex justify-center items-center hover:bg-black hover:text-white"
          on:click={() => navigate(`/pokemon/${poke.name}`)}
        >
          <h3 class="text-[30px] mt-8">{uppercase(poke.name)}</h3>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${getPokeNum(
              poke.url
            )}.png`}
            class="object-contain h-44"
            alt=""
          />
        </button>
      {/each}
    </div>
  </Await>
  <div class="h-screen flex items-center justify-center">
    <button
      class="btn btn-ghost"
      disabled={$pagination.next == null}
      on:click={goFoward}>Forward</button
    >
  </div>
</div>
