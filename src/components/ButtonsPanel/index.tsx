import { useAcc, useNewAcc } from "../../hooks/contexts";

import { setStorage } from "../../utils/storage";

import CounterButtons from "../CounterButtons";

export default function ButtonsPanel() {
  const { state: currentCounter } = useAcc();
  const { setState: setNewCounter } = useNewAcc();

  const changeCounter = (value: number) => {
    let newValue = currentCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
    setStorage('currentValue', newValue.toString());
  }

  return (
    <section className="flex w-full md:w-1/2 items-center justify-center">
      <div className="w-4/5 flex justify-center gap-2 md:gap-5">
        <CounterButtons value={-1} onClick={(value) => changeCounter(value)} />
        <CounterButtons value={-5} onClick={(value) => changeCounter(value)} />
        <CounterButtons value={-10} onClick={(value) => changeCounter(value)} />
      </div>
      <div className="w-[0px] h-full rounded-md border border-silver"></div>
      <div className="w-4/5 flex justify-center gap-2 md:gap-5">
        <CounterButtons value={1} onClick={(value) => changeCounter(value)} />
        <CounterButtons value={5} onClick={(value) => changeCounter(value)} />
        <CounterButtons value={10} onClick={(value) => changeCounter(value)} />
      </div>
    </section>
  );
}