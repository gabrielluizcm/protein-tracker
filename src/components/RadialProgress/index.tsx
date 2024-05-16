import { useState, useEffect } from "react";

import { useAcc, useNewAcc, useGoal } from "../../hooks/contexts";

import { getISODate, hasDayPassed, upkeepNewDay } from '../../utils/dates';
import { getStorage, setStorage } from "../../utils/storage";

import arrTWPercentageStart from "./twPercentages";

const counterSpeed = 5;

export default function RadialProgress() {
  const [displayPercentage, setDisplayPercentage] = useState(false);

  const { state: currentValue, setState: setCurrentValue } = useAcc();
  const { state: newValue, setState: setNewValue } = useNewAcc();
  const { state: maxValue } = useGoal();

  const percentage = currentValue > maxValue ? 100 : Math.floor(currentValue / maxValue * 100);

  // Starting setup
  useEffect(() => {
    if (!getStorage('currentDate'))
      setStorage('currentDate', getISODate(new Date()));

    if (hasDayPassed())
      upkeepNewDay();
    else {
      const savedValue = getStorage('currentValue');
      if (savedValue)
        setNewValue(parseInt(savedValue));
    }
  }, []); //eslint-disable-line

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
