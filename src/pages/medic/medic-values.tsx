import { useEffect, useState } from 'react';
import './medic-values.css'

interface MedicValuesProps {
  title: string;
  minCount: number;
  maxCount: number;
}

const MedicValues = ({ title, minCount, maxCount}: MedicValuesProps) => {
  const [count, setCount] = useState(minCount);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(() =>
        Math.floor(Math.random() * (maxCount - minCount + 1) + minCount),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [maxCount, minCount]);
  return (
      <div className='medic-values'>
          <h3>{title}</h3>
        <span>{count}</span>
      </div>
  );
};

export default MedicValues
