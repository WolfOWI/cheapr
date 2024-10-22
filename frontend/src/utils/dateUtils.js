// DATE UTILITY FUNCTIONS

// Get the current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensures single digit months have a zero infront (02/02/2024)
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get current full timestamp (YYYY-MM-DD 14:30:45)
export const getCurrentTimeStamp = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Format Date from YYYY-MM-DD to MM/DD
export const formatFullDateToSlashShort = (date) => {
  const [year, month, day] = date.split("-");
  return `${month}/${day}`;
};
