'use server'
import { hashUserPassword } from "../lib/hash"
import { createUser, findUser } from "../lib/user"
import { redirect } from "next/navigation"

export const signup = async(prevState: any, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    let errors = {
        email: "",
        password: ""
    }

    if(!email.includes('@')) {
        errors.email = 'Please enter a valid email address.'
    }

    if(password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters.'
    }
    
    if(Object.values(errors)[0] !== '' || Object.values(errors)[1] !== '') {
        return {
            errors
        }
    }
    
    const hashedPassword = hashUserPassword(password)
    try{
        createUser(email, hashedPassword)
    }catch(error: any){
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'An account with this email already exists.'
                }
            }
        }
        throw error
    }
    redirect('/training') 
}