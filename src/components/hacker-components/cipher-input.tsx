import { useForm } from 'react-hook-form';
import type { CipherInfo } from '../../context/types';

type FormValues = {
  cipherKey: string;
};

interface CipherInputProps {
  ciphersList: CipherInfo[];
  startSession: (id: string) => void;
}

const CipherInput = ({ ciphersList, startSession }: CipherInputProps) => {
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
    const raw = data.cipherKey ?? '';
    const normalized = raw.trim().toUpperCase();
    const ciphers = ciphersList.find((c) => c.key === normalized);
    if (!ciphers) {
      setError('cipherKey', {
        type: 'manual',
        message: 'Zadaný klíč není validní',
      });
      return;
    }

    startSession(normalized);
    /* navigate(`/hacker/session/${normalized}`); */
    return;
  };

  return (
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
      <p>533VZP1</p>
      <button
        type='submit'
        disabled={isSubmitting || (isDirty && !!errors.cipherKey)}
      >
        Potvrdit
      </button>
    </form>
  );
};

export default CipherInput;
