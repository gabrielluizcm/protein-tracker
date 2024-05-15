import CounterButtons from "../CounterButtons";

type ButtonsPanelProps = {
  changeCounter: (value: number) => void;
}

export default function ButtonsPanel({ changeCounter }: ButtonsPanelProps) {
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