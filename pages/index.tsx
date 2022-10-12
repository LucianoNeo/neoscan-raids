import { useEffect, useState } from 'react'

import RaidBanner from '../src/components/RaidBanner'

import Carousel from '@itseasy21/react-elastic-carousel'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { format, toDate, utcToZonedTime } from 'date-fns-tz'
import { GetStaticProps } from 'next'
import useSWR from "swr"
import CreateEggModal from '../src/components/CreateEggModal'
import EggBanner from '../src/components/EggBanner'
import Loader from '../src/components/Loader'
import CreateRaidModal from '../src/components/CreateRaidModal'
import MatchBanner from '../src/components/MatchBanner'
import EnterRaidModal from '../src/components/EnterRaidModal'




export const getStaticProps: GetStaticProps = async () => {
  const eggsData = await axios(process.env.API_EGGS)
  const eggsResponse = await eggsData.data
  const eggsSSR = eggsResponse.response.eggs

  const raidsData = await axios(process.env.API_RAIDS)
  const raidsResponse = await raidsData.data
  const raidsSSR = raidsResponse.response.raids


  return {
    props: { eggsSSR, raidsSSR },
    revalidate: 60,
  }

}




export default function App({ eggsSSR, raidsSSR }) {

  async function getRaids(url) {
    const raidsData = await axios(url);
    const raidsResponse = await raidsData.data
    const raidsSWR = raidsResponse.response.raids
    return raidsSWR
  }

  async function getEggs(url) {
    const raidsData = await axios(url);
    const raidsResponse = await raidsData.data
    const raidsSWR = raidsResponse.response.eggs
    return raidsSWR
  }



  const raidsData = useSWR(process.env.API_RAIDS, getRaids,
    {
      refreshInterval: 180000,
      revalidateIfStale: true,
      refreshWhenOffline: true,
      fallbackData: raidsSSR
    }
  ).data

  const eggsData = useSWR(process.env.API_EGGS, getEggs,
    {
      refreshInterval: 180000,
      revalidateIfStale: true,
      refreshWhenOffline: true,
      fallbackData: eggsSSR
    }
  ).data




  interface Raids {
    id: string,
    pokemonName: string,
    pokemonId: number,
    pokemonImg: string,
    ginásio: string,
    level: number,
    inicio: string,
    fim: string,
    equipe: number,
    lat: string,
    lon: string,
    _count: {
      ads: number
    }
  }

  interface Eggs {
    id: string,
    pokemonId: number,
    eggImg: string,
    ginásio: string,
    level: number,
    inicio: string,
    fim: string,
    equipe: number,
    lat: string,
    lon: string,
    _count: {
      ads: number
    }
  }

  interface Matches {
    gymId: string
    id: string
    playType: string
    pokemonName: string
    pokemonImg: string
    gym: string
    hourStart: string
    hourEnd: string
    lat: string
    lon: string
    raidLevel: number
    gymTeam: number
    pokemonId: number,
    players: [
      {
        username: string,
        playerLevel: number
        team: string
        playType: string
      }
    ]
  }


  const breakpoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1400, itemsToShow: 5 },
    { width: 1800, itemsToShow: 7 },
  ]



  const [raids, setRaids] = useState<Raids[]>([])
  const [eggs, setEggs] = useState<Eggs[]>([])
  const [matches, setMatches] = useState<Matches[]>([])
  const [search, setSearch] = useState('')
  const [eggSearch, setEggSearch] = useState('')
  const [filter, setFilter] = useState('pokemon')
  const [raidsLevel, setRaidsLevel] = useState(new Set([5, 6]))
  const [eggsLevel, setEggsLevel] = useState(new Set([5, 6]))

  let filtered
  let eggsFiltered
  let level1Names = []
  let level3Names = []
  let level5Names = []
  let level6Names = []



  function handleRaidLevel(value: number) {
    if (raidsLevel.has(value)) {
      setRaidsLevel((prev) => {
        const next = new Set(prev);
        next.delete(value);
        return next;
      })

    } else {
      setRaidsLevel((prev) => new Set(prev).add(value));
    }
  }

  function handleEggLevel(value: number) {
    if (eggsLevel.has(value)) {
      setEggsLevel((prev) => {
        const next = new Set(prev);
        next.delete(value);
        return next;
      })

    } else {
      setEggsLevel((prev) => new Set(prev).add(value));
    }
  }



  useEffect(() => {
    setEggs(eggsData)
    setRaids(raidsData)

    axios('/api/matches')
      .then(response => {
        setMatches(response.data)
      })

  }, [raidsData, eggsData])



  if (eggs) {
    eggsFiltered = eggs.filter((e) => eggsLevel.has(e.level))
  }
  if (eggSearch) {
    eggsFiltered = eggsFiltered?.filter((filtered) => filtered.ginásio.toLowerCase().includes(eggSearch))
  }

  if (raids) {

    filtered = raids.filter((e) => raidsLevel.has(e.level))
    level1Names = raids.filter(raid => raid.level == 1)
    level3Names = raids.filter(raid => raid.level == 3)
    level5Names = raids.filter(raid => raid.level == 5)
    level6Names = raids.filter(raid => raid.level == 6)


  }
  if (filter == 'pokemon') {
    filtered = filtered?.filter((filtered) => filtered.pokemonName.toLowerCase().includes(search))
  } if (filter == 'gym') {
    filtered = filtered?.filter((filtered) => filtered.ginásio.toLowerCase().includes(search))
  }


  return (
    <div className='w-[160vw] md:w-[98vw] mx-auto flex items-center flex-col'>

      <img src='/assets/img/logo.png' alt="" width={300} />

      <div className='flex flex-col gap-6 items-center justify-center w-full'>
        <div className='flex bg-slate-800 items-center gap-4 p-4 justify-between w-full'>
          <h1 className='text-white font-bold'>PARTIDAS AGENDADAS:</h1>

        </div>
        {matches ?
          <Carousel breakPoints={breakpoints} isRTL={false} className='px-5'>
            {matches?.map(match => {
              const dateInicio = toDate(match.hourStart)
              const brasilDateInicio = utcToZonedTime(dateInicio, 'America/Sao_Paulo')
              const inicio = format(brasilDateInicio, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              const dateFim = toDate(match.hourEnd)
              const brasilDateFim = utcToZonedTime(dateFim, 'America/Sao_Paulo')
              const fim = format(brasilDateFim, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              return (


                <Dialog.Root key={match.id}>
                  <Dialog.Trigger
                    className='items-start justify-start text-left'
                  >

                    <MatchBanner
                      pokemonId={match.pokemonId}
                      name={match.pokemonName}
                      raidLevel={match.raidLevel}
                      bannerUrl={match.gymTeam == 1 ? './assets/img/mystic.png' : match.gymTeam == 2 ? './assets/img/valor.png' : './assets/img/instinct.png'}
                      title={match.gym}
                      playersCount={match.players.length}
                      start={match.hourStart}
                      end={match.hourEnd}
                      pokemonImg={match.pokemonImg}
                      lat={match.lat}
                      lon={match.lon}
                      players={match.players}
                    />

                  </Dialog.Trigger>
                  <EnterRaidModal
                    level={match.raidLevel}
                    min={match.hourStart}
                    max={match.hourEnd}
                    img={match.pokemonImg}
                    gym={match.gym}
                    lat={match.lat}
                    lon={match.lon}
                    pokemonName={match.pokemonName}
                    gymId={match.id}
                    gymTeam={match.gymTeam}
                  />
                </Dialog.Root>

              )
            })

            }
          </Carousel>
          : <Loader />}
      </div>

      <div className='flex flex-col gap-6 items-center justify-center w-full mt-6'>
        <div className='flex bg-slate-800 items-center gap-4 p-4 justify-between w-full'>
          <h1 className='text-white font-bold'>OVOS A ECLODIR:</h1>
          <div className='flex'>
            <input type="text" placeholder='Digite o nome do ginásio para pesquisar'
              value={eggSearch} onChange={e => setEggSearch(e.target.value.toLowerCase())}
              className='bg-slate-900 p-2 rounded text-white md:w-80' />
          </div>
          <div className='flex gap-3 items-center'>

            <h1 className='text-white'>FILTROS:</h1>
            <div className='text-white text-xs grid  grid-cols-2 gap-1 flex-wrap'>
              <div className='gap-2 flex'>
                <label htmlFor="level1">Level 1</label>
                <input type="checkbox" name="level1" id="1" checked={eggsLevel.has(1)}
                  onChange={() => handleEggLevel(1)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level3">Level 3</label>
                <input type="checkbox" name="level3" id="3" checked={eggsLevel.has(3)}
                  onChange={() => handleEggLevel(3)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level5">Level 5</label>
                <input type="checkbox" name="level3" id="3" checked={eggsLevel.has(5)}
                  onChange={() => handleEggLevel(5)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level6">Mega Raids</label>
                <input type="checkbox" name="level6" id="6" checked={eggsLevel.has(6)}
                  onChange={() => handleEggLevel(6)} />
              </div>



            </div>
          </div>
        </div>
        {eggsFiltered ?
          <Carousel breakPoints={breakpoints} isRTL={false} className='px-5'>
            {eggsFiltered?.map(egg => {
              const dateInicio = toDate(egg.inicio)
              const brasilDateInicio = utcToZonedTime(dateInicio, 'America/Sao_Paulo')
              const inicio = format(brasilDateInicio, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              const dateFim = toDate(egg.fim)
              const brasilDateFim = utcToZonedTime(dateFim, 'America/Sao_Paulo')
              const fim = format(brasilDateFim, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              return (


                <Dialog.Root key={egg.id}>
                  <Dialog.Trigger
                    className='items-start justify-start text-left'
                  >
                    <EggBanner
                      pokemonId={egg.pokemonId}
                      level={egg.level}
                      bannerUrl={egg.equipe == 1 ? './assets/img/mystic.png' : egg.equipe == 2 ? './assets/img/valor.png' : './assets/img/instinct.png'}
                      title={egg.ginásio}
                      adsCount={0}
                      start={inicio}
                      end={fim}
                      eggImg={egg.eggImg}
                      lat={egg.lat}
                      lon={egg.lon}
                    />

                  </Dialog.Trigger>
                  <CreateEggModal
                    level={egg.level}
                    min={inicio}
                    max={fim}
                    img={egg.eggImg}
                    gym={egg.ginásio}
                    gymTeam={egg.equipe}
                    gymId={egg.id}
                    lat={egg.lat}
                    lon={egg.lon}
                    pokemonNames={
                      egg.level == 1 ? level1Names :
                        egg.level == 3 ? level3Names :
                          egg.level == 5 ? level5Names :
                            level6Names}
                  />
                </Dialog.Root>

              )
            })

            }
          </Carousel>
          : <Loader />}
      </div>




      <div className='flex flex-col gap-6 place-items-start mt-10 w-full mb-20'>
        <div className='flex bg-slate-800 w-full items-center gap-4 p-4 justify-between'>
          <h1 className='text-white font-bold'>RAIDS EM ANDAMENTO</h1>
          <div className='flex flex-col md:flex-row gap-3'>
            <input type="text" placeholder='Digite para pesquisar'
              value={search} onChange={e => setSearch(e.target.value.toLowerCase())}
              className='bg-slate-900 p-2 rounded text-white' />

            <select value={filter} onChange={(field) => setFilter(field.target.value)} name="search" id="search" className='bg-slate-900 p-2 rounded text-white'>
              <option value="pokemon">Pokémon</option>
              <option value="gym">Ginásio</option>
            </select>
            {/* <button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3' >BUSCAR</button> */}
          </div>
          <div className='flex gap-3 items-center'>

            <h1 className='text-white'>FILTROS:</h1>
            <div className='text-white text-xs grid  grid-cols-2 gap-1 flex-wrap'>
              <div className='gap-2 flex'>
                <label htmlFor="level1">Level 1</label>
                <input type="checkbox" name="level1" id="1" checked={raidsLevel.has(1)}
                  onChange={() => handleRaidLevel(1)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level3">Level 3</label>
                <input type="checkbox" name="level3" id="3" checked={raidsLevel.has(3)}
                  onChange={() => handleRaidLevel(3)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level5">Level 5</label>
                <input type="checkbox" name="level3" id="3" checked={raidsLevel.has(5)}
                  onChange={() => handleRaidLevel(5)} />
              </div>
              <div className='gap-2 flex'>
                <label htmlFor="level6">Mega Raids</label>
                <input type="checkbox" name="level6" id="6" checked={raidsLevel.has(6)}
                  onChange={() => handleRaidLevel(6)} />
              </div>



            </div>
          </div>
        </div>
        {filtered ?

          <Carousel breakPoints={breakpoints} isRTL={false}>
            {filtered.map(raid => {
              const dateInicio = toDate(raid.inicio)
              const brasilDateInicio = utcToZonedTime(dateInicio, 'America/Sao_Paulo')
              const inicio = format(brasilDateInicio, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              const dateFim = toDate(raid.fim)
              const brasilDateFim = utcToZonedTime(dateFim, 'America/Sao_Paulo')
              const fim = format(brasilDateFim, 'HH:mm', { timeZone: 'America/Sao_Paulo' })
              return (

                raid.pokemonId &&
                <Dialog.Root key={raid.id}>
                  <Dialog.Trigger
                    className='items-start justify-start text-left'
                  >
                    <RaidBanner
                      name={raid.pokemonName}
                      pokemonId={raid.pokemonId}
                      level={raid.level}
                      bannerUrl={raid.equipe == 1 ? './assets/img/mystic.png' : raid.equipe == 2 ? './assets/img/valor.png' : './assets/img/instinct.png'}
                      title={raid.ginásio}
                      adsCount={0}
                      start={inicio}
                      end={fim}
                      pokemonImg={raid.pokemonImg}
                      lat={raid.lat}
                      lon={raid.lon}
                    />
                  </Dialog.Trigger>

                  <CreateRaidModal
                    level={raid.level}
                    min={raid.min}
                    max={raid.max}
                    img={raid.pokemonImg}
                    gym={raid.ginásio}
                    lat={raid.lat}
                    lon={raid.lon}
                    pokemonName={raid.pokemonName}
                    gymId={raid.id}
                    gymTeam={raid.equipe}
                  />
                </Dialog.Root>

              )
            })

            }
          </Carousel>
          : <Loader />
        }
      </div>

    </div>
  )
}

