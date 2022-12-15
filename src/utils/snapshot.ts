import { request, gql } from "graphql-request";
// yarn add graphql graphql-request

const queryUrl = "https://hub.snapshot.org/graphql";

export async function getSnapshotVotes(proposal: string): Promise<any[]> {
  // Initialize empty array, first and skip, loop
  let allResults: any[] = [];
  const first = 1000;
  let skip = 0;
  let hasMore = true;
  // loop until done
  while (hasMore) {
    const QUERY = gql`
      query Votes {
      votes(
        first: ${first}
        skip: ${skip}
        where: {
          proposal: "${proposal}"
        }
      ) {
        choice
        vp
      }
    }
    `;
    const result = await request(queryUrl, QUERY);
    allResults = [...allResults, ...result.votes];
    hasMore = result.votes.length === first;
    skip += first;
  }
  return allResults;
}

export async function getSnapshotProposal(proposal: string) {
  const QUERY = gql`
    query Proposal {
      proposal(id:"${proposal}") {
        start
        end
      }
    }
  `;
  const data = await request(queryUrl, QUERY);
  return data.proposal as { start: number; end: number };
}
