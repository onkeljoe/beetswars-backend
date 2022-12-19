import { readOne } from "../../utils/database";
import { Bribefile } from "../bribedata/bribedata.model";
import { Chartdata } from "../chartdata/chartdata.model";
import { getSnapshotProposal, getSnapshotVotes } from "../../utils/snapshot";
import { getBeetsPrice } from "../../utils/coingecko";
import { getTokenPrice } from "../../utils/beetsBack";

export async function getData(round: string) {
  const newData = {} as Chartdata;
  newData.round = round;
  const bribefile = await readOne<Bribefile>("bribedata", round);
  if (!bribefile) return newData; //empty
  const proposal = bribefile.snapshot;
  const bribedOffers = bribefile.bribedata.map((x) =>
    (x.voteindex + 1).toString()
  );
  const { end } = await getSnapshotProposal(proposal);
  const votes = await getSnapshotVotes(proposal);
  const totalVoter = votes.length;

  // calculate bribed votes
  const poolVotes: { [key: string]: number } = {};
  votes.forEach(({ choice, vp }) => {
    const total = Object.values(choice).reduce((a, b) => a + b);
    for (const [key, value] of Object.entries(choice)) {
      poolVotes[key] = (poolVotes[key] || 0) + (vp * value) / total;
    }
  });
  // console.log("poolvotes:", poolVotes);
  const totalVotes = Math.round(
    Object.values(poolVotes).reduce((a, b) => a + b)
  );
  const bribedVotes = Math.round(
    bribedOffers.reduce((sum, x) => sum + poolVotes[x], 0)
  );

  const priceBeets = await getBeetsPrice(end);
  const priceFbeets = await getTokenPrice(
    end,
    "0xfcef8a994209d6916eb2c86cdd2afd60aa6f54b1"
  );

  // fill data
  newData.totalVoter = totalVoter;
  newData.totalVotes = totalVotes;
  newData.totalBriber = bribedOffers.length;
  newData.totalBribes = 0; //TODO
  newData.bribedVotes = bribedVotes;
  newData.voteEnd = end;
  newData.priceBeets = priceBeets;
  newData.priceFbeets = priceFbeets;

  return newData;
}
