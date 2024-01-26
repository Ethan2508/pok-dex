import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type * as types from "src/api/types"
import { getPokemon, getSinglePokemon } from "src/api/pokemon"

export interface PokemonList {
  name: string
  url: string
}

export const pokemonList: Writable<PokemonList[]> = writable([])
export const pagination: Writable<{ next: string; prev: string }> = writable({
  next: null,
  prev: null,
})
export const singlePokemon: Writable<types.PokemonResponse | undefined> =
  writable(undefined)

export const fetchPokemon = async (options?: {
  offset: number
  limit: number
}) => {
  const data = await getPokemon(options)
  if (!data) throw Error
  pagination.set({ next: data.next, prev: data.previous })
  pokemonList.set(data.results)
}

export const fetchSinglePokemon = async (id: string | number) => {
  const data = await getSinglePokemon(id)
  if (!data) throw Error
  singlePokemon.set(data)
}

export const uppercase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const fetchPokemonByName = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error('Pokémon non trouvé');
    }
    const data = await response.json();
    singlePokemon.set(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const colorLookup = {
  bug: "#A8B820",
  dark: "#705848",
  dragon: "#7038F8",
  electric: "#F8D030",
  fairy: "#EE99AC",
  fighting: "#C03028",
  fire: "#F08030",
  flying: "#A890F0",
  ghost: "#705898",
  grass: "#78C850",
  ground: "#E0C068",
  ice: "#98D8D8",
  normal: "#BEA293",
  poison: "#A040A0",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  water: "#6890F0",

  bugbackground: "#eff3d8",
  darkbackground: "#c7bcb8",
  dragonbackground: "#cbb5fc",
  electricbackground: "#fdf4ce",
  fairybackground: "#fce9ed",
  fightingbackground: "#e8b3b0",
  firebackground: "#f9d3b9",
  flyingbackground: "#ede9fc",
  ghostbackground: "#d7d0e2",
  grassbackground: "#d2edc4",
  groundbackground: "#f6edd5",
  icebackground: "#edf8f8",
  normalbackground: "#F4F4F1",
  poisonbackground: "#eeddee",
  psychicbackground: "#fdcedc",
  rockbackground: "#ebe5c7",
  steelbackground: "#f0f0f5",
  waterbackground: "#e8edfc",
}
