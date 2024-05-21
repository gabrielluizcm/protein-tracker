import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useGoal } from "../../hooks/contexts";

import { getStorage, setStorage } from "../../utils/storage";

type DailyCalculatorProps = {
  closeModal: () => void
}

export default function DailyCalculator({ closeModal }: DailyCalculatorProps) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState(0);
  const [activityMultiplier, setActivityMultiplier] = useState(1.2);
  const { setState: setDailyGoal } = useGoal();

  const updateDailyGoal = (weight: number, activityMult: number) => {
    const goal = parseFloat((weight * activityMult).toFixed(1));
    setDailyGoal(goal);
  }

  useEffect(() => {
    const savedWeight = getStorage('weight');
    const savedActivity = getStorage('activityLevel');
    if (savedWeight && savedActivity) {
      setWeight(savedWeight);
      setActivityMultiplier(savedActivity);
      updateDailyGoal(savedWeight, savedActivity);
    }
  }, []); //eslint-disable-line

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

  const handleSaveClick = () => {
    setStorage('weight', weight);
    setStorage('activityLevel', activityMultiplier);
    updateDailyGoal(weight, activityMultiplier);
    closeModal();
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
          <select onChange={handleActivityChange} className="rounded-md text-center bg-black text-silver" value={activityMultiplier}>
            <option value={1.8}>Sedentary</option>
            <option value={2.0}>Light</option>
            <option value={2.2}>Intense</option>
          </select>
        </label>
      </div>

      <button className="rounded-md p-3 text-center bg-silver text-black
        hover:bg-crimson hover:font-semibold hover:shadow-md hover:shadow-black transition-all w-full"
        onClick={handleSaveClick}>
        {t('save')}
      </button>
    </div>
  )
}