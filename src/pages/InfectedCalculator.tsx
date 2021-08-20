import { useEffect, useState } from 'react';
import {
  INFECTED_STONE_XP_PROPHECY_MULTIPLIER,
  MAX_INFECTED_STONE_LEVEL,
  XP_PER_FRAGMENT,
} from '../constants/constants';
import { INFECTED_XP_PER_LEVEL } from '../data/infectedXpPerLevel';
import { formatNumber } from '../utils/utils';

type LevelType = {
  min: number;
  max: number;
};

type DataForLevelsType = {
  xp: number;
  fragments: number;
  fragmentsAndProphecyOrEvent: number;
};

type CalculatedDataType = {
  selectedLevels: DataForLevelsType;
  minPossibleToMinSelected: DataForLevelsType;
  maxSelectedToMaxPossible: DataForLevelsType;
};

const calculateTotalXp = ({ min, max }: LevelType): number => {
  return INFECTED_XP_PER_LEVEL.slice(min, max + 1).reduce((acc, curr) => acc + curr);
};

const getDataForLevels = (totalXp: number): DataForLevelsType => {
  return {
    xp: totalXp,
    fragments: totalXp / XP_PER_FRAGMENT,
    fragmentsAndProphecyOrEvent: totalXp / INFECTED_STONE_XP_PROPHECY_MULTIPLIER,
  };
};

const getCalculatedData = (level: LevelType): CalculatedDataType => {
  const calculatedData: CalculatedDataType = {
    selectedLevels: getDataForLevels(calculateTotalXp(level)),
    minPossibleToMinSelected: getDataForLevels(calculateTotalXp({ min: 0, max: level.max })),
    maxSelectedToMaxPossible: getDataForLevels(
      calculateTotalXp({
        min: level.max,
        max: MAX_INFECTED_STONE_LEVEL,
      })
    ),
  };

  return calculatedData;
};

const InfectedCalculator = () => {
  const [level, setLevel] = useState<LevelType>({
    min: 5,
    max: 20,
  });
  const [calculatedData, setCalculatedData] = useState<CalculatedDataType>(
    getCalculatedData(level)
  );

  const handleLevelIncrease = () => {
    setLevel({ ...level, max: level.max + 1 });
  };

  useEffect(() => {
    setCalculatedData(getCalculatedData(level));
  }, [level]);

  return (
    <div>
      <h1 className="text-indigo-500">Infected Stone Exprience</h1>
      <h2>
        max level:
        {level.max}
      </h2>
      <button onClick={handleLevelIncrease} type="button">
        increase max level
      </button>
      {Object.values(calculatedData).map((levelData) => (
        <div>
          {Object.values(levelData).map((value) => (
            <h4>{formatNumber(value)}</h4>
          ))}
        </div>
      ))}
      <pre>{JSON.stringify(calculatedData, null, 2)}</pre>
    </div>
  );
};

export default InfectedCalculator;
