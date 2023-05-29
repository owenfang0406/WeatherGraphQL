import { getClient } from "@/apollo-client"
import CalloutCard from "@/components/CalloutCard"
import HumidityChart from "@/components/HumidityChart"
import InformationPanel from "@/components/InformationPanel"
import RainChart from "@/components/RainChart"
import StatCard from "@/components/StatCard"
import TempChart from "@/components/TempChart"
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"
import getBasePath from "@/lib/getBasePath"
import cleanData from "@/lib/cleanData"

export const revalidate = 60

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

  const dataToSend = cleanData(data, city)
  // console.log(dataToSend)
  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend,
    }),
  })

  const GPTdata = await res.json()
  const { content } = GPTdata

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InformationPanel
        city={city}
        lat={lat}
        long={long}
        results={data}
      ></InformationPanel>
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at {""}
              {new Date().toLocaleTimeString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              ({data.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={content}></CalloutCard>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
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

            <div>
              <StatCard
                title="UV Index"
                metric={`${data?.daily?.uv_index_max[0].toFixed(1)}°`}
                color="rose"
              ></StatCard>

              {Number(data?.daily?.temperature_2m_max[0].toFixed(1)) > 5 && (
                <div className="mt-5">
                  <CalloutCard
                    message="The UV is high today, be sure to wear SPF!"
                    warning
                  ></CalloutCard>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${data?.current_weather?.windspeed.toFixed(1)}m/s`}
                color="cyan"
              ></StatCard>

              <StatCard
                title="Wind Direction"
                metric={`${data?.current_weather?.winddirection.toFixed(1)}°`}
                color="violet"
              ></StatCard>
            </div>
          </div>
        </div>
        <hr className="mb-5"></hr>
        <div className="space-y-3">
          <TempChart results={data}></TempChart>
          <RainChart results={data}></RainChart>
          <HumidityChart results={data}></HumidityChart>
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
