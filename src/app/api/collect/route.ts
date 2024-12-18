import { NextResponse, NextRequest } from "next/server"
import { BankIdClient } from "@/lib/bank-id";

export async function POST(req: NextRequest) {

    const json = await req.json()
    const { orderRef } = json

    const client = new BankIdClient({
        production: false,
        passphrase: "qwerty123",
    });
    try {
        const response = await client.collect({
            orderRef: orderRef,
        })
        return NextResponse.json(response, { status: 200, })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500, })

    }
}
