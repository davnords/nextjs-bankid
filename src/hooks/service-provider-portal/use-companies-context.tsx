import { useContext } from 'react'
import { CompaniesContext } from '@/contexts/service-provider-portal/companies-context'

export const useCompaniesContext = () => {
    const providers = useContext(CompaniesContext)
    if (!providers) {
        throw new Error("Provider ERRORR!!")
    }
    return providers
}
