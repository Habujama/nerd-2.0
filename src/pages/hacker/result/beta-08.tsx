import React, { useState } from 'react';
import { detailsMap } from './beta-08-text-content';
import type { Details } from './result-types';
import './loading-mind/extraction.css';
import './result.css';

interface Beta08Props {
  sessionId: string;
}

const Beta08 = ({ sessionId }: Beta08Props) => {
  const [showDetails, setShowDetails] = useState<Details | null>(null);
  const [unlockedDetail, setUnlockedDetail] = useState<Details | null>(null);

  const handleUnlock = (detailKey: Details) => {
    // odemkne jeden, ostatní zamkne
    setUnlockedDetail(detailKey);
  };

  return (
    <div className='loading-page'>
      <div className='grid-buttons'>
        {Object.entries(detailsMap).map(([key, { code }]) => {
          const detailKey = key as Details;
          const isActive = showDetails === detailKey;
          return (
            <button
              key={code}
              onClick={() => setShowDetails(isActive ? null : detailKey)}
              className='choice-button'
              style={
                isActive
                  ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
                  : undefined
              }
            >
              {code}
            </button>
          );
        })}
      </div>

      {showDetails && (
        <div className='message'>
          {React.isValidElement(detailsMap[showDetails].content)
            ? React.cloneElement(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                detailsMap[showDetails].content as React.ReactElement<any>,
                detailsMap[showDetails].content.type === 'div' // nebo jiný DOM element
                  ? {} // <--- když je to DOM element, nic nepřidávám
                  : {
                      sessionId,
                      unlocked: unlockedDetail === showDetails,
                      onUnlock: () => handleUnlock(showDetails),
                    },
              )
            : detailsMap[showDetails].content}

          <button type='button' onClick={() => setShowDetails(null)}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Beta08;
