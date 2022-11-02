import { FILTER_RES, REST_COUNTREIS_URL } from "./constants"
import { Country } from "./interfaces"

export const getByName = async (name: string): Promise<Country | null> => {
 const req = await fetch(`${REST_COUNTREIS_URL}/name/${name}?fields=${FILTER_RES}`)
 const res = await req.json()
 if (res.status == 400) return null
 return res[0]
}
export type Border = { name: string }
export const getBorderCountries = async (borders?: string[]): Promise<Border[] | null> => {
 if (borders) {
  const req = await fetch(`${REST_COUNTREIS_URL}/alpha?codes=${borders.join(",")}`)
  const res: Country[] = await req.json()

  // @ts-ignore
  if (res.status == 400) return null

  const borderCountries = res.map((country) => ({
   name: country.name.common,
  }))

  return borderCountries
 }
 return null
}
