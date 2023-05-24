import { getClient } from "@/apollo-client"
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"

type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

import React from "react"

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient()
  const response = await client
    .query({
      query: fetchWeatherQuery,
      variables: {
        current_weather: "true",
        latitude: lat,
        longitude: long,
        timezone: "GMT",
      },
    })
    .then((result) => {
      console.log("first")
      const data: Root = result.data.myQuery
      console.log(data)
    })
    .catch((error) => {
      console.log("ErRRRRR")
      console.error(error)
    })

  return (
    <div>
      page {city} {lat} {long}
    </div>
  )
}

export default WeatherPage
