import { PUBLIC_WEATHER_API_KEY } from '$env/static/public';

export async function getWeatherInformationFromCoordinates(latitude: number, longitude: number) {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${PUBLIC_WEATHER_API_KEY}$q=${latitude},${longitude}&aqi=yes`)
  const weather = res.json()
  return console.log(weather)
}