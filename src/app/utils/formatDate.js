export const formatDate = (date) => {
  if (!date) return "Unknown Date";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
