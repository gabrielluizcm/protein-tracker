import { useState, useEffect } from "react"

import RadialProgress from "./components/RadialProgress"
import ButtonsPanel from "./components/ButtonsPanel";
import LastWeek from "./components/LastWeek";

import type { LastWeekRecordType } from "./components/LastWeek";

function App() {
  const [counterSpeed, setCounterSpeed] = useState(30);
  const [proteinCounter, setProteinCounter] = useState(0);
  const [newCounter, setNewCounter] = useState(0);

  const getISODate = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  const hasDayPassed = () => {
    const lastDateRecord = localStorage.getItem('currentDate');
    if (!lastDateRecord)
      return;

    const lastDate = new Date(lastDateRecord);
    const today = new Date();

    return today.toLocaleDateString() > lastDate.toLocaleDateString();
  }

  const upkeepNewDay = () => {
    const lastValue = localStorage.getItem('currentValue') ?? '0';

    const dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 1);
    const lastDate = localStorage.getItem('currentDate') ?? getISODate(dayBefore);

    const lastWeek: LastWeekRecordType[] = JSON.parse(localStorage.getItem('lastWeek') ?? '');
    if (lastWeek && getISODate(new Date(lastWeek[0].date)) === getISODate(new Date()))
      return;

    if (lastWeek.length >= 7)
      lastWeek.pop();

    lastWeek.unshift({
      value: lastValue,
      date: lastDate
    })

    localStorage.setItem('lastWeek', JSON.stringify(lastWeek));
    localStorage.setItem('currentDate', getISODate(new Date()));
    localStorage.setItem('currentValue', '0');
  }

  const changeCounter = (value: number) => {
    let newValue = proteinCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
    localStorage.setItem('currentValue', newValue.toString());
  }

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
    <main className="w-screen h-screen flex flex-col items-center justify-start pt-10 gap-10 bg-black">
      <h1 className="text-gold text-3xl flex flex-col">
        <p>Protein</p>
        <p className="pl-12">Tracker</p>
      </h1>
      <RadialProgress currentValue={proteinCounter} maxValue={86} />
      <ButtonsPanel changeCounter={changeCounter} />
      <LastWeek />
    </main>
  )
}

export default App
