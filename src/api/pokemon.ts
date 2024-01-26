import { BASE_URL, fetchJson, POKEMON_PATH } from "./config"
import type * as types from "./types"

export const getPokemon = async (options?: {
  offset: number
  limit: number
}): Promise<types.ManyPokemonResponse> => {
  console.log(
    "path :>> ",
    `${BASE_URL}${POKEMON_PATH}${
      options ? "?offset=" + options.offset + "&limit=" + options.limit : "100"
    }`
  )
  return fetchJson(
    `${BASE_URL}${POKEMON_PATH}${
      options ? "?offset=" + options.offset + "&limit=" + options.limit : "100"
    }`
  )
}

export const getSinglePokemon = async (
  nameOrId: string | number
): Promise<types.PokemonResponse> => {
  return fetchJson(`${BASE_URL}${POKEMON_PATH}/${nameOrId}`)
}
