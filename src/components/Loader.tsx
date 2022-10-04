import React from 'react'

export default function Loader() {
    return (
        <div className='w-full flex  items-center justify-center'>
            <div className='flex flex-col text-white font-extrabold my-10  items-center justify-center'>
                <img src="assets/img/pokeball.gif" alt="" width={80} />
                <div>Carregando...</div>

            </div>
        </div>
    )
}
