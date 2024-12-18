import { ReactNode, createContext, useEffect, useState } from 'react'
import { ServiceProvider } from '@prisma/client'
import { getAllServiceProviders } from '@/utils/api-helper'

export interface AllServiceProvidersContextVariables {
    data: ServiceProvider[] | null
    fetch: () => void
    isLoading: boolean
}

export const AllServiceProvidersContext = createContext<AllServiceProvidersContextVariables | null>(null)

export const AllServiceProviderProvider = ({ children }: { children: ReactNode }) => {
    const [data, setServiceProviders] = useState<ServiceProvider[] | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true)
        const data = await getAllServiceProviders()
        setServiceProviders(data?.serviceProviders || null)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <AllServiceProvidersContext.Provider value={{ data, isLoading, fetch: fetchData }}>
            {children}
        </AllServiceProvidersContext.Provider>
    )
}
