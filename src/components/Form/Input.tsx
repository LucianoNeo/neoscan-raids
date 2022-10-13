import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Input(props: InputProps) {
    return (
        <input
            {...props}
            className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-48 w-[65vw]'
            id='game'
            autoComplete='off'
        />


    )
}
