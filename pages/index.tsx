/* eslint-disable @next/next/no-img-element */
import CountryCard from "@/components/CountryCard"
import type { NextPage } from "next"
import { GetStaticProps } from "next"
import { Country } from "utilities/interfaces"
import { FILTER_RES, REGIONS, REST_COUNTREIS_URL } from "utilities/constants"
import Head from "next/head"
import { useState } from "react"
import { useTheme } from "next-themes"
import { useMemo } from "react"

interface CountriesProps {
 countries: Country[]
}

const Home: NextPage<CountriesProps> = ({ countries }) => {
 const [query, setQuery] = useState("")
 const [filterRegion, setFilterRegion] = useState("")
 const [filterOn, setFilterOn] = useState(false)
 const { resolvedTheme } = useTheme()
 let srcSearch, srcChevron

 switch (resolvedTheme) {
  case "light":
   srcSearch = "icons/search-dark.svg"
   srcChevron = "icons/chevron-down-dark.svg"
   break
  case "dark":
   srcSearch = "icons/search.svg"
   srcChevron = "icons/chevron-down.svg"
   break
  default:
   srcSearch = "icons/search-dark.svg"
   srcChevron = "icons/chevron-down-dark.svg"
   break
 }

 const filteredCountries = useMemo(() => {
  return countries
   .sort((a, b) => a.name.common.localeCompare(b.name.common))
   .filter(({ name }) => name.common.toLowerCase().includes(query.toLowerCase()))
   .filter(({ region }) => region.includes(filterRegion))
 }, [countries, filterRegion, query])
 return (
  <>
   <Head>
    <meta name="description" content="REST Countries API with color theme switcher" />
    <title>REST Countries API</title>
   </Head>

   <div className="filters container">
    <div className="search">
     <img src={srcSearch} alt="" />
     <input
      name="search"
      type="text"
      placeholder="Search for a country..."
      onChange={(e) => {
       setQuery(e.target.value)
      }}
     />
    </div>
    <button className="filter-btn" onClick={() => setFilterOn(!filterOn)}>
     Filter by Region
     <img src={srcChevron} alt="" />
     {filterOn && (
      <div className="filter-list" aria-hidden={!filterOn}>
       <button onClick={() => setFilterRegion("")}>All</button>
       {REGIONS.map((region) => (
        <button onClick={() => setFilterRegion(region)} key={region}>
         {region}
        </button>
       ))}
      </div>
     )}
    </button>
   </div>
   <main className="countries-list container">
    {/* {countries
     .sort((a, b) => a.name.common.localeCompare(b.name.common))
     .filter(({ name }) => name.common.toLowerCase().includes(query.toLowerCase()))
     .filter(({ region }) => region.includes(filterRegion))
     .map((country) => (
      <CountryCard {...country} key={country.name.official} />
     ))} */}
    {filteredCountries.map((country) => (
     <CountryCard {...country} key={country.name.official} />
    ))}
   </main>
  </>
 )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
 const res = await fetch(`${REST_COUNTREIS_URL}/all?fields=${FILTER_RES}`)
 const countries = await res.json()
 return {
  props: { countries },
 }
}
