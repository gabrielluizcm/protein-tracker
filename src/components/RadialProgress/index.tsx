import arrTWPercentageStart from "./twPercentages";

type RadialProgressProps = {
  type?: 'progress' | 'percentage';
  currentValue: number;
  maxValue: number;
}

export default function RadialProgress({ type = 'progress', currentValue, maxValue }: RadialProgressProps) {
  const percentage = currentValue > maxValue ? 100 : Math.floor(currentValue / maxValue * 100);

  return (
    <div className={`relative w-48 h-48 rounded-full text-gold 
      bg-[conic-gradient(var(--tw-gradient-stops))] from-gold ${arrTWPercentageStart[percentage]} to-silver to-0%
      flex items-center justify-center
      before:absolute before:w-36 before:h-36 before:rounded-full before:bg-black`}>
      <h3 className={`relative pointer-events-none ${type === 'progress' ? 'text-xl' : 'text-2xl'} font-bold`}>
        {type === 'progress'
          ? `${currentValue}g/${maxValue}g`
          : `${percentage}%`
        }
      </h3>
    </div>
  )
}
