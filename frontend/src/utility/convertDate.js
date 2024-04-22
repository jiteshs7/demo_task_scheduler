export const convertToReqDate = (now = new Date()) => {
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const defaultDate = lastDayOfMonth.toISOString().substring(0, 10);
  return defaultDate;
};
