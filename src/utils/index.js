export const oneYearAgo = () => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
};

export const now = () => {
  return new Date(Date.now());
};

export const getDaysAgo = (numberOfDaysAgo = 1, fromDate = new Date(Date.now())) => {
  return new Date(new Date().setDate(fromDate.getDate() - numberOfDaysAgo));
}
