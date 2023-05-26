import { MoonIcon, SunIcon } from "@heroicons/react/solid"
import Image from "next/image"
import CityPicker from "./CityPicker"
import weatherCodeToString from "@/lib/weatherCodeToString"

type Props = {
  city: string
  lat: string
  long: string
  results: Root
}
function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-white p-10">
      <div className="pb-5">
        <h1>{decodeURI(city)}</h1>
        <p className="text-xs text-gray-400">
          long/lat: {long}, {lat}
        </p>
      </div>

      <CityPicker></CityPicker>

      <hr className="my-10"></hr>

      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>

        <p className="tex-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>

      <hr className="mt-10 mb-5"></hr>

      <div>
        <Image
          src={`https://www.weatherbit.io/static/img/icons/${
            weatherCodeToString?.[results?.current_weather?.weathercode].icon
          }.png`}
          alt={
            weatherCodeToString?.[results?.current_weather?.weathercode].label
          }
          width={75}
          height={75}
        ></Image>
        <div>
          <p>{results?.current_weather?.temperature?.toFixed(1)}°C</p>
          <p>
            {weatherCodeToString[results?.current_weather?.weathercode].label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InformationPanel
