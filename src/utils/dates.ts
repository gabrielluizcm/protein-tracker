import { getStorage, setStorage } from "./storage";

import type { LastWeekRecordType } from "../components/LastWeek";

export const getISODate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const hasDayPassed = () => {
  const lastDateRecord = getStorage('currentDate');
  if (!lastDateRecord)
    return;

  const lastDate = new Date(lastDateRecord);
  const today = new Date();

  return getISODate(today) > getISODate(lastDate);
}

export const upkeepNewDay = () => {
  const lastValue = getStorage('currentValue') ?? '0';

  const dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 1);
  const lastDate = getStorage('currentDate') ?? getISODate(dayBefore);

  const lastWeek: LastWeekRecordType[] = getStorage('lastWeek');

  if (lastWeek.length >= 7)
    lastWeek.pop();

  lastWeek.unshift({
    value: lastValue,
    date: lastDate
  })

  setStorage('lastWeek', lastWeek);
  setStorage('currentDate', getISODate(new Date()));
  setStorage('currentValue', '0');
}