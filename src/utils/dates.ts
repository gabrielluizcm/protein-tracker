import type { LastWeekRecordType } from "../components/LastWeek";

export const getISODate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const hasDayPassed = () => {
  const lastDateRecord = JSON.parse(localStorage.getItem('currentDate') ?? '');
  if (!lastDateRecord)
    return;

  const lastDate = new Date(lastDateRecord);
  const today = new Date();

  return getISODate(today) > getISODate(lastDate);
}

export const upkeepNewDay = () => {
  const lastValue = localStorage.getItem('currentValue') ?? '0';

  const dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 1);
  const lastDate = localStorage.getItem('currentDate') ?? getISODate(dayBefore);

  const lastWeek: LastWeekRecordType[] = JSON.parse(localStorage.getItem('lastWeek') ?? '[]');

  if (lastWeek.length >= 7)
    lastWeek.pop();

  lastWeek.unshift({
    value: lastValue,
    date: lastDate
  })

  localStorage.setItem('lastWeek', JSON.stringify(lastWeek));
  localStorage.setItem('currentDate', JSON.stringify(getISODate(new Date())));
  localStorage.setItem('currentValue', '0');
}