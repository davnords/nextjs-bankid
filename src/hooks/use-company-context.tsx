import { useContext } from 'react'
import { CompanyContext } from '@/contexts/company-context'

export const useCompanyContext = () => {
    const providers = useContext(CompanyContext)
    if (!providers) {
        throw new Error("Provider ERRORR!!")
    }
    return providers
}
