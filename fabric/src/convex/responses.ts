import type { WeatherAPIData } from '$lib/models/weatherApiData';
import { internal } from './_generated/api';
import { query, mutation, internalAction, internalMutation } from './_generated/server';
import { v } from 'convex/values';


export const get = query({
	args: {},
	handler: async (ctx) => {
		const responses = await ctx.db.query("responses").collect();
		return responses.map((response) => ({ ...response }));
	}
});

export const getByUser = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error('Unauthenticated fetch call.');
		} else {
			const { tokenIdentifier } = identity;
			console.log(tokenIdentifier);
			const responses = await ctx.db
				.query('responses')
				.filter((q) => q.eq(q.field("user"), tokenIdentifier))
				.collect();
			return responses.map((response) => ({ ...response }));
		}
	}
});

export const add = mutation({
  args: {
		quant: v.number(),
		qual: v.string(),
		user: v.string(),
		latitude: v.string(),
		longitude: v.string()
	},
  handler: async (ctx, args) => {
    const newResponseId = await ctx.db.insert("responses", {...args})
    await ctx.scheduler.runAfter(0, internal.responses.fetchWeatherInformation, {
      newResponseId,
      latitude: args.latitude,
      longitude: args.longitude
    })
  }
})

export const fetchWeatherInformation = internalAction({
  args: {
    newResponseId: v.id("responses"),
		latitude: v.string(),
		longitude: v.string()
  },
  handler: async (ctx, args) => {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${args.latitude},${args.longitude}&aqi=yes`)
    const weather = await data.json() as WeatherAPIData
    if (!data.ok) {
      throw new Error(`WeatherAPI Error: ${JSON.stringify(weather)}`)
    }
    console.log(weather)
    await ctx.runMutation(internal.responses.addWeatherContext, {
      newResponseId: args.newResponseId,
      country: weather.location.country,
      region: weather.location.region,
      placeName: weather.location.name,
      datetime: new Date().toJSON(),
      isDay: weather.current.is_day,
      weather: weather.current.condition.text,
      cloudCover_percent: weather.current.cloud,
      humidity_percent: weather.current.humidity,
      heatIndex_C: weather.current.heatindex_c,
      temp_C: weather.current.temp_c,
      tempFeelsLike_C: weather.current.feelslike_c,
      dewPoint_C: weather.current.dewpoint_c,
      windChill_C: weather.current.windchill_c,
      windDir: weather.current.wind_dir,
      wind_kph: weather.current.wind_kph,
      gust_kph: weather.current.gust_kph,
      carbonMonoxide_m3: weather.current.air_quality.co,
      ozone_m3: weather.current.air_quality.o3,
      nitrogenDioxide_m3: weather.current.air_quality.no2,
      sulphurDioxide_m3: weather.current.air_quality.so2,
      particulateMatter2_5_m3: weather.current.air_quality.pm2_5,
      particulateMatter10_m3: weather.current.air_quality.pm10,
      us_epa_index: weather.current.air_quality['us-epa-index'],
      gb_defra_index: weather.current.air_quality['gb-defra-index']
    })
  }
})

export const addWeatherContext = internalMutation({
  args: {
    newResponseId: v.id("responses"),
    country: v.string(),
    region: v.string(),
    placeName: v.string(),
    datetime: v.string(),
    isDay: v.number(),
    weather: v.string(),
    cloudCover_percent: v.number(),
    humidity_percent: v.number(),
    heatIndex_C: v.number(),
    temp_C: v.number(),
    tempFeelsLike_C: v.number(),
    dewPoint_C: v.number(),
    windChill_C: v.number(),
    windDir: v.string(),
    wind_kph: v.number(),
    gust_kph: v.number(),
    carbonMonoxide_m3: v.number(),
    ozone_m3: v.number(),
    nitrogenDioxide_m3: v.number(),
    sulphurDioxide_m3: v.number(),
    particulateMatter2_5_m3: v.number(),
    particulateMatter10_m3: v.number(),
    us_epa_index: v.number(),
    gb_defra_index: v.number()
  },
  handler: async (ctx, args) => {
    const { newResponseId, ...weather } = args
    return await ctx.db.patch(newResponseId, { ...weather })
  }
})



