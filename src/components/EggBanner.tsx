import React, { useEffect, useState } from 'react'
import { MapTrifold, Star } from 'phosphor-react'
import axios from 'axios'


interface EggBannerProps {
  pokemonId: number,
  bannerUrl: string,
  eggImg: string,
  title: string,
  adsCount: number
  start: string,
  end: string,
  lat: string,
  lon: string,
  level: number
}

export default function EggBanner(props: EggBannerProps) {


  return (
    <div className='relative rounded-lg overflow-hidden w-64'>

      <img src={props.bannerUrl} className=' opacity-50' />


      <div className='justify-between w-60 absolute z-10 text-white top-4 text-6xl font-extrabold left-4 '>
        <h1 className='flex items-center gap-2'>{props.level} <Star weight="fill" color='yellow' /></h1>
      </div>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 items-center justify-center' >
        <img src={props.eggImg} alt="" className='w-36 absolute bottom-28 left-14' />
        <span className='text-white block text-sm  z-10'>Ginásio:</span>
        <p className='text-white font-bold truncate ...'>{props.title}</p>


        <span className='text-white block text-sm'>Abre:</span>
        <strong className=' block text-sm text-blue-500'>{props.start}</strong>

      </div>
    </div>
  )
}
