// Get the cheapest price from an array of price objects
export const getCheapestPrice = (prices) => {
  // Find the lowest price from the array of price objects
  const cheapestPrice = Math.min(...prices.map((store) => store.price));

  return {
    cheapestPrice,
    cheapestStores: prices.filter((store) => store.price === cheapestPrice),
  };
};
