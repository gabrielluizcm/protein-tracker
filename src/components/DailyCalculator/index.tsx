import { useState } from "react";
import { useTranslation } from "react-i18next";

type DailyCalculatorProps = {
  updateDailyGoalCb: (goal: number) => void;
}

export default function DailyCalculator({ updateDailyGoalCb }: DailyCalculatorProps) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(0);
  const [activityMultiplier, setActivityMultiplier] = useState(1.2);

  const updateDailyGoal = (weight: number, activityMult: number) => {
    const goal = parseFloat((weight * activityMult).toFixed(1));
    updateDailyGoalCb(goal);
  }

  const handleWeightChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = evt.target.value;
    const value = rawValue !== '' ? parseFloat(rawValue) : 0;
    setWeight(value);
    updateDailyGoal(value, activityMultiplier);
  }

  const handleActivityChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(evt.target.value);
    setActivityMultiplier(value);
    updateDailyGoal(weight, value);
  }

  return (
    <div className="flex flex-col p3 rounded-md w-40 h-40 bg-copper text-silver items-center justify-center">
      <label>
        {t('weight')}:
        <input type="text" onChange={handleWeightChange} className="rounded-md text-start bg-black" value={weight} />
      </label>
      <label>
        {t('activityLevel')}
        <select onChange={handleActivityChange} className="rounded-md text-start bg-black">
          <option value={1.2}>Sedentary</option>
          <option value={1.4}>Light</option>
          <option value={1.6}>Intense</option>
        </select>
      </label>
    </div>
  )
}