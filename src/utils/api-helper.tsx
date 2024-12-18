import { ServiceProvider, Company, EndUser } from "@prisma/client"
import { ExtendedCompany, ExtendedCompanyWithSession, ExtendedSession } from "@/models/extended-prisma"
import { SessionPayloadProps } from "@/models/session"
import { OnboardEmployeeInputs } from "@/models/onboard-employee"
import { Role } from "@prisma/client"

export async function getServiceProviders(companyName: string) {
    const apiresponse = await fetch(`/api/get-data/service-providers?companyName=${companyName}`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { serviceProviders: ServiceProvider[] } = await apiresponse.json()
        return data
    }
}

export async function getCompany(companyName: string) {
    const apiresponse = await fetch(`/api/get-data/company?companyName=${companyName}`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { company: ExtendedCompany } = await apiresponse.json()
        return data
    }
}

export async function setCookie() {
    const apiresponse = await fetch(`/api/service-provider-portal/set-cookie`, {
        method: 'get',
    })
    return apiresponse
}

export async function deleteCookie() {
    const apiresponse = await fetch(`/api/service-provider-portal/delete-cookie`, {
        method: 'get',
    })
    return apiresponse
}


export async function getCompanies(serviceProvider: string) {
    const apiresponse = await fetch(`/api/service-provider-portal/companies?providerName=${serviceProvider}`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { companies: ExtendedCompanyWithSession[] } = await apiresponse.json()
        return data
    }
}

export async function getAllServiceProviders() {
    const apiresponse = await fetch(`/api/get-data/all-service-providers`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { serviceProviders: ServiceProvider[] } = await apiresponse.json()
        return data
    }
}

export async function updateUsers(emails: string[], providerName: string) {
    const apiresponse = await fetch(`/api/post-data/update-users`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emails, providerName })
    })

    return apiresponse
}

export async function signJwt(companyName: string, serviceProviderName: string) {
    const apiresponse = await fetch(`/api/post-data/sign-jwt`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ companyName, serviceProviderName })
    })

    return apiresponse
}


export async function verifySession() {
    const apiresponse = await fetch(`/api/sessions/verify-cookie-session`, {
        method: 'get',
    })
    if (apiresponse.status === 200) {
        const data: { session: ExtendedSession } = await apiresponse.json()
        return data
    }
}

export async function createSession(firstName: string, lastName: string, personalNumber: string, serviceProviderName: string) {
    const apiresponse = await fetch(`/api/sessions/create-session`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, personalNumber, serviceProviderName })
    })

    return apiresponse
}

export async function deleteSession() {
    const apiresponse = await fetch(`/api/sessions/remove-session`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return apiresponse
}

export async function submitOnboarding(input: OnboardEmployeeInputs) {
    const response = await fetch(`/api/user-provider-portal/create-user`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    })
    return response
}

export async function deleteUser(userId: string) {
    const response = await fetch(`/api/user-provider-portal/delete-user`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    return response
}

export async function deleteSessionFromDatabase(token: string) {
    const response = await fetch(`/api/sessions/delete-session-from-database`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    return response
}

export async function addSubscription(id: string, companyName: string) {
    const response = await fetch(`/api/user-provider-portal/add-subscription`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, companyName })
    })
    return response
}

export async function removeSubscription(id: string, companyName: string) {
    const response = await fetch(`/api/user-provider-portal/remove-subscription`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, companyName })
    })
    return response
}

export async function unsubscribeUser(userId: string, companyId: string) {
    const response = await fetch(`/api/user-provider-portal/unsubscribe-user`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, companyId })
    })
    return response
}

export async function createPortalAccount(username: string, password: string, companyName: string, name: string, image: string, role: Role, email: string) {
    const response = await fetch(`/api/user-provider-portal/create-account`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, companyName, name, image, role, email })
    })
    return response
}

export async function addUsers(userIds: string[], providerId: string) {
    const response = await fetch(`/api/user-provider-portal/add-user-subscriptions`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds, providerId })
    })
    return response
}

export async function removeUsers(userIds: string[], providerId: string) {
    const response = await fetch(`/api/user-provider-portal/remove-user-subscriptions`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds, providerId })
    })
    return response
}

export async function createTeam(userIds: string[], companyName: string, teamName: string, providerIds: string[]) {
    const response = await fetch(`/api/user-provider-portal/create-team`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds, companyName, teamName, providerIds})
    })
    return response
}

export async function updateTeam(teamId: string, userIds: string[]) {
    const response = await fetch(`/api/user-provider-portal/update-team`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userIds, teamId })
    })
    return response
}

export async function deleteTeam(teamId: string) {
    const response = await fetch(`/api/user-provider-portal/remove-team`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId })
    })
    return response
}
