import React from 'react'
import { Button } from "@/components/ui/button"
import QRCode from "react-qr-code";


function ScanQRComponent({ qrCode, setSignInMethod }: { qrCode: string, setSignInMethod: (arg0: 'sd' | 'dd' | null) => void }) {
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Scan the QR</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                Login by scanning the QR on your other device.
            </p>
            <div className="mt-8 flex justify-center">
                <div className="w-1/3 flex justify-center">
                    <QRCode
                        className="w-full h-full"
                        value={qrCode}
                    />
                </div>
            </div>
            <div className="mt-8">
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={() => setSignInMethod(null)}>Back</Button>
            </div>
        </>
    )
}

export default ScanQRComponent