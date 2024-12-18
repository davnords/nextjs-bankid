import { useContext } from 'react'
import { StormAuthContext } from '@/contexts/storm-auth-context'

export const useStormAuthContext = () => {
    const { isAuthenticated, session, logOut, logIn, loading } = useContext(StormAuthContext)
    return { isAuthenticated, session, logOut, logIn, loading }
}
