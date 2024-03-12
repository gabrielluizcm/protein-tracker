import { useState, useEffect } from "react"
// import { useTranslation } from "react-i18next";

import RadialProgress from "./components/RadialProgress"
import ButtonsPanel from "./components/ButtonsPanel";

function App() {
  // const { t } = useTranslation();
  const [counterSpeed, setCounterSpeed] = useState(30);
  const [proteinCounter, setProteinCounter] = useState(0);
  const [newCounter, setNewCounter] = useState(0);

  const changeCounter = (value: number) => {
    let newValue = proteinCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
    localStorage.setItem('currentValue', newValue.toString());
  }

  useEffect(() => {
    const savedValue = localStorage.getItem('currentValue');
    if (savedValue)
      setNewCounter(parseInt(savedValue));

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
    </main>
  )
}

export default App
