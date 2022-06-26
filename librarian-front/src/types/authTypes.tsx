
interface AuthSession {
    id: number
    name: string
    email: string
    description: string
    picture: string
    token: string
  }
  

type AuthAction = {
    type: string
    session: AuthSession
}
  
type DispatchAuth = (args:AuthAction) => AuthAction
  


const authActions = {
    login: "[Auth] Login",
    logout: "[Auth] Logout"
}

export {
    authActions,
} 

export type {
    DispatchAuth,
    AuthAction,
    AuthSession
}