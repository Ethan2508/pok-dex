export interface PokemonResponse {
  name: string
  order: number
  id: number
  abilities: any
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
    }
  }[]
  sprites: any
  types: { slot: number; type: { name: string; url: string } }[]
  moves: any
  abilities: any
}

export interface ManyPokemonResponse {
  count: number
  next: string
  previous: string
  results: { name: string; url: string }[]
}
