import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { GameController, CopySimple } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { setTimeout } from 'timers'
import { toast } from 'react-toastify'

import Input from './Form/Input'

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



export default function EnterRaidModal(props: modalProps) {
    const [map, setMap] = useState<string>()
    const [baloon, setBalloon] = useState<boolean>(false)

    function showBaloon() {
        setBalloon(true)
        setTimeout(() => {
            setBalloon(false)
        }, 1000);
    }

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if (!data.username || !data.playType || !data.playerLevel || !data.team) {
            return toast.error('Você deve preencher todos os campos!')
        }

        try {


            const dataFull = {
                username: data.username,
                playType: data.playType,
                gym: props.gym,
                id: props.gymId,
                gymTeam: props.gymTeam,
                playerLevel: Number(data.playerLevel),
                team: data.team
            }

            await axios.post('/api/matches', dataFull)

            toast.success('Entrada na Raid confirmada!')
            location.reload()
        } catch (error) {
            console.log(error)
            toast.error('Erro ao criar agendamento!')
        }



    }



    useEffect(() => {
        setMap(`https://tileserver.neoscan.com.br/staticmap/pokemon?id=${props.pokemonId}&lat=${props.lat}&lon=${props.lon}`)

    }, [])

    return (

        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'
            />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[480px] shadow-black/25 z-20 overflow-hidden w-[95%] '
            >

                <Dialog.Title className='md:text-3xl text-5xl font-black'>Participar desta Raid</Dialog.Title>
                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>

                    <div className=' my-4 flex  justify-between gap-2'>
                        <div className='flex flex-col items-center text-center justify-around'>
                            <h1 className='font-bold text-blue-500 md:text-3xl text-4xl' >{props.pokemonName.toUpperCase()}</h1>
                            <img src={props.img} alt="" className='md:w-[150px]' />
                            <span className='md:text-xs text-2xl'>Marcado para:</span>
                            <strong className='text-red-700 md:text-lg text-5xl'>{props.min}</strong>
                        </div>

                        <div className='flex flex-col items-center'>
                            <div className='flex md:flex-row flex-col gap-2 p-2 md:text-xs text-3xl'>
                                <span>Ginásio: </span>
                                <h1 className='font-bold'>{props.gym}</h1>
                            </div>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lon}`} target='_blank' rel="noreferrer">
                                <img src={map} alt="" className='rounded-lg md:w-[200px] w-[700px]' />
                            </a>
                            <a href="#" className='flex items-center mt-4 hover:text-blue-500 justify-between px-1 md:px-0 gap-3'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${props.lat},${props.lon}`)
                                    toast.success('Coordenadas copiadas!')
                                }}
                            >
                                <span className='md:text-xs text-2xl underline'>Copiar Coordenadas</span>
                                <CopySimple size={30} color="white" weight="fill" />
                            </a>


                        </div>
                    </div>



                    <div className='flex items-center w-full flex-col md:text-xs text-2xl gap-5 md:gap-1'>

                        <div className='w-full flex items-center justify-between '>
                            <div className='gap-2 flex flex-col '>
                                <h1>Qual é seu usuário?</h1>
                                <Input type="text" name="username" id="username" placeholder='no Pokémon GO'
                                />
                            </div>

                            <div className=' flex flex-col gap-2'>
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
                            <div className=' flex flex-col gap-2 mt-1'>
                                <label htmlFor='playType'>Como vai participar?</label>
                                <select defaultValue='Seu estilo de jogo'
                                    className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-48 w-[65vw]'
                                    id='playType' name='playType'>
                                    <option disabled >
                                        Seu estilo de jogo
                                    </option>
                                    <option>🚶‍♂️</option>
                                    <option>✈</option>
                                </select>

                            </div>

                            <div className=' flex flex-col gap-2 mt-1'>
                                <label htmlFor='team'>Qual a sua equipe?</label>
                                <select defaultValue='Selecione sua equipe'
                                    className='bg-zinc-900 rounded md:py-2.5 py-4 px-4 md:text-sm text-2xl placeholder:text-zinc-500 md:w-48 w-[65vw]'
                                    id='team' name='team'>
                                    <option disabled >
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

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            className='bg-zinc-500 md:px-5 px-10 md:h-12 h-20 rounded-md font-semibold hover:bg-zinc-600 md:text-sm text-3xl'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 md:px-5 px-4 md:h-12 h-20 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 md:text-sm text-3xl'
                            type='submit'>
                            <GameController size={24} />
                            Participar
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>

    )
}
