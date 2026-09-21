import { OPTION_OTHER } from '@/greenvelly/config/constants'

let statesCache: string[] | null = null
let citiesCache: Record<string, string[]> | null = null

export async function loadIndiaStates(): Promise<string[]> {
  if (statesCache) return statesCache
  const res = await fetch('/greenvelly/assets/india_states.json')
  const decoded = (await res.json()) as string[]
  const states = [...decoded]
  if (!states.includes(OPTION_OTHER)) states.push(OPTION_OTHER)
  states.sort((a, b) => a.localeCompare(b))
  statesCache = states
  return states
}

export async function loadIndiaCities(): Promise<Record<string, string[]>> {
  if (citiesCache) return citiesCache
  const res = await fetch('/greenvelly/assets/india_cities.json')
  const raw = (await res.json()) as Record<string, string[]>
  const map = { ...raw }
  if (!map[OPTION_OTHER]) map[OPTION_OTHER] = [OPTION_OTHER]
  citiesCache = map
  return map
}

export async function citiesForState(state: string | null): Promise<string[]> {
  if (!state) return []
  const map = await loadIndiaCities()
  const list = map[state] ?? [OPTION_OTHER]
  if (!list.includes(OPTION_OTHER)) return [...list, OPTION_OTHER]
  return list
}

export async function ensureIndiaLocationsLoaded(): Promise<void> {
  await Promise.all([loadIndiaStates(), loadIndiaCities()])
}
