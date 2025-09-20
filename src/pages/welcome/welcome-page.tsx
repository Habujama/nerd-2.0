import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/use-context';
import logo from '../../assets/react.svg';
import './welcome-page.css';

type FormValues = {
  username: string;
  password: string;
};

const HACKER = {
  username: 'hacker',
  password: 'letmein123',
};

const MEDIC = {
  username: 'medic',
  password: 'letmein123',
};

const MILITARY = {
  username: 'military',
  password: 'letmein123',
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
    const users = [HACKER, MEDIC, MILITARY];
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

    switch (user.username) {
      case HACKER.username:
        login('hacker');
        navigate('/hacker');
        break;
      case MEDIC.username:
        login('medic');
        navigate('/medic');
        break;
      case MILITARY.username:
        login('military');
        navigate('/military');
        break;
    }
  };

  return (
    <div>
      <img src={logo} className='logo' alt='N.E.R.D 2.0 logo' />
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='title'>
          <h2>N.E.R.D 2.0</h2>
        </div>

        <div>
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
        </div>

        <span>
          <label>
            Heslo
            <input
              type='password'
              {...register('password', { required: 'Heslo je povinné' })}
              aria-invalid={!!errors.password}
              aria-describedby='password-error'
              autoComplete='current-password'
              className={!errors.username ? 'input-clear' : ''}
            />
            {errors.password && (
              <span id='password-error' role='alert' className='error'>
                {errors.password.message}
              </span>
            )}
          </label>
        </span>

        <button type='submit' disabled={isSubmitting}>
          Přihlásit se
        </button>

        <p className='hint'>
          Uživatel: <strong>hacker | medic | military</strong>
          <br />
          Heslo: <strong>letmein123</strong>
        </p>
      </form>
    </div>
  );
}
