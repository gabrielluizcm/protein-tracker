import { useAcc, useNewAcc } from "../../hooks/contexts";

import { setStorage } from "../../utils/storage";

type CounterButtonProps = {
  value: number;
}

export default function CounterButtons({ value }: CounterButtonProps) {
  const add = value > 0;

  const { state: currentCounter } = useAcc();
  const { setState: setNewCounter } = useNewAcc();

  const handleBtnClick = (value: number) => {
    let newValue = currentCounter + value;
    if (newValue < 0)
      newValue = 0;
    setNewCounter(newValue);
    setStorage('currentValue', newValue.toString());
  }

  return (
    <button type="button" onClick={() => handleBtnClick(value)}
      className={`rounded-md p-5 w-8 h-8 ${add ? 'bg-gold' : 'bg-crimson'} text-black hover:text-silver 
        active:bg-copper flex items-center justify-center font-semibold text-xl`}>
      {add ? '+' : ''}{value}
    </button>
  );
}