import { type WeatherAPIData } from '$lib/models/weatherApiData';

export async function getWeatherInformationFromCoordinates(apiKey: string, latitude: number | string, longitude: number | string) {
  const res = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`
	)

  if (!res.ok) {
    throw new Error(`request failed: ${res.status}`)
  }

  const data = await res.json()
  return data as WeatherAPIData
}
