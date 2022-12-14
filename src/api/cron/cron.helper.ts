import { readOne } from "../../utils/database";
import { Bribefile } from "../bribedata/bribedata.model";
import { Chartdata } from "../chartdata/chartdata.model";
import { request, gql } from "graphql-request";

async function getSnapshotProposal(id: string) {
  const QUERY = gql`
    query Proposal {
      proposal(id:"${id}") {
        start
        end
      }
    }
  `;
  const data = await request("https://hub.snapshot.org/graphql", QUERY);
  return data.proposal as { start: number; end: number };
}

async function getSnapshotVotes(id: string) {
  const QUERY = gql`
    query Votes {
      votes(
        first: 1000
        where: {
          proposal: "${id}"
        }
      ) {
        choice
        vp
      }
    }
  `;
  const data = await request("https://hub.snapshot.org/graphql", QUERY);
  return data.votes as { choice: { key: number }; vp: number }[];
  // return data.proposal as { start: number; end: number };
}

export async function getData(round: string) {
  const newData = {} as Chartdata;
  const bribefile = await readOne<Bribefile>("bribedata", round);
  if (!bribefile) return newData; //empty
  const proposal = bribefile.snapshot;
  const end = await (await getSnapshotProposal(proposal)).end;
  const votes = await getSnapshotVotes(proposal);
  const totalvotes = votes
    .map((x) => x.vp)
    .reduce((sum, x) => sum + x)
    .toFixed();

  newData.round = round;
  newData.totalVoter = votes.length;
  newData.totalVotes = +totalvotes;
  newData.totalBriber = bribefile.bribedata.length;
  newData.totalBribes = 0; //TODO
  newData.bribedVotes = 0; //TODO
  newData.voteEnd = end;
  newData.priceBeets = 0; //TODO
  newData.priceFbeets = 0;

  //   console.log("total: ", newData.totalBriber);

  return newData;
}