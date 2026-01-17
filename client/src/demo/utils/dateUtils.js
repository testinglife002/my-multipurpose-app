import { addDays, differenceInDays, format, isSameDay, isToday } from 'date-fns';
export { isToday, isSameDay };
export const getPixelsPerDay = zoom => {
  switch (zoom) {
    case 'day':
      return 120;
    case 'week':
      return 40;
    case 'month':
      return 15;
    default:
      return 60;
  }
};
export const getDateFromX = (x, start, pixelsPerDay) => {
  const daysToAdd = Math.floor(x / pixelsPerDay);
  return addDays(start, daysToAdd);
};
export const getXFromDate = (date, start, pixelsPerDay) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = differenceInDays(d, start);
  return diff * pixelsPerDay;
};
export const getDurationInDays = (start, end) => {
  return differenceInDays(new Date(end), new Date(start)) + 1;
};
export const generateDateAxis = (start, days, zoom) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(addDays(start, i));
  }
  return dates;
};
export const formatDateAxis = (date, zoom) => {
  if (zoom === 'day') return format(date, 'EEE, MMM d');
  if (zoom === 'week') return format(date, 'd');
  if (zoom === 'month') return format(date, 'd');
  return format(date, 'MMM d');
};
export const isWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6;
};