import * as  Dialog from '@radix-ui/react-dialog'
import * as  Ckeckbox from '@radix-ui/react-checkbox'
import * as  ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import Input from './Form/Input'
import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import { format, toDate, utcToZonedTime } from 'date-fns-tz'
import { toast } from 'react-toastify'


interface modalProps {
    min: string
    max: string
    level: number,
    img: string,
    gym: string,
    lat: string,
    lon: string,
    pokemonName: string,
    pokemonId: number,
    gymId: string,
    gymTeam: number
}




export default function CreateRaidModal(props: modalProps) {


    interface Game {
        id: string,
        title: string,
    }



    const [games, setGames] = useState<Game[]>([])
    const brasilDateInicio = utcToZonedTime(props.min, 'America/Sao_Paulo')
    const inicio = format(brasilDateInicio, 'dd/MM/yyyy HH:mm', { timeZone: 'America/Sao_Paulo' })

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData)





        if (!data.username || !data.playType || !data.playerLevel || !data.team ||
            !data.hourStart) {
            return toast.error('Você deve preencher todos os campos!')
        }

        try {


            const dataFull = {
                username: data.username,
                playType: data.playType,
                hourStart: new Date(Date.prototype.setHours.apply(new Date(), data.hourStart.toString().split(':'))),
                hourEnd: new Date(Date.prototype.setHours.apply(new Date(), props.max.toString().split(':'))),
                raidLevel: props.level,
                pokemonImg: props.img,
                pokemonId: props.pokemonId,
                pokemonName: props.pokemonName,
                gym: props.gym,
                id: props.gymId,
                raidId: props.gymId,
                gymTeam: props.gymTeam,
                playerLevel: Number(data.playerLevel),
                lat: `${props.lat}`,
                lon: `${props.lon}`,
                team: data.team
            }

            await axios.post('/api/matches', dataFull)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            location.reload()
            toast.success('Raids agendada com sucesso!')

        } catch (error) {
            console.log(error)
            toast.error('Erro ao criar agendamento!')
        }



    }



    useEffect(() => {

    }, [])



    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'
            />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[480px] shadow-black/25 z-20 overflow-hidden w-[95%] '
            >
                <Dialog.Title className='md:text-3xl text-5xl font-black'>Agende uma Raid</Dialog.Title>
                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>
                    <div className='flex-1 my-4 flex items-center justify-between gap-2 md:text-lg text-3xl'>
                        <img src={props.img} alt="" className='md:w-[150px] w-56' />
                        <div>
                            <h1 className='font-bold text-blue-500'>{props.pokemonName.toUpperCase()}</h1>
                            <span>Ginásio: </span>
                            <h1 className='font-bold'>{props.gym}</h1>
                        </div>

                    </div>



                    <div className='flex items-center w-full flex-col  md:text-base text-2xl md:gap-0 gap-8'>

                        <div className='w-full flex items-center justify-between '>
                            <div className=' flex flex-col md:gap-2 gap-6'>
                                <h1>Qual é seu usuário?</h1>
                                <Input type="text" name="username" id="username" placeholder='no Pokémon GO'
                                />
                            </div>

                            <div className=' flex flex-col md:gap-2 gap-6'>
                                <label htmlFor='playerLevel'>Qual o seu nível?</label>
                                <Input
                                    name='playerLevel'
                                    id='playerLevel'
                                    type='number'
                                    placeholder='Digite seu nível'
                                    min={5}
                                    max={50}
                                />
                            </div>

                        </div>

                        <div className='w-full flex items-center justify-between'>
                            <div className=' flex flex-col md:gap-2 gap-6 mt-1'>
                                <label htmlFor='playType'>Como vai participar?</label>
                                <select
                                    className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-48 w-[65vw]'
                                    id='playType' name='playType'>
                                    <option disabled selected value=''>
                                        Seu estilo de jogo
                                    </option>
                                    <option>🚶‍♂️</option>
                                    <option>✈</option>
                                </select>

                            </div>

                            <div className=' flex flex-col md:gap-2 gap-6 mt-1'>
                                <label htmlFor='team'>Qual a sua equipe?</label>
                                <select
                                    className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-48 w-[65vw]'
                                    id='team' name='team'>
                                    <option disabled selected value=''>
                                        Selecione sua equipe
                                    </option>
                                    <option value='valor'>
                                        Valor
                                    </option>
                                    <option value='instinct'>
                                        Instinct
                                    </option>
                                    <option value='mystic'>
                                        Mystic
                                    </option>
                                </select>

                            </div>

                        </div>


                    </div>

                    <div className='flex w-full justify-between md:text-base text-2xl'>
                        <div className='flex flex-col md:gap-0 gap-4'>
                            <span className='text-white block'>Começou:</span>
                            <strong className=' block md:text-lg text-5xl text-blue-500'>{props.min}</strong>
                            <span className='text-white block'> Termina:</span>
                            <strong className='text-red-600 block md:text-lg text-5xl'>{props.max}</strong>
                        </div>
                        <div className='flex flex-col gap-2 items-end '>
                            <label htmlFor="hourStart">Qual horário de início?</label>

                            <input type="time" name="hourStart" id="hourStart" min={props.min} max={props.max} className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-28 w-40' />


                        </div>

                    </div>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            className='bg-zinc-500 md:px-5 px-10 md:h-12 h-20 rounded-md font-semibold hover:bg-zinc-600 md:text-sm text-3xl'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 md:px-5 px-4 md:h-12 h-20 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 md:text-sm text-3xl'
                            type='submit'>
                            <GameController size={24} />
                            Marcar Raid
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}
