type RadialProgressProps = {
  type?: 'progress' | 'percentage';
  currentValue: number;
  maxValue: number;
}

export default function RadialProgress({ type = 'percentage', currentValue, maxValue }: RadialProgressProps) {
  const percentage = Math.floor(currentValue / maxValue * 100);

  return (
    <div className={`relative w-48 h-48 rounded-full text-gold 
      bg-[conic-gradient(var(--tw-gradient-stops))] from-gold from-[${percentage}%] to-silver to-0%
      flex items-center justify-center
      before:absolute before:w-32 before:h-32 before:rounded-full before:bg-black`}>
      <h3 className={`relative pointer-events-none ${type === 'progress' ? 'text-xl' : 'text-2xl'} font-bold`}>
        {type === 'progress'
          ? `${currentValue}g/${maxValue}g`
          : `${percentage}%`
        }
      </h3>
    </div>
  )
}