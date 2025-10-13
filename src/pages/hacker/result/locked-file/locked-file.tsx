import { useState } from 'react';
import MiniGame from '../../../../components/minigame/minigame';
import './locked-file.css'

interface LockedFileProps {
    password: string;
    sessionId: string;
    isPwdRecovarable?: boolean;
  children: React.ReactNode;
}

const LockedFile = ({ password, sessionId, isPwdRecovarable = true, children }: LockedFileProps) => {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameWon(false);
    setShowGame(false)
      if (input.toLowerCase() === password.toLowerCase()) {
      setUnlocked(true);
    } else {
      setError(true)
    }
  };

  const handleGameWon = () => (
    setGameWon(true),
    setShowGame(false)
  )

    const handleNavigateBack = () => (
    setGameWon(false),
    setShowGame(false)
  )

  const handleResetPwd = () => (
    setGameWon(false),
    setShowGame(true)
  )

  if (unlocked) return <>{children}</>;

  return (
      <div className="locked-wrapper">
          <h3>Uzamčený soubor</h3>
      {showGame && !unlocked && <h3>Obnovení hesla:</h3>}
      {!showGame && 
        <>
              {gameWon && <p>Heslo obnoveno: <strong>{password}</strong></p>}

          <form onSubmit={handleSubmit}>
          <label style={{ textAlign: 'left'}}>
              Heslo:
            <input
              id="password"
              name="password"
              aria-label="password"
              aria-describedby='node-password-error'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={() => setError(false)}
              placeholder="Zadej heslo..."
              className={error ? 'input-error' : 'input-clear'}
            />
            </label>
            {error &&
              <p id='password-error' role='alert' className='error'>
                Nesprávné heslo
              </p>
            }
            <button type="submit" disabled={error}>
              Ověřit
            </button>
          </form>
              {isPwdRecovarable && <button onClick={handleResetPwd} className='pwd-link-button'>
                  Zapomněl jsem heslo
              </button>}
        </>
      }

      {showGame && 
        <>
          <MiniGame sessionId={sessionId} setGameWon={handleGameWon} />
          <button onClick={handleNavigateBack} className='pwd-link-button'>
            Zpět
          </button>
        </>
      }
    </div>
  );
}

export default LockedFile
