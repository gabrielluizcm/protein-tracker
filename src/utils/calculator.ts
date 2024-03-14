export type ActivityLevel = 'none' | 'light' | 'intense';

export type CalcDailyProteinsProps = {
  weight: number;
  activityLevel: ActivityLevel;
}

const calcDailyProteins = ({ weight, activityLevel }: CalcDailyProteinsProps) => {
  const multipliers = {
    'none': 1.2,
    'light': 1.4,
    'intense': 1.6
  };

  return weight * multipliers[activityLevel];
}

export default calcDailyProteins;