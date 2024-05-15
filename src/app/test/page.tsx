'use client'
import { useFormState } from 'react-dom'

const initialState = { 
    email: '',
    password: ''
}
//action here
const increment = async(previousState: any, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    return {
        email,
        password
    }
}

const TestPage = () => {
    const [state, formAction] = useFormState(increment, initialState)
  return (
    <>
        <form action={formAction}>
            <input type="text" name="email" />
            <input type="text" name="password"/>
            <button type='submit'>Increment</button>
        </form>
        <p>{state.email}</p>
        <p>{state.password}</p>
    </>
  )
}

export default TestPage