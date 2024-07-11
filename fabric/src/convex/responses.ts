import { query, mutation } from "./_generated/server";
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    const responses = await ctx.db.query("responses").collect();
    return responses.map((response) => ({ ...response }));
  },
});

export const getByUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthenticated fetch call.");
    } else {
      const { tokenIdentifier } = identity;
      console.log(tokenIdentifier)
      const responses = await ctx.db.query("responses").filter((q) => q.eq(q.field("user_id"), tokenIdentifier)).collect();
      return responses.map((response) => ({ ...response }));
    }
  }
})

export const add = mutation({
  args: { quant: v.number(), qual: v.string(), user: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("responses", { quant: args.quant, qual: args.qual, user: "Sam" })
  }
})