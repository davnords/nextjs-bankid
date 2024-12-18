import { ReactNode, createContext, useEffect, useState } from 'react'
import { ServiceProvider } from '@prisma/client'
import { getServiceProviders, getCompanies } from '@/utils/api-helper'
import { ExtendedCompanyWithSession } from '@/models/extended-prisma'

interface CompaniesContextVariables {
    data: ExtendedCompanyWithSession[] | null
    fetch: () => void
    isLoading: boolean
}

export const CompaniesContext = createContext<CompaniesContextVariables | null>(null)

export const CompaniesProvider = ({ providerName, children }: { providerName: string, children: ReactNode }) => {
    const [data, setCompany] = useState<ExtendedCompanyWithSession[] | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const fetchData = async () => {
        setIsLoading(true)
        const data = await getCompanies(providerName)
        setCompany(data?.companies || null)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [providerName])
    return (
        <CompaniesContext.Provider value={{ data, isLoading, fetch: fetchData }}>
            {children}
        </CompaniesContext.Provider>
    )
}
