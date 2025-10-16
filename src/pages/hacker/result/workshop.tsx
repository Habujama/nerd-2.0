import { useState } from 'react';
import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';
import LockedFile from './locked-file/locked-file';

const Workshop = () => {
const [showDetails, setShowDetails] = useState<
        'chat' | 'canteen' | 'delivery' | null>()    
  return (
    <>
      <h4>Workshop example</h4>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('canteen')}
          className='choice-button'
          style={
            showDetails === 'canteen'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          11CON2222222
        </button>
        <button
          onClick={() => setShowDetails('delivery')}
          className='choice-button'
          style={
            showDetails === 'delivery'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          11DAT2222222
        </button>
        <button
          onClick={() => setShowDetails('chat')}
          className='choice-button'
          style={
            showDetails === 'chat'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          11APT2222222
        </button>
      </div>
      {showDetails === 'canteen' && (
          <div className='text-block'>
            <h3>🥳 Tento uzel není chráněný</h3>
          </div>
      )}
      {showDetails === 'delivery' && (
        <LockedFile password='JsemHacker'>
          <div className='text-block'>
                      <h3>🏴‍☠️ Právě jsi odemkl uzel aniž bys měl heslo!</h3>
                      <small>Heslo k dalšímu uzlu je: <code>JsemNejlepsiHacker</code></small>
          </div>
        </LockedFile>
      )}
      {showDetails === 'chat' && (
        <LockedFile password='JsemNejlepsiHacker' isPwdRecovarable={false}>
                  <h3>⭐️ Odemkl jsi uzel tajným heslem!</h3>
                  <p>Pokud kdykoli odemkneš uzel s animací níže, přepni z NERD do Bitchatu.</p>
          <ConnectionLoader />
        </LockedFile>
      )}
    </>
  );
};

export default Workshop;
