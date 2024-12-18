import { useContext } from 'react'
import { ServiceProviderContext } from '@/contexts/service-provider-context'

export const useServiceProviderContext = () => {
    const providers = useContext(ServiceProviderContext)
    if (!providers) {
        throw new Error("UseServiceProviderContect can not be used without ServiceProvider!!!")
    }
    return providers
}
