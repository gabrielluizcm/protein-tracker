import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";

import { getStorage } from "../../utils/storage";

type WeekRecordProps = {
  date: string;
  value: string;
}

function WeekRecord({ value, date }: WeekRecordProps) {
  const { t } = useTranslation();
  const dateObj = new Date(date);
  const weekday = dateObj.getDay();

  return (
    <li className="w-full flex items-center justify-between border-silver border-b last:border-0 pt-1 pb-2 px-2">
      <span>
        <p>{dateObj.toLocaleDateString()} </p>
        <p>{t(`weekDays.${weekday}`)}</p>
      </span>
      <span>{value}g</span>
    </li>
  )
}

export type LastWeekRecordType = {
  date: string;
  value: string;
}

export default function LastWeek() {
  const { t } = useTranslation();
  const [lastWeek, setLastWeek] = useState<LastWeekRecordType[]>([]);

  useEffect(() => {
    const last7 = getStorage('lastWeek');

    if (last7)
      setLastWeek(last7);
  }, []);

  return (
    <section className="flex flex-col w-1/2 h-1/3 items-center justify-center gap-3">
      <h2 className="text-xl font-semibold text-gold">{t('lastSeven')}</h2>
      {lastWeek.length
        ? <ul className="w-full h-full text-silver overflow-y-scroll">
          {lastWeek.map(entry =>
            <WeekRecord date={entry.date} value={entry.value} key={entry.date} />
          )}
        </ul>
        : <p className="text-silver">{t('emptyWeek')}</p>
      }
    </section>
  )
}