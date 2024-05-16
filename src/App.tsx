import { useState, useEffect, useCallback, useReducer } from "react"
import { FaCalculator } from 'react-icons/fa';

import MyHeader from "./components/MyHeader";
import RadialProgress from "./components/RadialProgress"
import ButtonsPanel from "./components/ButtonsPanel";
import LastWeek from "./components/LastWeek";
import MyFooter from "./components/MyFooter";
import DailyCalculator from "./components/DailyCalculator";
import Modal from "./components/Modal";

import { useAcc, useNewAcc, useGoal } from "./hooks/contexts";

import { modalReducer } from "./reducers/modalReducer";

import { getISODate, hasDayPassed, upkeepNewDay } from './utils/dates';

function App() {
  const [counterSpeed, setCounterSpeed] = useState(30);
  const { state: proteinCounter, setState: setProteinCounter } = useAcc();
  const { state: newCounter, setState: setNewCounter } = useNewAcc();
  const { state: dailyGoal, setState: setDailyGoal } = useGoal();
  const [calculatorModal, dispatchModal] = useReducer(modalReducer, { open: false });

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
      localStorage.setItem('currentDate', JSON.stringify(getISODate(new Date())))

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
        setProteinCounter(proteinCounter + 1);
      else if (newCounter < proteinCounter)
        setProteinCounter(proteinCounter - 1);
    }, counterSpeed);

    return () => clearInterval(interval);
  }, [newCounter, proteinCounter, setProteinCounter, counterSpeed]);

  return (
    <>
      <main className="w-screen h-screen flex flex-col items-center justify-start pt-10 gap-10 bg-black z-0">
        <MyHeader />
        <FaCalculator className="text-silver absolute text-2xl right-10 top-10
          cursor-pointer hover:text-gold transition-all"
          onClick={() => dispatchModal({ type: 'open' })} />
        <RadialProgress currentValue={proteinCounter} maxValue={dailyGoal} />
        <ButtonsPanel changeCounter={changeCounter} />
        <Modal open={calculatorModal.open}>
          <DailyCalculator
            updateDailyGoalCb={useCallback((goal) => setDailyGoal(goal), [])}
            onSave={() => dispatchModal({ type: 'close' })} />
        </Modal>
        <LastWeek />
      </main>
      <MyFooter />
    </>
  )
}

export default App
