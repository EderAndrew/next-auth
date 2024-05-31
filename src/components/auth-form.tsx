'use client'
import Link from 'next/link';
import Image from 'next/image'
import authIcon from '../../public/images/auth-icon.jpg'
import { useFormState } from 'react-dom';
import { auth, signup } from '@/actions/auth-action';

const AuthForm = ({ mode }: { mode: string }) => {
  const [formState, formAction] = useFormState(auth.bind(null, mode), { errors: { email: '', password: '' } });

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
          {Object.keys(formState.errors).map((error) => <li key={error}>{formState.errors[error].toString()}</li>)}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>
        { mode === 'login' && <Link href="/?mode=signup">Create an account.</Link> }
        { mode === 'signup' && <Link href="/?mode=login">Login with existing account.</Link> }
      </p>
    </form>
  );
}

export default AuthForm
