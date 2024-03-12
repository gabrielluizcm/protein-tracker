type CounterButtonProps = {
  value: number;
  onClick: (value: number) => void;
}

export default function CounterButtons({ value, onClick }: CounterButtonProps) {
  const add = value > 0;

  return (
    <button type="button" onClick={() => onClick(value)}
      className={`rounded-md p-3 w-8 h-8 ${add ? 'bg-gold' : 'bg-crimson'} text-black hover:text-silver 
        active:bg-copper flex items-center justify-center`}>
      {add ? '+' : ''}{value}
    </button>
  );
}