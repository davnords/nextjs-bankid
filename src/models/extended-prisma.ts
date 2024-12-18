import { ServiceProvider, Company, EndUser, Session, Geo, Team } from "@prisma/client"

export interface ExtendedSession extends Session {
    geo?: Geo
}

export interface ExtendedUser extends EndUser {
    serviceProviders: ServiceProvider[]
    sessions: ExtendedSession[]
}

export interface ExtendedTeam extends Team {
    users: EndUser[]
    serviceProviders: ServiceProvider[]
}

export interface ExtendedCompany extends Company {
    endUsers: ExtendedUser[]
    serviceProviders: ServiceProvider[]
    teams: ExtendedTeam[]
}

export interface ExtendedSession extends Session {
    user: ExtendedUser
}

export interface UserWithSessions extends EndUser {
    sessions: ExtendedSession[]
}

export interface ExtendedCompanyWithSession extends Company {
    endUsers: UserWithSessions[]
}