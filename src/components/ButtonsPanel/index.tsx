import CounterButtons from "../CounterButtons";

export default function ButtonsPanel() {
  return (
    <section className="flex w-full md:w-1/2 items-center justify-center">
      <div className="w-4/5 flex justify-center gap-2 md:gap-5">
        <CounterButtons value={-1} />
        <CounterButtons value={-5} />
        <CounterButtons value={-10} />
      </div>
      <div className="w-[0px] h-full rounded-md border border-silver"></div>
      <div className="w-4/5 flex justify-center gap-2 md:gap-5">
        <CounterButtons value={1} />
        <CounterButtons value={5} />
        <CounterButtons value={10} />
      </div>
    </section>
  );
}