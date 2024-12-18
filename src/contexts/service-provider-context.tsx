import { ReactNode, createContext, useEffect, useState } from 'react'
import { ServiceProvider } from '@prisma/client'
import { getServiceProviders } from '@/utils/api-helper'

export interface ApiCommand<T> {
    endpoint: string
    interface: T
}
interface ServiceProvidersContextVariables {
    data: ServiceProvider[] | null
    fetch: () => void
    isLoading: boolean
}

export const ServiceProviderContext = createContext<ServiceProvidersContextVariables | null>(null)

function useCommand<T>(command: ApiCommand<T>) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const _fetch = async (body: T) => {
        setIsLoading(true)
        const res = await fetch(command.endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        })

        if (res.status === 200) {
            const data: T = await res.json()
            setData(data)
        }
        setIsLoading(false)
    }
    return {
        data, isLoading, fetch: _fetch
    }
}

function useApi<T>(apiFunc: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fetch = async () => {
        setIsLoading(true)
        const res: T = await apiFunc()
        setData(res || null)
        setIsLoading(false)
    }
    return {
        data, isLoading, fetch
    }
}

export const ServiceProviderProvider = ({ companyName, children }: { companyName: string, children: ReactNode }) => {
    const [data, setServiceProviders] = useState<ServiceProvider[] | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true)
        const data = await getServiceProviders(companyName)
        setServiceProviders(data?.serviceProviders || null)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [companyName])
    return (
        <ServiceProviderContext.Provider value={{ data, isLoading, fetch: fetchData }}>
            {children}
        </ServiceProviderContext.Provider>
    )
}
