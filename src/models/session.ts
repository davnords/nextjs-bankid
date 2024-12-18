import { Role } from "@prisma/client";

export interface SessionPayloadProps {
    firstName: string;
    lastName: string;
    personalNumber: string;
    expiresAt: Date;
}

export interface PortalSessionPayloadProps {
    name: string
    image: string
    username: string
    role: Role
    isProvider: boolean;
    expiresAt: Date;
}
