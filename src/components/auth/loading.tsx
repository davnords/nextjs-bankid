import React from 'react'
import { Loader } from './ui/loader'

function LoadingComponent() {
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Loading...</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                Your device has successfully scanned the QR code. Please login through BankID.
            </p>
            <div className="mt-8">
                {/* <LinearProgress className='w-full' color='info' /> */}
                <div className="flex justify-center">
                    <Loader />
                </div>
            </div>
        </>
    )
}

export default LoadingComponent