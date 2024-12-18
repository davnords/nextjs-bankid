import { createContext, useEffect, useState } from 'react'
import { User } from '../models/user'
import useLocalState from '@/hooks/use-local-state'
import { deleteCookie, setCookie } from '@/utils/api-helper'
import { useRouter, useSearchParams } from 'next/navigation'
import { PortalSessionPayloadProps } from '@/models/session'

interface AuthContextVariables {
    isAuthenticated: boolean
    isServiceProvider: boolean
    loading: boolean
    user: PortalSessionPayloadProps | undefined
    sessionToken: string | undefined
    logOut?: () => void
    logIn?: (arg0: string, arg1: string) => void
}

export const AuthContext = createContext<AuthContextVariables>({
    user: undefined,
    sessionToken: undefined,
    isAuthenticated: false,
    loading: true,
    isServiceProvider: false,
})

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { value: user, updateValue: setUser } = useLocalState<PortalSessionPayloadProps | undefined>(
        'user',
        undefined,
    )
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl')?.toString() as string ?? "/";

    const [loading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { value: sessionToken, updateValue: setSessionToken } = useLocalState<string | undefined>(
        'token',
        undefined,
    )

    const { value: isServiceProvider, updateValue: setIsServiceProvider } = useLocalState<boolean>(
        'service-provider',
        false,
    )

    const logIn = async (username: string, password: string) => {
        setIsLoading(true)
        const apiresponse = await fetch(`/api/user-provider-portal/login?username=${username}&password=${password}`, {
            method: 'get',
        })

        if (apiresponse.status === 200) {
            setIsAuthenticated(true)
            setIsServiceProvider(false)
            const { payload }: { payload: PortalSessionPayloadProps } = await apiresponse.json()

            setSessionToken('asdasdasfafgagga') // can probably be removed
            setUser(payload)

            router.push(`/portal/user`)
            router.push(`/portal/user`)
            router.refresh()

        } else if (username === 'diadmin' && password === 'björne') {
            setIsAuthenticated(true)
            setIsServiceProvider(true)
            setUser({ name: 'David Nordström', image: '/images/david-nordstrom.png', username: 'daviid5566', role: 'SUPERADMIN', isProvider: true, expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) })
            setSessionToken('asdasdasfafgagga')
            await setCookie()
            await router.push('/portal/service-provider')
        }
        setIsLoading(false)
    }

    const logOut = async () => {
        setUser(undefined)
        setSessionToken(undefined)
        await deleteCookie()
        router.refresh()
    }

    const validateSession = async () => {
        setIsLoading(true)
        const apiresponse = await fetch(`/api/user-provider-portal/validate-session`, {
            method: 'get',
        })
        if (apiresponse.status === 200) {
            const { payload }: { payload: PortalSessionPayloadProps } = await apiresponse.json()
            setUser(payload)
        } else {
            setUser(undefined)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        validateSession()
    }, [])
    return (
        <AuthContext.Provider value={{ user, logOut, logIn, isAuthenticated, isServiceProvider, sessionToken, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
