import './medic.css'
import { useState } from 'react';
import Ekg from '../../assets/ekg.jsx';
import MedicLogo from '../../assets/medic-logo.tsx';
import EkgExitus from '../../assets/ekg-dead.jsx';
import MedicVideo from '../../assets/audio/mozek-mensi.mp4';
import Nav from '../../components/nav/nav.tsx';
import Wrapper from '../../components/wrapper/wrapper.js';
import MedicValues from './medic-values.js';

const MedicPage = () => {
  const [isReadingDead, setIsReadingDead] = useState<boolean>(false);
  const [isReadingAlive, setIsReadingAlive] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <button
          onClick={() => {
            setIsReadingDead(true);
            setIsReadingAlive(false);
            setIsPlayingVideo(false);
          }}
          disabled={isReadingDead}
          className='dead'
        >
          <MedicLogo
            width={
              isPlayingVideo || isReadingAlive || isReadingDead
                ? '50px'
                : '200px'
            }
          />
        </button>
        {!isPlayingVideo && !isReadingAlive && !isReadingDead && (
          <button
            onClick={() => {
              setIsReadingAlive(true);
              setIsReadingDead(false);
              setIsPlayingVideo(false);
            }}
            className='reading-button'
          >
            Natočit EKG pacientovi
          </button>
        )}
        {!isPlayingVideo && (isReadingAlive || isReadingDead) && (
          <button
            onClick={() => {
              setIsReadingAlive(false);
              setIsReadingDead(false);
              setIsPlayingVideo(false);
            }}
            className='reading-button'
          >
            Ukončit snímání
          </button>
        )}
        {!isPlayingVideo && !isReadingAlive && !isReadingDead && (
          <button
            onClick={() => {
              setIsReadingAlive(false);
              setIsReadingDead(false);
              setIsPlayingVideo(true);
            }}
            style={{ maxWidth: '200px', marginTop: '3rem' }}
          >
            Extrahovat čip
          </button>
        )}
        {isPlayingVideo && (
          <button
            onClick={() => {
              setIsReadingAlive(false);
              setIsReadingDead(false);
              setIsPlayingVideo(false);
            }}
            className='back-button'
          >
            Zpět na hlavní panel
          </button>
        )}
      </div>
      {isReadingAlive && (
        <>
          <div className='medic-values-grid'>
            <MedicValues title={'IBP'} minCount={65} maxCount={130} />
            <MedicValues title={'HR'} minCount={60} maxCount={110} />
            <MedicValues title={'Spo2'} minCount={92} maxCount={98} />
            <MedicValues title={'RR'} minCount={12} maxCount={20} />
          </div>
          <Ekg />
        </>
      )}
      {isReadingDead && (
        <>
          <div className='medic-values-grid'>
            <MedicValues title={'IBP'} minCount={0} maxCount={0} />
            <MedicValues title={'HR'} minCount={0} maxCount={0} />
            <MedicValues title={'Spo2'} minCount={0} maxCount={0} />
            <MedicValues title={'RR'} minCount={0} maxCount={0} />
          </div>
          <EkgExitus />
        </>
      )}
      {isPlayingVideo && (
        <div style={{ width: '100%' }}>
          <video src={MedicVideo} controls={true} width='50%' height='50%' />
        </div>
      )}
    </Wrapper>
  );
};

export default MedicPage
