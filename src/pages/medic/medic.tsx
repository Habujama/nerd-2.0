import './medic.css'
import { useState } from 'react';
import Ekg from '../../assets/ekg.jsx';
import Nav from '../../components/nav.js';
import Wrapper from '../../components/wrapper.js';
import MedicValues from '../../components/medic-values.js';

const MedicPage = () => {
  const [isReading, setIsReading] = useState(false);
  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <button
          onClick={() => {
            setIsReading(!isReading);
          }}
        >
          {isReading ? 'Ukončit snímání EKG' : 'Natočit EKG'}
        </button>
      </div>
      {isReading && (
        <>
          <div className='medic-values-grid'>
            <MedicValues title={'HR'} minCount={40} maxCount={200} />
            <MedicValues title={'Pulse'} minCount={40} maxCount={200} />
            <MedicValues title={'Spo2'} minCount={12} maxCount={30} />
            <MedicValues title={'RR'} minCount={12} maxCount={30} />
          </div>
          <Ekg />
        </>
      )}
    </Wrapper>
  );
};

export default MedicPage
