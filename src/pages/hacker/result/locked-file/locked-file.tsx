import { useState } from 'react';
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
}

const LockedFile = ({
  password,
  sessionId,
  title,
  isPwdRecovarable = true,
  children,
}: LockedFileProps) => {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [error, setError] = useState(false);
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowInput(!showInput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameWon(false);
    setShowGame(false);
    if (input.toLowerCase() === password.toLowerCase()) {
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  const handleGameWon = () => (setGameWon(true), setShowGame(false));

  const handleNavigateBack = () => (setGameWon(false), setShowGame(false));

  const handleResetPwd = () => (setGameWon(false), setShowGame(true));

  if (unlocked) return <>{children}</>;

  return (
    <div className='locked-wrapper'>
      <h3>{title ? title : 'Uzamčený soubor'}</h3>
      {showGame && !unlocked && <h3>Obnovení hesla:</h3>}
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
                  aria-label='password'
                  placeholder='Zadej heslo...'
                  aria-describedby='node-password-error'
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
            <button onClick={handleResetPwd} className='pwd-link-button'>
              Zapomněl jsem heslo
            </button>
          )}
        </>
      )}

      {showGame && (
        <>
          <MiniGame sessionId={sessionId} setGameWon={handleGameWon} />
          <button onClick={handleNavigateBack} className='pwd-link-button'>
            Zpět
          </button>
        </>
      )}
    </div>
  );
};

export default LockedFile
