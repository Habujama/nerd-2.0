import EyeOpenIcon from '../../../assets/eye-svgrepo-com.tsx';
import EyeClosedIcon from '../../../assets/eye-slash-svgrepo-com.tsx';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormValues } from '../../../pages/welcome/welcome-page.tsx';

interface PasswordInputProps {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    clearErrors: () => void;
}

const PasswordInput = ({ register, errors, clearErrors }: PasswordInputProps) => {
  const [showInput, setShowInput] = useState<boolean>(false);
    
    const handleShowPassword = () => {
    setShowInput(!showInput);
  };
    
    return (
      <div className='input-wrapper'>
        <input
          type={showInput ? 'text' : 'password'}
          {...register('password', { required: 'Heslo je povinné' })}
          id='password'
          name='password'
          aria-label='password'
          aria-invalid={!!errors.password}
          aria-describedby='password-error'
          autoComplete='current-password'
          onBlur={() => clearErrors()}
          placeholder='Zadej heslo'
          className={errors.root ? 'input-error' : 'input-clear'}
          style={{ width: '300px' }}
        />
        <button
          type='button'
          onClick={handleShowPassword}
          className='input-button'
        >
          {showInput ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
    );
}

export default PasswordInput
