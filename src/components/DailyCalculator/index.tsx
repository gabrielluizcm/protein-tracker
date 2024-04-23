import { useState } from "react";
import { useTranslation } from "react-i18next";

type DailyCalculatorProps = {
  updateDailyGoalCb: (goal: number) => void;
  closeModal: () => void;
}

export default function DailyCalculator({ updateDailyGoalCb, closeModal }: DailyCalculatorProps) {
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
    <div className="flex flex-col p-3 rounded-md w-60 h-60 bg-copper text-silver items-center justify-center">
      <div className="w-full m-5">
        <label className="flex flex-col text-black">
          {t('weight')}
          <input type="text" inputMode="numeric" onChange={handleWeightChange}
            className="rounded-md text-center bg-black text-silver" value={weight} />
        </label>
        <label className="flex flex-col text-black">
          {t('activityLevel')}
          <select onChange={handleActivityChange} className="rounded-md text-center bg-black text-silver">
            <option value={1.2}>Sedentary</option>
            <option value={1.4}>Light</option>
            <option value={1.6}>Intense</option>
          </select>
        </label>
      </div>

      <button className="rounded-md p-3 text-center bg-silver text-black
        hover:bg-crimson hover:font-semibold hover:shadow-md hover:shadow-black transition-all w-full"
        onClick={() => closeModal()}>
        {t('save')}
      </button>
    </div>
  )
}