// productSortUtils.js
import { getCheapestPrice } from "./priceUtils";

export const sortProducts = (products, sortBy) => {
  const sortedProducts = Object.entries(products).sort(([keyA, productA], [keyB, productB]) => {
    switch (sortBy) {
      case "AtoZ":
        return productA.name.localeCompare(productB.name);
      case "ZtoA":
        return productB.name.localeCompare(productA.name);
      case "NewestApproved":
        return new Date(productB.adminDecisionDate) - new Date(productA.adminDecisionDate);
      case "OldestApproved":
        return new Date(productA.adminDecisionDate) - new Date(productB.adminDecisionDate);
      case "NewestCreated":
        return new Date(productB.created) - new Date(productA.created);
      case "OldestCreated":
        return new Date(productA.created) - new Date(productB.created);
      case "Cheapest":
        // Get cheapest price for each product and sort ascending
        const priceA = getCheapestPrice([
          { store: "pnp", price: productA.pnp.price },
          { store: "woolworths", price: productA.woolworths.price },
          { store: "checkers", price: productA.checkers.price },
          { store: "spar", price: productA.spar.price },
        ]).cheapestPrice;

        const priceB = getCheapestPrice([
          { store: "pnp", price: productB.pnp.price },
          { store: "woolworths", price: productB.woolworths.price },
          { store: "checkers", price: productB.checkers.price },
          { store: "spar", price: productB.spar.price },
        ]).cheapestPrice;

        return priceA - priceB;
      case "Expensive":
        // Get the most expensive price for each product and sort descending
        const maxPriceA = Math.max(
          productA.pnp.price,
          productA.woolworths.price,
          productA.checkers.price,
          productA.spar.price
        );
        const maxPriceB = Math.max(
          productB.pnp.price,
          productB.woolworths.price,
          productB.checkers.price,
          productB.spar.price
        );

        return maxPriceB - maxPriceA;
      default:
        return 0;
    }
  });

  // Convert the sorted array back into an object
  return Object.fromEntries(sortedProducts);
};
