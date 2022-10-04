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
    <div className='relative rounded-lg overflow-hidden w-64'>

      <img src={props.bannerUrl} className=' opacity-50' />


      <div className='justify-between w-60 absolute z-10 text-white top-4 text-3xl font-extrabold left-4 '>
        {props.level == 6 && <h1>MEGA</h1>}
        <h1 className='drop-shadow-lg'>{props.name.toUpperCase()}</h1>
        <h1 className='flex items-center gap-2'>{props.level} <Star weight="fill" color='yellow' /></h1>
      </div>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 items-center justify-center' >
        <img src={props.pokemonImg} alt="" className='w-52 left-8 bottom-36 absolute z-1' />
        <span className='text-white block text-sm  z-10'>Ginásio:</span>
        {/* <a className='flex gap-3 items-center' href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lon}`} target='_blank'>
          <MapTrifold size={32} weight="bold" color='white' /> */}
        <p className='text-white font-bold truncate ...'>{props.title}</p>







        <span className='text-white block text-sm'>Começou:</span>
        <strong className=' block text-sm text-blue-500'>{props.start}</strong>
        <span className='text-white block text-sm'>Termina:</span>
        <strong className='text-red-600 block text-sm'>{props.end}</strong>

      </div>
    </div>
  )
}
