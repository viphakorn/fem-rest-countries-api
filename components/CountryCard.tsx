/* eslint-disable @next/next/no-img-element */
import { FC } from "react"
import Link from "next/link"
import { Country } from "utilities/interfaces"

const CountryCard: FC<Country> = ({ flags, name, population, region, capital }) => {
 return (
  <Link href="/country/[name]" as={`/country/${name.common.replace(/ /g, "-")}`}>
   <a>
    <div className="country-card">
     <img src={flags.svg} alt={`${name.common} Flag`} className="flag" />
     <div className="details">
      <h1>{name.common}</h1>
      <p>
       <b>Population: </b>
       {population.toLocaleString("en-US")}
      </p>
      <p>
       <b>Region: </b>
       {region}
      </p>
      <p>
       <b>Capital: </b>
       {capital}
      </p>
     </div>
    </div>
   </a>
  </Link>
 )
}

export default CountryCard
