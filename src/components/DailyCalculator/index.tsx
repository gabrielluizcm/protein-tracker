import { useState } from "react";
import { useTranslation } from "react-i18next";

import calcDailyProteins from "../../utils/calculator";
import type { ActivityLevel, CalcDailyProteinsProps } from "../../utils/calculator";

type DailyCalculatorProps = {
  updateDailyGoal: () => void;
}

export default function DailyCalculator({ updateDailyGoal }: DailyCalculatorProps) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState<ActivityLevel>('none');

  return (
    <div className="flex flex-col p3 rounded-md w-40 h-40 bg-copper text-silver items-center justify-center">
      <label>
        {t('weight')}:
        <input type="text" onChange={evt => setWeight(parseFloat(evt.currentTarget.value))} className="rounded-md text-start" />
      </label>
      <label>
        {t('activityLevel')}
        <select onChange={evt => setActivity(evt.currentTarget.value)} className="rounded-md text-start">
          <option value="none">Sedentary</option>
          <option value="light">Light</option>
          <option value="intense">Intense</option>
        </select>
      </label>
    </div>
  )
}