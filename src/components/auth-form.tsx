'use client'
import Link from 'next/link';
import Image from 'next/image'
import authIcon from '../../public/images/auth-icon.jpg'
import { useFormState } from 'react-dom';
import { signup } from '@/actions/auth-action';

const AuthForm = () => {
  const [formState, formAction] = useFormState(signup, { errors: { email: '', password: '' } });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src={authIcon} alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => <li key={error}>{formState.errors[error]}</li>)}
        </ul>
      )}
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}

export default AuthForm
