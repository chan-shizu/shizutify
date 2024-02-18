export const formatCreatedAt = (createdAt: string) => {
  const monthAndDate = createdAt.split("_")[1];
  const result = monthAndDate.slice(0, 2) + "/" + monthAndDate.slice(2, 4);
  return result;
};
