import { useContext } from 'react'
import { AuthContext } from '../contexts/portal-auth-context'

export const useAuthContext = () => {
    const { isAuthenticated, user, sessionToken, logOut, logIn, isServiceProvider, loading } = useContext(AuthContext)
    return { isAuthenticated, user, sessionToken, logOut, logIn, isServiceProvider, loading }
}
