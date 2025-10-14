import React, { useState, useEffect } from 'react';
import EyeOpenIcon from '../../../../assets/eye-svgrepo-com.tsx';
import EyeClosedIcon from '../../../../assets/eye-slash-svgrepo-com.tsx';
import MiniGame from '../../../../components/minigame/minigame';
import './locked-file.css';

interface LockedFileProps {
  password: string;
  sessionId: string;
  title?: string;
  isPwdRecovarable?: boolean;
  children: React.ReactNode;
  unlocked?: boolean; // <- volitelné
  onUnlock?: () => void; // <- volitelné
}

const LockedFile = ({
  password,
  sessionId,
  title,
  isPwdRecovarable = true,
  children,
  unlocked: unlockedProp, // controlled režim
  onUnlock,
}: LockedFileProps) => {
  const [input, setInput] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [error, setError] = useState(false);
  const [showInput, setShowInput] = useState<boolean>(false);

  // Vnitřní stav odemčení (pro uncontrolled režim)
  const [internalUnlocked, setInternalUnlocked] = useState(false);

  // Pokud komponenta dostane prop `unlocked`, přejde do řízeného režimu
  const isControlled = unlockedProp !== undefined;
  const unlocked = isControlled ? unlockedProp! : internalUnlocked;

  // Po každém odemčení smaž vstup
  useEffect(() => {
    if (unlocked) setInput('');
  }, [unlocked]);

  const handleShowPassword = () => setShowInput(!showInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameWon(false);
    setShowGame(false);

    if (input.toLowerCase() === password.toLowerCase()) {
      if (isControlled) {
        onUnlock?.();
      } else {
        setInternalUnlocked(true);
      }
      setInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleGameWon = () => {
    setGameWon(true);
    setShowGame(false);
    if (isControlled) {
      onUnlock?.();
    } else {
      setInternalUnlocked(true);
    }
    setInput('');
  };

  if (unlocked) return <div>{children}</div>;

  return (
    <div className='locked-wrapper'>
      <h3>{title ?? 'Uzamčený soubor'}</h3>

      {!showGame && (
        <>
          {gameWon && (
            <p>
              Heslo obnoveno: <strong>{password}</strong>
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <label style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Heslo:
              <div className='input-wrapper'>
                <input
                  id='password'
                  type={showInput ? 'text' : 'password'}
                  name='password'
                  placeholder='Zadej heslo...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onBlur={() => setError(false)}
                  className={error ? 'input-error' : 'input-clear'}
                />
                <button
                  type='button'
                  onClick={handleShowPassword}
                  className='input-button'
                >
                  {showInput ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>
            </label>
            {error && (
              <p id='password-error' role='alert' className='error'>
                Nesprávné heslo
              </p>
            )}
            <button type='submit' disabled={error}>
              Ověřit
            </button>
          </form>
          {isPwdRecovarable && (
            <button
              onClick={() => setShowGame(true)}
              className='pwd-link-button'
            >
              Zapomněl jsem heslo
            </button>
          )}
        </>
      )}

      {showGame && (
        <>
          <MiniGame sessionId={sessionId} setGameWon={handleGameWon} />
          <button
            onClick={() => setShowGame(false)}
            className='pwd-link-button'
          >
            Zpět
          </button>
        </>
      )}
    </div>
  );
};

export default LockedFile;
