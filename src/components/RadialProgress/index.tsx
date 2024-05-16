import { useState, useEffect } from "react";

import { useAcc, useNewAcc, useGoal } from "../../hooks/contexts";

import { getISODate, hasDayPassed, upkeepNewDay } from '../../utils/dates';

import arrTWPercentageStart from "./twPercentages";

export const counterSpeed = 5;

export default function RadialProgress() {
  const [displayPercentage, setDisplayPercentage] = useState(false);

  const { state: currentValue, setState: setCurrentValue } = useAcc();
  const { state: newValue, setState: setNewValue } = useNewAcc();
  const { state: maxValue } = useGoal();

  const percentage = currentValue > maxValue ? 100 : Math.floor(currentValue / maxValue * 100);

  // Animation to every counter change
  useEffect(() => {
    const interval = setInterval(() => {
      if (newValue > currentValue)
        setCurrentValue(currentValue + 1);
      else if (newValue < currentValue)
        setCurrentValue(currentValue - 1);
    }, counterSpeed);

    return () => clearInterval(interval);
  }, [newValue, currentValue, setCurrentValue]);

  // Starting setup
  useEffect(() => {
    if (!localStorage.getItem('currentDate'))
      localStorage.setItem('currentDate', JSON.stringify(getISODate(new Date())))

    if (hasDayPassed())
      upkeepNewDay();
    else {
      const savedValue = localStorage.getItem('currentValue');
      if (savedValue)
        setNewValue(parseInt(savedValue));
    }
  }, [setNewValue]);

  return (
    <div
      className={`relative w-48 h-48 rounded-full text-gold 
        bg-[conic-gradient(var(--tw-gradient-stops))] from-gold
        ${arrTWPercentageStart[percentage]} to-silver to-0%
        flex items-center justify-center before:absolute before:w-36 before:h-36
        before:rounded-full before:bg-black`}
      onClick={() => setDisplayPercentage(!displayPercentage)}>
      <h3
        className={`relative pointer-events-none 
          ${displayPercentage ? 'text-2xl' : 'text-xl'} font-bold`}>
        {displayPercentage
          ? `${percentage}%`
          : `${currentValue}g/${maxValue}g`
        }
      </h3>
    </div>
  )
}
