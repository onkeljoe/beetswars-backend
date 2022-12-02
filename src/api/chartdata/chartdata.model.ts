import * as z from "zod";

export const Chartdata = z.object({
  round: z.string(),
  voteEnd: z.number(),
  totalVotes: z.number(),
  bribedVotes: z.number(),
  totalBribes: z.number(),
  totalVoter: z.number(),
  totalBriber: z.number(),
  priceBeets: z.number(),
  priceFBeets: z.number(),
});

export type Chartdata = z.infer<typeof Chartdata>;

// export const ChartdataDb = Chartdata.extend({
//   created: z.date(),
//   updated: z.date(),
// });

// export type ChartdataDb = z.infer<typeof ChartdataDb>;
