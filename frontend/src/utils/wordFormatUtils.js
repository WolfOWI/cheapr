// Converts a snake_case string into a capitalised string (fruits_and_vegetables => Fruits & Vegetables).
export const formatName = (str) => {
  return str
    .split("_")
    .map((word) => {
      // Convert "and" to "&"
      if (word.toLowerCase() === "and") {
        return "&";
      }
      // Capitalize the first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export default formatName;
