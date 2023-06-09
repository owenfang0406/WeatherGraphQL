interface CurrentWeather {
  is_day: number
  temperature: number
  time: string
  weathercode: number
  winddirection: number
  windspeed: number
}

interface Daily {
  sunrise: string[]
  sunset: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  time: Date[]
  uv_index_clear_sky_max: number[]
  uv_index_max: number[]
  weathercode: number[]
}

interface DailyUnits {
  sunrise: string
  sunset: string
  temperature_2m_max: string
  temperature_2m_min: string
  time: string
  uv_index_clear_sky_max: string
  uv_index_max: string
  weathercode: string
}

interface Hourly {
  apparent_temperature: number[]
  dewpoint_2m: number[]
  precipitation_probability: number[]
  relativehumidity_2m: number[]
  temperature_2m: number[]
  snowfall: number[]
  rain: number[]
  time: string[]
  uv_index: number[]
  uv_index_clear_sky: number[]
}

interface HourlyUnits {
  apparent_temperature: string
  dewpoint_2m: string
  precipitation_probability: string
  relativehumidity_2m: string
  temperature_2m: string
  snowfall: string
  rain: string
  time: string[]
  uv_index: string
  uv_index_clear_sky: string
}

interface Root {
  current_weather: CurrentWeather
  daily: Daily
  daily_units: DailyUnits
  elevation: number
  generationtime_ms: number
  hourly: Hourly
  hourly_units: HourlyUnits
  latitude: string
  longitude: string
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

interface Query {
  myQuery: (
    current_weather: string,
    daily: string,
    hourly: string,
    latitude: string,
    longitude: string,
    timezone: string
  ) => Promise<Root>
}
