// Get the cheapest price from an array of price objects, ignoring 0 values
export const getCheapestPrice = (prices) => {
  console.log("Price:");
  console.log(prices);
  // Filter out prices that are 0 or null
  const validPrices = prices.filter((store) => store.price > 0);
  console.log(validPrices);

  // Get the minimum price from the valid prices
  const cheapestPrice = Math.min(...validPrices.map((store) => store.price));
  console.log(cheapestPrice);

  // Find the stores that have the cheapest price
  const cheapestStores = validPrices.filter((store) => parseInt(store.price) === cheapestPrice);
  console.log(cheapestStores);
  return {
    cheapestPrice,
    cheapestStores,
  };
};
