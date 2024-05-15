export interface ILogin {
    email: string
    password: string,
    errors?: {
        email?: string
        password?: string
    }
}