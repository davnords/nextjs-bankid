import { useContext } from 'react'
import { AllServiceProvidersContext } from '@/contexts/all-service-provider-context'

export const useAllServiceProvidersContext = () => {
    const providers = useContext(AllServiceProvidersContext)
    return providers
}
