import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/use-context';
import { MEDIC, HACKER, MILITARY } from '../../context/types';
import './welcome-page.css';
import Wrapper from '../../components/wrapper/wrapper';
import EuLogo from '../../components/eulogo/eu-logo';

type FormValues = {
  username: string;
  password: string;
};

export default function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const users = [...HACKER, ...MEDIC, ...MILITARY];
    const usernameLowerCase = data.username.toLowerCase();
    const user = users.find(
      (u) => u.username === usernameLowerCase && u.password === data.password,
    );
    if (!user) {
      setError('root', {
        type: 'manual',
        message: 'Špatné uživatelské jméno nebo heslo.',
      });
      return;
    }

    switch (true) {
      case HACKER.some((u) => u.username === usernameLowerCase):
        login('hacker', usernameLowerCase);
        navigate('/hacker');
        break;
      case MEDIC.some((u) => u.username === usernameLowerCase):
        login('medic', usernameLowerCase);
        navigate('/medic');
        break;
      case MILITARY.some((u) => u.username === usernameLowerCase):
        login('military', usernameLowerCase);
        navigate('/military');
        break;
    }
  };

  return (
    <Wrapper alignStart={false}>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ color: '#66FFB2' }}>N E R D 2.0</h2>
        <label>
          Uživatelské jméno
          <input
            {...register('username', {
              required: 'Uživatelské jméno je povinné',
            })}
            aria-invalid={!!errors.username}
            aria-describedby='username-error'
            autoComplete='username'
            onBlur={() => clearErrors()}
            placeholder='Zadej uživatelské jméno'
            className={errors.root ? 'input-error' : 'input-clear'}
          />
        </label>

        <label>
          Heslo
          <input
            type='password'
            {...register('password', { required: 'Heslo je povinné' })}
            aria-invalid={!!errors.password}
            aria-describedby='password-error'
            autoComplete='current-password'
            onBlur={() => clearErrors()}
            placeholder='Zadej heslo'
            className={errors.root ? 'input-error' : 'input-clear'}
          />
        </label>

        {errors.root && (
          <p id='password-error' role='alert' className='error'>
            {errors.root?.message}
          </p>
        )}

        <button type='submit' disabled={isSubmitting || !isDirty}>
          Přihlásit se
        </button>
      </form>
      <div className='eu-logo'>
        <EuLogo radius={260} starOuter={250} />
      </div>
    </Wrapper>
  );
}
