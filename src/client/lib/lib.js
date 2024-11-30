export const dateYearMonthFormatter = (obj) => {
  const date = obj.month.split('T')[0];
  const month = date.slice(0, -3);
  return month;
};

export const mapDayOfWeek = (obj) => {
  const week = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  return week[obj.day_of_week];
};

export const strToNum = (obj) => {
  for (const key in obj) {
    Number.parseInt(obj[key]) ? (obj[key] = Number(obj[key])) : null;
  }
  return obj;
};
