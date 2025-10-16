import { useState } from 'react';
import MiniGame from '../minigame/minigame';
import type { Session } from '../../context/types';
import './pwd-gate.css'

interface PasswordGateProps {
  sessionId: string;
  children: React.ReactNode;
}

const PasswordGate = ({ sessionId, children }: PasswordGateProps) => {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [error, setError] = useState(false)

  let parsedSession: Session | undefined = undefined;
  const rawSession = localStorage.getItem(`hack_session_${sessionId}`);
  if (!rawSession) {
    console.error('could not find session password')
  } else {
    parsedSession = JSON.parse(rawSession);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGameWon(false);
    setShowGame(false)
    if (input.toLowerCase() === parsedSession?.password?.toLowerCase()) {
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

  if (unlocked) return <div>{children}</div>;

  return (
    <div className='pwd-gate-wrapper'>
      {!unlocked && !showGame && <h3>Uzel {sessionId} je uzamčen</h3>}
      {showGame && !unlocked && <h3>Obnovení hesla uzlu {sessionId}:</h3>}
      {!showGame && (
        <>
          {gameWon && (
            <p>
              Heslo obnoveno: <strong>{parsedSession?.password}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ textAlign: 'left' }}>
              Heslo:
              <input
                id='password'
                name='password'
                aria-label='password'
                aria-describedby='node-password-error'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={() => setError(false)}
                placeholder='Zadej heslo...'
                className={error ? 'input-error' : 'input-clear'}
              />
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
          <button onClick={handleResetPwd} className='pwd-link-button'>
            Zapomněl jsem heslo
          </button>
        </>
      )}

      {showGame && (
        <>
          <MiniGame setGameWon={handleGameWon} />
          <button onClick={handleNavigateBack} className='pwd-link-button'>
            Zpět
          </button>
        </>
      )}
    </div>
  );
}

export default PasswordGate
