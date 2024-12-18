import React from 'react'
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code";


function OpenAppOnPhoneComponent({ bankIdOpenLink, loading, setSignInMethod, setBankIdOpenLink }: { bankIdOpenLink: string, setBankIdOpenLink: (arg0: string | null) => void, loading: boolean, setSignInMethod: (arg0: 'sd' | 'dd' | null) => void }) {
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Open the app</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                Click the button below to open the app and login.
            </p>
            <div className="mt-8">
                <a href={bankIdOpenLink} className='w-full' target="_blank">
                    <Button disabled={loading} className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Open App</Button>
                </a>
            </div>
            <div className="mt-8">
                <Button className="w-full outline outline-1 outline-gray-400 bg-white text-black hover:bg-gray-200" onClick={() => {
                    setSignInMethod(null)
                    setBankIdOpenLink(null)
                }}>Back</Button>
            </div>
        </>
    )
}

export default OpenAppOnPhoneComponent