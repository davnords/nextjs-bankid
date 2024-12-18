import { ReactNode, createContext, useEffect, useState } from 'react'
import { ServiceProvider } from '@prisma/client'
import { getCompany, getServiceProviders } from '@/utils/api-helper'
import { ExtendedCompany } from '@/models/extended-prisma'

export interface ServiceProvidersContextVariables {
    data: ExtendedCompany | null
    fetch: () => void
    isLoading: boolean
}

export const CompanyContext = createContext<ServiceProvidersContextVariables | null>(null)

export const CompanyProvider = ({ companyName, children }: { companyName: string, children: ReactNode }) => {
    const [data, setCompany] = useState<ExtendedCompany | null>(null)

    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        const data = await getCompany(companyName)
        setCompany(data?.company || null)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [companyName])
    return (
        <CompanyContext.Provider value={{ data, isLoading, fetch: fetchData }}>
            {children}
        </CompanyContext.Provider>
    )
}
