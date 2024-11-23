export const dateYearMonthFormatter = (obj) => {
  const date = obj.month.split('T')[0];
  const month = date.slice(0, -3);
  return { ...obj, month: month };
};
