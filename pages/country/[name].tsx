/* eslint-disable @next/next/no-img-element */

import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useTheme } from "next-themes"
import Head from "next/head"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import { REST_COUNTREIS_URL, FILTER_RES } from "utilities/constants"
import { Country } from "utilities/interfaces"
import { Border, getBorderCountries } from "utilities/services"

interface CountryProps {
 country: Country
 borders: Border[] | null
}
const CountryPage: NextPage<CountryProps> = ({ country, borders }) => {
 const router: NextRouter = useRouter()
 const { resolvedTheme } = useTheme()
 let srcArrow
 switch (resolvedTheme) {
  case "light":
   srcArrow = "icons/arrow-left-dark.svg"
   break
  case "dark":
   srcArrow = "icons/arrow-left.svg"
   break
  default:
   srcArrow = "icons/arrow-left-dark.svg"
   break
 }
 return (
  <main className="container">
   <Head>
    <title>{country.name.common}</title>
    <meta name="description" content={`Details of ${country.name.common}`} />
   </Head>
   <button onClick={router.back} className="back-btn">
    <img src={srcArrow} alt="" />
    Back
   </button>
   <div className="country-details">
    <img src={country.flags.svg} alt={`${country.name.common} Flag`} className="flag" />

    <div className="details">
     <h1>{country.name.common}</h1>
     <div className="info-wrapper">
      <div className="info">
       <p>
        <b>Native Name: </b>
        {Object.values(country.name.nativeName)
         .map((name) => name.common)
         .join(", ")}
       </p>
       <p>
        <b>Population: </b>
        {country.population.toLocaleString("en-US")}
       </p>
       <p>
        <b>Region: </b>
        {country.region}
       </p>
       <p>
        <b>Sub Region: </b>
        {country.subregion}
       </p>
       <p>
        <b>Capital: </b>
        {country.capital}
       </p>
      </div>
      <div className="info">
       <p>
        <b>Top Level Domain: </b>
        {country.tld}
       </p>
       <p>
        <b>Currencies: </b>
        {Object.values(country.currencies)
         .map((currency) => currency.name)
         ?.join(", ")}
       </p>
       <p>
        <b>Languages: </b>
        {Object.values(country.languages).join(", ")}
       </p>
      </div>
     </div>
     {borders && (
      <div className="border-countries">
       <b>Border Countries: </b>
       {borders.map((border) => (
        <Link href={`/country/${border.name.replace(/ /g, "-")}`} key={border.name}>
         <a>{border.name}</a>
        </Link>
       ))}
      </div>
     )}
    </div>
   </div>
  </main>
 )
}

export default CountryPage

import fsPromises from "fs/promises"
import path from "path"
export const getStaticPaths: GetStaticPaths = async () => {
 const filePath = path.join(process.cwd(), "data/countries.json")
 const jsonData = await fsPromises.readFile(filePath, "utf-8")
 const countries: Country[] = JSON.parse(jsonData)
 //  const res = await fetch(`${REST_COUNTREIS_URL}/all?fields=${FILTER_RES}`)
 //  const countries: Country[] = await res.json()

 const paths = countries.map(({ name }) => ({
  params: { name: name.common.replace(/ /g, "-") },
 }))
 return {
  paths,
  fallback: false,
 }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
 const filePath = path.join(process.cwd(), "data/countries.json")
 const jsonData = await fsPromises.readFile(filePath, "utf-8")
 const countries: Country[] = JSON.parse(jsonData)
 //  const res = await fetch(`${REST_COUNTREIS_URL}/all?fields=${FILTER_RES}`)
 //  const countries: Country[] = await res.json()
 const country = countries.find(({ name }) => name.common.replace(/ /g, "-") === params?.name)
 const borders = await getBorderCountries(country?.borders)
 return {
  props: { country, borders }
 }
}
