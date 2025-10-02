import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/use-context';
import type { CipherInfo } from '../../context/types';
import Wrapper from '../../components/wrapper/wrapper';
import Nav from '../../components/nav/nav.tsx';
import './hacker.css';
import Cipher from './cipher';
import SolvedCiphers from './solved-ciphers.tsx';

type FormValues = {
  cipherKey: string;
};

export default function Hacker() {
  const [activeCipherId, setActiveCipherId] = useState<number | null>(null);
  const { ciphersList, isCipherSolved } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: { cipherKey: '' },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormValues) => {
    const ciphers = ciphersList.find((c) => c.key === data.cipherKey);
    if (!ciphers) {
      setError('cipherKey', {
        type: 'manual',
        message: 'Zadaný klíč není validní',
      });
      return;
    }
  };

  const onButtonClick = (id: number) => {
    if (id === activeCipherId) {
      setActiveCipherId(null);
    } else {
      setActiveCipherId(id);
    }
  };

  const solvedCiphers: CipherInfo[] | false =
    ciphersList.length > 0 && ciphersList.filter((c) => c.solved === true);

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <h2>Happy hacking!</h2>
        <div className='hacker-page'>
          <form onSubmit={handleSubmit(onSubmit)} className='hacker-form'>
            <label>
              Vlož klíč uzlu
              <input
                {...register('cipherKey', {
                  required: 'Vložení klíče uzlu je pro další postup nezbytné',
                })}
                aria-invalid={!!errors.cipherKey}
                aria-describedby='cipherKey-error'
                className={errors.cipherKey ? 'input-error' : 'input-clear'}
              />
              {errors.cipherKey && (
                <span id='cipherKey-error' role='alert' className='error'>
                  {errors.cipherKey.message}
                </span>
              )}
            </label>

            <button
              type='submit'
              disabled={isSubmitting || (isDirty && !!errors.cipherKey)}
            >
              Potvrdit
            </button>
          </form>

          {/* zobrazíme jen pokud máme aktivní id a je opravdu solved */}
          {activeCipherId !== null && isCipherSolved(activeCipherId) && (
            <Cipher id={activeCipherId} />
          )}

          <SolvedCiphers
            solvedCiphers={solvedCiphers}
            activeCipherId={activeCipherId}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </Wrapper>
  );
}
