export const dateYearMonthFormatter = (obj) => {
  const date = obj.month.split('T')[0];
  const month = date.slice(0, -3);
  return { ...obj, month: month };
};

export const mapDayOfWeek = (obj) => {
  const week = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  return { ...obj, day_of_week: week[obj.day_of_week] };
};
