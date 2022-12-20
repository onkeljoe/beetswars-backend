export async function getBeetsPrice(at: number) {
  const at2 = at + 86400;
  const url =
    "https://api.coingecko.com/api/v3/coins/beethoven-x/market_chart/range?vs_currency=usd&from=" +
    at.toString() +
    "&to=" +
    at2.toString();
  let answer = 0;
  const result = await fetch(url);
  if (result.ok) {
    const data = await result.json();
    answer = data.prices[0][1];
  }
  return answer;
}
