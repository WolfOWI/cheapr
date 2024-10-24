// Get the cheapest price from an array of price objects, ignoring 0 values
export const getCheapestPrice = (prices) => {
  // console.log("getCheapestPrice received:", prices);

  // Filter out prices that are 0 or null
  const validPrices = prices.filter((store) => store.price > 0);

  // Get the minimum price from the valid prices
  const cheapestPrice = Math.min(...validPrices.map((store) => store.price));

  // Find the stores that have the cheapest price
  const cheapestStores = validPrices.filter((store) => parseFloat(store.price) === cheapestPrice);

  // Find the stores that do not have the cheapest price and sort them
  const otherStores = validPrices
    .filter((store) => parseFloat(store.price) !== cheapestPrice)
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  return {
    cheapestPrice,
    cheapestStores,
    otherStores,
  };
};
