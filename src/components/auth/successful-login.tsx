import React from 'react'
import { Loader } from './ui/loader'


function SuccessfulLoginComponent({ redirectURL }: { redirectURL: string }) {
    return (
        <>

            <h1 className="text-3xl font-bold text-center">Login successful</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                Please wait while you are redirected. If nothing happens, press{" "}
                <a className="text-blue-500 hover:underline" href={redirectURL}>
                    HERE.
                </a>
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

export default SuccessfulLoginComponent