interface IReward {
  type: string;
  token: string;
  amount: number;
  isfixed: boolean;
}

interface IBribedata {
  voteindex: number;
  poolname: string;
  poolurl: string;
  rewarddescription: string;
  assumption: string;
  percentagethreshold?: number;
  rewardcap?: number;
  additionalrewards?: [string]; // TODO: Structure
  reward: [string]; // TODO: Structure
  payoutthreshold?: number;
}

// const bribedataSchema = new Schema<IBribedata>({
//   voteindex: { type: Number, required: true },
// });

// const Bribedata = model<IBribedata>("Bribedata", bribedataSchema);
