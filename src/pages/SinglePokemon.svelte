<script lang="ts">
  import Await from "src/components/Await.svelte"
  import {
    colorLookup,
    fetchSinglePokemon,
    singlePokemon,
    uppercase,
  } from "src/stores/pokemon"
  import { useParams } from "svelte-navigator"

  let params = useParams()
  $: promise = fetchSinglePokemon($params.id)

  interface Stat {
    base_stat: number
    effort: number
    stat: { name: string }
  }

  const maxStat = (stats: Stat[]): number => {
    const values = []
    stats.forEach((s) => {
      values.push(s.base_stat)
    })
    return Math.max(...values)
  }
</script>

<div class="flex flex-col w-full items-center mt-3">
  <Await {promise}>
    <svelte:fragment slot="content">
      <h1 class="text-6xl font-bold">{uppercase($singlePokemon.name)}</h1>
      <div class="flex">
        {#each $singlePokemon.types as type}
          <div
            class="py-1 px-3 m-1 rounded-full"
            style={`color: ${colorLookup[type.type.name]}; background-color: ${
              colorLookup[type.type.name + "background"]
            };
              border: 1px solid ${colorLookup[type.type.name]}
            `}
          >
            {type.type.name}
          </div>
        {/each}
      </div>
      <img
        src={$singlePokemon.sprites.front_default}
        alt=""
        class="object-contain w-[300px]"
      />
      <div class="w-[75%]">
        {#each $singlePokemon.stats as stat}
          <div class="grid grid-cols-4 w-full my-3">
            <div class="ml-4 text-lg">
              {uppercase(stat.stat.name.replace("-", " "))}
            </div>
            <div class={`flex w-full bg-gray-100 col-span-3`}>
              <div
                class="p-2 font-bold text-lg"
                style={`width: ${
                  (stat.base_stat / maxStat($singlePokemon.stats)) * 100
                }%; color: white; background-color: ${
                  colorLookup[$singlePokemon.types[0].type.name]
                }`}
              >
                <div>
                  {stat.base_stat}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </svelte:fragment>
  </Await>
</div>
