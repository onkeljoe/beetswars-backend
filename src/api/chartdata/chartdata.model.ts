import * as z from "zod";

export const Chartdata = z.object({
  round: z.string(),
  voteEnd: z.string(),
  totalVotes: z.string(),
  bribedVotes: z.string(),
  totalBribes: z.string(),
  totalVoter: z.string(),
  totalBriber: z.string(),
  priceBeets: z.string(),
  priceFbeets: z.string(),
});

export type Chartdata = z.infer<typeof Chartdata>;
