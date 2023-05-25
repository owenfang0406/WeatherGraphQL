import { getClient } from "@/apollo-client"
import CalloutCard from "@/components/CalloutCard"
import StatCard from "@/components/StatCard"
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
  const result = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "GMT",
    },
  })

  const data: Root = result.data.myQuery
  console.log(data)

  return (
    <div>
      {/*information panel*/}
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at {""}
              {new Date(data.current_weather.time).toLocaleString()}(
              {data.timezone})
            </p>
          </div>

          <div>
            <CalloutCard message="This is where GTP-4 Summary will go"></CalloutCard>
          </div>

          <div>
            <StatCard
              title="Maximum Temperature"
              metric={`${data?.daily?.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            ></StatCard>
            <StatCard
              title="Minimum Temperature"
              metric={`${data?.daily?.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            ></StatCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
