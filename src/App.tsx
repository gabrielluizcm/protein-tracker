import { useState, useEffect } from "react"
// import { useTranslation } from "react-i18next";

import RadialProgress from "./components/RadialProgress"
import CounterButtons from "./components/CounterButtons"

function App() {
  // const { t } = useTranslation();
  const [proteinCounter, setProteinCounter] = useState(0);
  const [newCounter, setNewCounter] = useState(0);

  const changeCounter = (value: number) => {
    let newValue = proteinCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (newCounter > proteinCounter)
        setProteinCounter(() => proteinCounter + 1);
      else if (newCounter < proteinCounter)
        setProteinCounter(() => proteinCounter - 1);
    }, 1);

    return () => clearInterval(interval);
  }, [newCounter, proteinCounter]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-gold text-3xl flex flex-col">
        <p>Protein</p>
        <p className="pl-12">Tracker</p>
      </h1>
      <RadialProgress currentValue={proteinCounter} maxValue={86} />
      <section>
        <CounterButtons value={5} onClick={(value) => changeCounter(value)} />
        <CounterButtons value={-5} onClick={(value) => changeCounter(value)} />
      </section>
    </div>
  )
}

export default App
