export const BASE_URL = "https://pokeapi.co/api/v2"
export const POKEMON_PATH = "/pokemon"

export const fetchJson = async (
  path: string,
  options?: { headers?: any; method?: string }
) => {
  try {
    const response = await fetch(path, options)
    if (!response.ok) {
      console.error(response.url, response.status)
    }
    const data = await response.json()
    return data
  } catch (e) {
    if (e instanceof Error) {
      console.error(`e.message`, e.message)
    }
  }
}
