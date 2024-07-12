import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  responses: defineTable({
    user: v.string(),
    qual: v.string(),
    quant: v.float64(),
    latitude: v.optional(v.string()),
    longitude: v.optional(v.string()),
    country: v.optional(v.string()),
    region: v.optional(v.string()),
    placeName: v.optional(v.string()),
    datetime: v.optional(v.string()),
    isDay: v.optional(v.number()),
    weather: v.optional(v.string()),
    cloudCover_percent: v.optional(v.number()),
    humidity_percent: v.optional(v.number()),
    heatIndex_C: v.optional(v.number()),
    temp_C: v.optional(v.number()),
    tempFeelsLike_C: v.optional(v.number()),
    dewPoint_C: v.optional(v.number()),
    windChill_C: v.optional(v.number()),
    windDir: v.optional(v.string()),
    wind_kph: v.optional(v.number()),
    gust_kph: v.optional(v.number()),
    carbonMonoxide_m3: v.optional(v.number()),
    ozone_m3: v.optional(v.number()),
    nitrogenDioxide_m3: v.optional(v.number()),
    sulphurDioxide_m3: v.optional(v.number()),
    particulateMatter2_5_m3: v.optional(v.number()),
    particulateMatter10_m3: v.optional(v.number()),
    us_epa_index: v.optional(v.number()),
    gb_defra_index: v.optional(v.number())
  }),
});

export default schema;