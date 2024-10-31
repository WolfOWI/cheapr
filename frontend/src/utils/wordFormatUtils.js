// Converts a snake_case string into a capitalised string (fruits_and_vegetables => Fruits & Vegetables).
export const formatName = (str) => {
  return str
    .split("_")
    .map((word) => {
      // Convert "and" to "&"
      if (word.toLowerCase() === "and") {
        return "&";
      }
      // Capitalise the first letter of each word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

// Makes bad text input, pretty.
export const prettifyTextInput = (input) => {
  return input
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove non-alphanumeric characters except spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalise each word
    .join(" "); // Join words with a single space
};
