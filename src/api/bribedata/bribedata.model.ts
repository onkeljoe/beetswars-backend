import * as z from "zod";

export const Tokendata = z.object({
  token: z.string(),
  tokenaddress: z.string(),
  coingeckoid: z.string(),
  bptpoolid: z.string(),
  isbpt: z.boolean(),
  lastprice: z.number(),
});

export const Reward = z.object({
  type: z.string(),
  token: z.string(),
  amount: z.number(),
  isfixed: z.boolean(),
});

export const Additionalrewards = z.object({
  tier: z.string(),
  factor: z.number(),
});

export const Bribedata = z.object({
  voteindex: z.number(),
  poolname: z.string(),
  poolurl: z.string(),
  rewarddescription: z.string(),
  assumption: z.string(),
  percentagethreshold: z.number().optional(),
  rewardcap: z.number().optional(),
  additionalrewards: Additionalrewards.array().optional(),
  reward: Reward.array(),
  payoutthreshold: z.number().optional(),
});

export const Bribefile = z.object({
  version: z.string(),
  snapshot: z.string(),
  description: z.string(),
  round: z.number(),
  voteStart: z.number(),
  voteEnd: z.number(),
  snapshotDateTime: z.number(),
  tokendata: Tokendata.array(),
  bribedata: Bribedata.array(),
});

export type Tokendata = z.infer<typeof Tokendata>;
export type Reward = z.infer<typeof Reward>;
export type Additionalrewards = z.infer<typeof Additionalrewards>;
export type Bribedata = z.infer<typeof Bribedata>;
export type Bribefile = z.infer<typeof Bribefile>;
