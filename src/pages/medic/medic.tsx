import './medic.css'
import { useState } from 'react';
import Ekg from '../../assets/ekg.jsx';
import MedicLogo from '../../assets/medic-logo.tsx';
import EkgExitus from '../../assets/ekg-dead.jsx';
import Nav from '../../components/nav/nav.tsx';
import Wrapper from '../../components/wrapper/wrapper.js';
import MedicValues from './medic-values.js';

const MedicPage = () => {
  const [isReadingDead, setIsReadingDead] = useState(false);
  const [isReadingAlive, setIsReadingAlive] = useState(false);

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <button
          onClick={() => {
            setIsReadingDead(true);
            setIsReadingAlive(false);
          }}
          disabled={isReadingDead}
          className='dead'
        >
          <MedicLogo
            width={isReadingAlive || isReadingDead ? '50px' : '200px'}
          />
        </button>
        {!isReadingAlive && !isReadingDead && (
          <button
            onClick={() => {
              setIsReadingAlive(true);
              setIsReadingDead(false);
            }}
            className='reading-button'
          >
            Natočit EKG pacientovi
          </button>
        )}
        {(isReadingAlive || isReadingDead) && (
          <button
            onClick={() => {
              setIsReadingAlive(false);
              setIsReadingDead(false);
            }}
            className='reading-button'
          >
            Ukončit snímání
          </button>
        )}
      </div>
      {isReadingAlive && (
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
      {isReadingDead && (
        <>
          <div className='medic-values-grid'>
            <MedicValues title={'HR'} minCount={0} maxCount={0} />
            <MedicValues title={'Pulse'} minCount={0} maxCount={0} />
            <MedicValues title={'Spo2'} minCount={0} maxCount={0} />
            <MedicValues title={'RR'} minCount={0} maxCount={0} />
          </div>
          <EkgExitus />
        </>
      )}
    </Wrapper>
  );
};

export default MedicPage
