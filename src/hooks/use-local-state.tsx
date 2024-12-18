'use client'
import { useEffect, useState } from 'react'

function useLocalState<T>(key: string, initialValue: any) {
    //TODO - User dependent. Clear cache if user is changed.
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== "undefined") {
            const localValue = window.localStorage.getItem(key)
            if (!localValue || localValue === 'undefined' || localValue === undefined) {
                return initialValue
            }
            return JSON.parse(localValue)
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localValue = window.localStorage.getItem(key)
            if (!localValue || localValue === 'undefined' || localValue === undefined) {
                setValue(initialValue)
            } else {
                setValue(JSON.parse(localValue))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    const updateValue = (value: T) => {
        setValue(value)
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    }
    return { value, updateValue }
}

export default useLocalState
