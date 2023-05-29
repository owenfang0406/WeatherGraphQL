import openai from "@/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { weatherData } = await request.json()

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you are a weather news presenter presenting LIVE on television. Be energetic and fill of charisma.
                Introduce yourself as Owen and say you are LIVE from the Owen Happy Coding Hub. State the city you are providing a summary for.
                Then give a summary of todays weather only. Make it easy for viewers to understand and know what to do to prepare for those weather conditions
                such as wear SPF if the UV is hight etc. use the uv_index data to provide UV advise. Provide a joke regarding the weather. Assume the
                data come from your team at the news office and not the user.`,
      },
      {
        role: "user",
        content: `Hi there, can I can get a summary of todays weather, user the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  })

  const { data } = response
  //   console.log("DATA IS: ", data)
  return NextResponse.json(data.choices[0].message)
}
