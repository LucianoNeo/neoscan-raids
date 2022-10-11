import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Input(props: InputProps) {
    return (
        <input
            {...props}
            className='bg-zinc-900 rounded py-2.5 px-4 text-sm placeholder:text-zinc-500 w-48'
            id='game'
            autoComplete='off'
        />


    )
}
