import { ReactNode, createContext, useEffect, useState } from 'react'
import { verifySession, createSession, deleteSession } from '@/utils/api-helper'
import { ExtendedSession } from '@/models/extended-prisma'
import { useRouter } from 'next/navigation'

interface StormAuthContextVariables {
    isAuthenticated: boolean
    session: ExtendedSession | undefined
    loading: boolean
    logOut?: () => void
    logIn?: (firstName: string, lastName: string, personalNumber: string, serviceProviderName: string, callbackUrl: string) => void
}

export const StormAuthContext = createContext<StormAuthContextVariables>({
    session: undefined,
    isAuthenticated: false,
    loading: true,
})

export const StormAuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [session, setSession] = useState<ExtendedSession | undefined>()
    const isAuthenticated = !!session

    const [loading, setIsLoading] = useState(true)

    const logIn = async (firstName: string, lastName: string, personalNumber: string, serviceProviderName: string, callbackUrl: string) => {
        const apiresponse = await createSession(firstName, lastName, personalNumber, serviceProviderName)
        if (apiresponse.status === 200) {
            const data: { token: string, session: ExtendedSession } = await apiresponse.json()
            setSession(data.session)
            router.push(callbackUrl)
        }
    }

    const logOut = async () => {
        setSession(undefined)
        await deleteSession()
    }

    const validateSession = async () => {
        setIsLoading(true)
        const data = await verifySession()
        setSession(data?.session || undefined)
        setIsLoading(false)
    }

    useEffect(() => {
        validateSession()
    }, [])
    return (
        <StormAuthContext.Provider value={{ session, logOut, logIn, isAuthenticated, loading }}>
            {children}
        </StormAuthContext.Provider>
    )
}
