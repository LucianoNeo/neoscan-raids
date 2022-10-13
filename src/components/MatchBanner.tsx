import axios from 'axios'
import { Star } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { format, toDate, utcToZonedTime } from 'date-fns-tz'

interface MatchBannerProps {
  name: string,
  pokemonId: number,
  bannerUrl: string,
  pokemonImg: string,
  title: string,
  playersCount: number
  start: string,
  end: string,
  lat: string,
  lon: string,
  raidLevel: number
  players: [{
    username: string,
    playerLevel: number
    team: string
    playType: string
  }]
}

export default function MatchBanner(props: MatchBannerProps) {

  const [name, setName] = useState('')
  const dateInicio = toDate(props.start)
  const brasilDateInicio = utcToZonedTime(dateInicio, 'America/Sao_Paulo')
  const inicio = format(brasilDateInicio, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
  const dateFim = toDate(props.end)
  const brasilDateFim = utcToZonedTime(dateFim, 'America/Sao_Paulo')
  const fim = format(brasilDateFim, 'HH:mm', { timeZone: 'America/Sao_Paulo' })


  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId}`).then(response => setName(response.data.name))
  }, [])

  return (
    <div className='relative rounded-lg overflow-hidden w-[500px] md:w-64'>

      <img src={props.bannerUrl} className=' opacity-50 w-full' />

      <div className='justify-between md:w-60 absolute z-10 text-white top-4 text-7xl md:text-3xl font-extrabold left-4 '>
        {props.raidLevel == 6 && <h1>MEGA</h1>}
        <h1 className='drop-shadow-lg truncate'>{props.name.toUpperCase()}</h1>
        <h1 className='flex items-center gap-2'>{props.raidLevel} <Star weight="fill" color='yellow' /></h1>
      </div>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 items-center justify-center' >

        <span className='text-white block text-4xl md:text-sm  z-10'>Ginásio:</span>

        <p className='text-white font-bold truncate text-4xl md:text-sm'>{props.title}</p>
        <img src={props.pokemonImg} alt="" className='w-[600px] md:w-36 absolute md:bottom-28 md:left-14 bottom-64 left-1' />

        <span className='text-white block text-4xl md:text-sm'>Marcada para:</span>
        <strong className=' block text-4xl md:text-sm text-blue-500'>{inicio}</strong>
        <span className='text-white block text-4xl md:text-sm'>{props.playersCount} Jogador (es):</span>
        <div className='flex gap-2 mt-2 overflow-auto  pr-4'>
          {props.players.map((player, index) =>
          (

            <div key={index} className='bg-slate-800 md:rounded rounded-2xl py-1 px-5 md:px-2 md:h-8 h-20 flex items-center justify-center gap-2 mb-1 min-w-fit'>
              <img src={player.team == "valor" ? './assets/img/icon-valor.png' : player.team == "instinct" ? './assets/img/icon-instinct.png' : './assets/img/icon-mystic.png'} alt="" className='w-12 md:w-4' />
              <span className='text-white font-bold text-4xl md:text-sm'>{player.playType}</span>
              <span className='text-white text-4xl md:text-sm font-extrabold'>{player.username.toUpperCase()}</span>
              <span className='text-4xl md:text-sm font-bold text-white'>L{player.playerLevel}</span>
            </div>

          )
          )}
        </div>


      </div>
    </div>
  )
}
