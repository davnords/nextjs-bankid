import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import { OnboardEmployeeInputs } from "@/models/onboard-employee"

export async function POST(req: NextRequest) {
    const json = await req.json() as OnboardEmployeeInputs
    try {

        const user = await prisma.endUser.create({
            data: {
                firstName: json.firstName,
                lastName: json.lastName,
                personalNumber: json.personalNumber,
                company: { connect: { name: 'NREP' } }, // to be changed from hardcoded
                serviceProviders: {
                    connect: json.serviceProviderNames.map(providerName => ({ name: providerName }))
                },
                teams: {
                    connect: json.teams.map(teamId => ({ id: teamId })),
                }
            }
        })
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })

    }


}