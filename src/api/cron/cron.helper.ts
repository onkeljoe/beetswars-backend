import { readOne } from "../../utils/database";
import { Bribefile } from "../bribedata/bribedata.model";
import { Chartdata } from "../chartdata/chartdata.model";
import { getSnapshotProposal, getSnapshotVotes } from "../../utils/snapshot";
import { map } from "zod";
import { getBeetsPrice } from "../../utils/coingecko";

export async function getData(round: string) {
  const newData = {} as Chartdata;
  const bribefile = await readOne<Bribefile>("bribedata", round);
  if (!bribefile) return newData; //empty
  // console.log(bribefile.)
  const proposal = bribefile.snapshot;
  const bribedOffers = bribefile.bribedata.map((x) =>
    (x.voteindex + 1).toString()
  );
  const roundProposal = await getSnapshotProposal(proposal);
  const end = roundProposal.end;
  const votes = await getSnapshotVotes(proposal);
  const totalVoter = votes.length;
  const totalVotes =
    totalVoter === 0
      ? 0
      : +votes
          .map((x) => x.vp)
          .reduce((sum, x) => sum + x)
          .toFixed();

  // calculate bribed votes
  var bribedVotes = 0;
  votes.forEach(
    (element: { choice: { [key: string]: number }; vp: number }) => {
      const total = Object.values(element.choice).reduce((a, b) => a + b);
      bribedOffers.map((x) => {
        if (element.choice[x]) {
          bribedVotes += (element.vp * element.choice[x]) / total;
        }
      });
    }
  );

  const priceBeets = await getBeetsPrice(end);

  // fill data
  newData.round = round;
  newData.totalVoter = totalVoter;
  newData.totalVotes = totalVotes;
  newData.totalBriber = bribefile.bribedata.length;
  newData.totalBribes = 0; //TODO
  newData.bribedVotes = +bribedVotes.toFixed();
  newData.voteEnd = end;
  newData.priceBeets = priceBeets;
  newData.priceFbeets = 0; //TODO

  return newData;
}
