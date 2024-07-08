import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const responses = await ctx.db.query("responses").collect();
    return responses.map((response) => ({ ...response }));
  },
});