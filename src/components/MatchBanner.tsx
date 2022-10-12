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
    <div className='relative rounded-lg overflow-hidden w-64'>

      <img src={props.bannerUrl} className=' opacity-50' />


      <div className='justify-between w-60 absolute z-10 text-white top-4 text-3xl font-extrabold left-4 '>
        {props.raidLevel == 6 && <h1>MEGA</h1>}
        <h1 className='drop-shadow-lg truncate'>{props.name.toUpperCase()}</h1>
        <h1 className='flex items-center gap-2'>{props.raidLevel} <Star weight="fill" color='yellow' /></h1>
      </div>

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 items-center justify-center' >

        <span className='text-white block text-sm  z-10'>Ginásio:</span>
        {/* <a className='flex gap-3 items-center' href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lon}`} target='_blank'>
          <MapTrifold size={32} weight="bold" color='white' /> */}
        <p className='text-white font-bold truncate ... z-auto'>{props.title}</p>
        <img src={props.pokemonImg} alt="" className='w-52 left-8 bottom-36 absolute' />

        <span className='text-white block text-sm'>Marcada para:</span>
        <strong className=' block text-sm text-blue-500'>{inicio}</strong>
        <span className='text-white block text-sm '>{props.playersCount} Jogador (es):</span>
        <div className='flex gap-2 mt-2 overflow-auto  pr-4'>
          {props.players.map((player, index) =>
          (

            <div key={index} className='bg-slate-800 rounded py-1 px-2 h-8 min-w-fit flex items-center justify-center gap-2 mb-1'>
              <img src={player.team == "valor" ? './assets/img/icon-valor.png' : player.team == "instinct" ? './assets/img/icon-instinct.png' : './assets/img/icon-mystic.png'} alt="" width={20} />
              <span className='text-white font-bold'>{player.playType}</span>
              <span className='text-white text-xs font-extrabold'>{player.username.toUpperCase()}</span>
              <span className='text-xs font-bold text-white'>L{player.playerLevel}</span>
            </div>

          )
          )}
        </div>


      </div>
    </div>
  )
}
