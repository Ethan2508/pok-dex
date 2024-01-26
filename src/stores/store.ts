import { get, writable } from "svelte/store"
import type { Writable } from "svelte/store"

export const selectedTags: Writable<string[]> = writable([])

export const setSelectedTags = (tag: string) => {
  if (get(selectedTags).includes(tag)) {
    selectedTags.update((prev) => {
      return prev.filter((t) => t !== tag)
    })
  } else {
    selectedTags.update((prev) => {
      return [...prev, tag]
    })
  }
}
