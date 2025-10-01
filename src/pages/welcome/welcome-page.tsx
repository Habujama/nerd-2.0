import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/use-context';
import { MEDIC, HACKER, MILITARY } from '../../context/types';
import './welcome-page.css';
import Wrapper from '../../components/wrapper';
import EuLogo from '../../components/eu-logo';

type FormValues = {
  username: string;
  password: string;
};

export default function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const users = [...HACKER, ...MEDIC, ...MILITARY];
    const user = users.find(
      (u) => u.username === data.username && u.password === data.password,
    );
    if (!user) {
      setError('password', {
        type: 'manual',
        message: 'Špatné uživatelské jméno nebo heslo.',
      });
      return;
    }

    switch (true) {
      case HACKER.some((u) => u.username === user.username):
        login('hacker', user.username);
        navigate('/hacker');
        break;
      case MEDIC.some((u) => u.username === user.username):
        login('medic', user.username);
        navigate('/medic');
        break;
      case MILITARY.some((u) => u.username === user.username):
        login('military', user.username);
        navigate('/military');
        break;
    }
  };

  return (
    <Wrapper alignStart={false}>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ color: '#66FFB2' }}>N. E. R. D. 2.0</h2>
        <label>
          Uživatelské jméno
          <input
            {...register('username', {
              required: 'Uživatelské jméno je povinné',
            })}
            aria-invalid={!!errors.username}
            aria-describedby='username-error'
            autoComplete='username'
            className={!errors.username ? 'input-clear' : ''}
          />
          {errors.username && (
            <span id='username-error' role='alert' className='error'>
              {errors.username.message}
            </span>
          )}
        </label>

        <label>
          Heslo
          <input
            type='password'
            {...register('password', { required: 'Heslo je povinné' })}
            aria-invalid={!!errors.password}
            aria-describedby='password-error'
            autoComplete='current-password'
            className={!errors.password ? 'input-clear' : ''}
          />
          {errors.password && (
            <span id='password-error' role='alert' className='error'>
              {errors.password.message}
            </span>
          )}
        </label>

        <button type='submit' disabled={isSubmitting}>
          Přihlásit se
        </button>
      </form>
      <div className='eu-logo'>
        <EuLogo radius={280} starOuter={270} />
      </div>
    </Wrapper>
  );
}
