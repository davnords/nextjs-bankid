import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/utils/prisma"
import bcrypt from 'bcrypt'

// Function to hash the password
const hashPassword = async (password: string) => {
    const saltRounds = 10; // Salt rounds for bcrypt hashing
    return await bcrypt.hash(password, saltRounds);
};

export async function POST(req: NextRequest) {
    const json = await req.json();
    const { username, password, companyName, name, image, role, email } = json

    const hashedPassword = await hashPassword(password)

    const portalUserId = crypto.randomUUID()

    try {

        const newUser = await prisma.portalUser.create({
            data: {
                id: portalUserId,
                name: name,
                email: email,
                image: image,
                role: role,
                company: {
                    connect: {
                        name: companyName,
                    }
                },
                account: {
                    create: {
                        username: username,
                        password: {
                            create: {
                                hash: hashedPassword,
                            }
                        },
                        portalUserId,
                    }
                }
            }
        })
        return NextResponse.json({ newUser }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 })

    }


}