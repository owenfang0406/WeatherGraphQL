import axios from "axios"

export async function getFilledAardwolf(): Promise<any> {
  try {
    const response = await axios.get(
      "http://localhost:5001/api/filled-aardwolf"
    )
    return response.data
  } catch (error) {
    // Handle error
    throw error
  }
}
