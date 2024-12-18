import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import jwt from 'jsonwebtoken'
import { SessionPayloadProps } from "@/models/session"
import { cookies } from 'next/headers'
import DeviceDetector from "device-detector-js";

// Need to add refresh tokens also

export async function POST(req: NextRequest) {
    const json = await req.json()
    const { firstName, lastName, personalNumber, serviceProviderName } = json
    if (!firstName || !lastName || !personalNumber || !process.env.EXPIRATION_DAYS || !process.env.SESSIONS_ALLOWED || !serviceProviderName) {
        return NextResponse.json('Necessary field missing', {
            status: 400,
        })
    }

    if (!process.env.JWT_SECRET) {
        return NextResponse.json('No secret key was found in .env', {
            status: 400,
        })
    }

    const user = await prisma.endUser.findUnique({ where: { personalNumber: personalNumber } })

    if (!user) {
        return NextResponse.json('Unauthorized', {
            status: 413,
        })
    }

    // Using the device information
    const deviceDetector = new DeviceDetector();
    const userAgent = req.headers.get('user-agent')
    let device
    if (userAgent) {
        device = deviceDetector.parse(userAgent);
    }
    const today = new Date()
    const expirationDate = new Date(today.setFullYear(today.getFullYear()+ parseInt(process.env.EXPIRATION_DAYS)))

    const payload = {
        firstName: firstName,
        lastName: lastName,
        personalNumber: personalNumber,
        expiresAt: expirationDate,
    } as SessionPayloadProps

    const token = jwt.sign(payload, process.env.JWT_SECRET) // potential to add expiry

    cookies().set({
        name: 'storm-auth.session-token',
        value: token,
        httpOnly: true,
        path: '/',
        expires: expirationDate,
        secure: true
    })

    const currentSessions = await prisma.session.findMany({
        where: {
            personalNumber: personalNumber,
            status: 'ACTIVE',
            serviceProviderName: serviceProviderName,
            expiresAt: {
                // Assuming the expiresAt field represents the session's expiration time
                gte: new Date() // Filter sessions that have not yet expired
            }
        },
        orderBy: {
            createdAt: 'asc' // Order sessions by creation date in ascending order (oldest first)
        }
    })

    // Assuming the maximum allowed number of sessions is 3
    const maxAllowedSessions = parseInt(process.env.SESSIONS_ALLOWED) - 1;

    if (currentSessions.length >= maxAllowedSessions) {
        // Determine the number of sessions to delete
        const sessionsToDelete = currentSessions.length - maxAllowedSessions;

        // Delete the oldest sessions exceeding the allowed count
        for (let i = 0; i < sessionsToDelete; i++) {
            await prisma.session.update({
                where: {
                    id: currentSessions[i].id // Delete the oldest sessions
                },
                data: {
                    status: 'INACTIVE'
                }
            });
        }
    }

    const session = await prisma.session.create({
        data: {
            token: token,
            expiresAt: expirationDate,
            device: `${device?.device?.brand} ${device?.os?.name} ${device?.os?.version}`,
            status: 'ACTIVE',
            user: {
                connect: {
                    personalNumber: personalNumber,
                },
            },
            ServiceProvider: {
                connect: {
                    name: serviceProviderName,
                },
            },
            geo: {
                create: {
                    city: req.headers.get('x-vercel-ip-city'),
                    country: req.headers.get('x-vercel-ip-country'),
                    region: req.headers.get('x-vercel-ip-country-region'),
                    latitude: req.headers.get('x-vercel-ip-latitude'),
                    longitude: req.headers.get('x-vercel-ip-longitude'),
                }
            }
        },
        include: { user: { include: { serviceProviders: true } } }
    })

    return NextResponse.json({ token, session: session }, { status: 200 })
}