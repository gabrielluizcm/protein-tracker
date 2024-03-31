import { useState, useEffect, useCallback } from "react"

import RadialProgress from "./components/RadialProgress"
import ButtonsPanel from "./components/ButtonsPanel";
import LastWeek from "./components/LastWeek";
import MyFooter from "./components/MyFooter";
import DailyCalculator from "./components/DailyCalculator";

import { getISODate, hasDayPassed, upkeepNewDay } from './utils/dates';

function App() {
  const [counterSpeed, setCounterSpeed] = useState(30);
  const [proteinCounter, setProteinCounter] = useState(0);
  const [newCounter, setNewCounter] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(86);

  const changeCounter = (value: number) => {
    let newValue = proteinCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
    localStorage.setItem('currentValue', newValue.toString());
  }

  // Starting setup
  useEffect(() => {
    if (!localStorage.getItem('currentDate'))
      localStorage.setItem('currentDate', getISODate(new Date()))

    if (hasDayPassed())
      upkeepNewDay();
    else {
      const savedValue = localStorage.getItem('currentValue');
      if (savedValue)
        setNewCounter(parseInt(savedValue));
    }

    const timeout = setTimeout(() => setCounterSpeed(5), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Animation to every counter change
  useEffect(() => {
    const interval = setInterval(() => {
      if (newCounter > proteinCounter)
        setProteinCounter(() => proteinCounter + 1);
      else if (newCounter < proteinCounter)
        setProteinCounter(() => proteinCounter - 1);
    }, counterSpeed);

    return () => clearInterval(interval);
  }, [newCounter, proteinCounter, counterSpeed]);

  return (
    <>
      <main className="w-screen h-screen flex flex-col items-center justify-start pt-10 gap-10 bg-black">
        <h1 className="text-gold text-3xl flex flex-col">
          <p>Protein</p>
          <p className="pl-12">Tracker</p>
        </h1>
        <RadialProgress currentValue={proteinCounter} maxValue={dailyGoal} />
        <ButtonsPanel changeCounter={changeCounter} />
        <DailyCalculator updateDailyGoalCb={useCallback((goal) => setDailyGoal(goal), [])} />
        <LastWeek />
      </main>
      <MyFooter />
    </>
  )
}

export default App
