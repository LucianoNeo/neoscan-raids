import axios from 'axios'
import { Star } from 'phosphor-react'
import { useEffect, useState } from 'react'


interface RaidBannerProps {
  name: string,
  pokemonId: number,
  bannerUrl: string,
  pokemonImg: string,
  title: string,
  adsCount: number
  start: string,
  end: string,
  lat: string,
  lon: string,
  level: number
}

export default function RaidBanner(props: RaidBannerProps) {

  const [name, setName] = useState('')

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId}`).then(response => setName(response.data.name))
  }, [])

  return (
    <div className='relative rounded-lg overflow-hidden w-[500px] md:w-64'>

      <img src={props.bannerUrl} className='opacity-50 w-full' />

      <div className='justify-between md:w-60 absolute z-10 text-white top-4 text-7xl md:text-3xl font-extrabold left-4 '>
        {props.level == 6 && <h1>MEGA</h1>}
        <h1 className='drop-shadow-lg truncate'>{props.name.toUpperCase()}</h1>
        <h1 className='flex items-center gap-2'>{props.level} <Star weight="fill" color='yellow' /></h1>
      </div>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 items-center justify-center' >
        <img src={props.pokemonImg} alt="" className='w-[600px] md:w-36 absolute md:bottom-28 md:left-14 bottom-64 left-1' />
        <div className='flex flex-col gap-2 md:gap-0'>
          <span className='text-white block text-4xl md:text-sm  z-10'>Ginásio:</span>
          <p className='text-white font-bold truncate text-4xl md:text-sm'>{props.title}</p>
          <span className='text-white block text-4xl md:text-sm'>Começou:</span>
          <strong className=' block text-4xl md:text-sm text-blue-500'>{props.start}</strong>
          <span className='text-white block text-4xl md:text-sm'>Termina:</span>
          <strong className=' block text-4xl md:text-sm text-red-700'>{props.end}</strong>
        </div>

      </div>
    </div>
  )
}
