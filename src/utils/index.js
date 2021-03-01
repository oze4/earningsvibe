export const oneYearAgo = () => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
};

export const now = () => {
  return new Date(Date.now());
};
