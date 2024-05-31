'use server'
import { createAuthSession, destroySession } from "@/lib/auth"
import { hashUserPassword, verifyPassword } from "../lib/hash"
import { createUser, getUserByEmail } from "../lib/user"
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
        const id = createUser(email, hashedPassword)
        await createAuthSession(await id)
        redirect('/training') 
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
    
}

export const login = async(prevState: any, formData: FormData) => {
    const email = formData.get('email')
    const password = formData.get('password')

    const existingUser = await getUserByEmail(email as string)

    if(!existingUser){
        return {
            errors: {
                email: 'Could not authenciate user, please check your credentials'
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password as string)

    if (!isValidPassword) {
        return {
            errors: {
                password: 'Could not authenciate user, please check your credentials'
            }
        }
    }

    await createAuthSession(existingUser.id)
    redirect('/training')
}

export const auth = async (mode: string, prevState: any, formData: FormData) => {
    if(mode === 'login'){
        return login(prevState, formData)
    }
    return signup(prevState, formData)
}

export const logout = async() => {
    await destroySession()
    redirect('/')
}