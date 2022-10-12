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
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25 z-20'
            >

                <Dialog.Title className='text-3xl font-black'>Participar desta Raid</Dialog.Title>
                <form className='flex flex-col gap-4' onSubmit={handleCreateAd}>
                    <div className={`absolute bg-slate-50 w-36 h-8 rounded-xl opacity-90 right-10 top-[260px] ${baloon ? 'flex' : 'hidden'} flex items-center justify-center transition-all`}>
                        <span className='text-xs text-blue-600 font-semibold'>
                            Copiado com sucesso!
                        </span>
                    </div>
                    <div className=' my-4 flex items-center justify-start gap-2'>
                        <div className='flex flex-col items-center text-center'>
                            <img src={props.img} alt="" width={150} height={150} />
                            <span className='text-xs'>Marcado para:</span>
                            <strong className='text-red-700'>{props.min}</strong>
                        </div>
                        <div className='p-2 w-[50%]'>
                            <h1 className='font-bold text-blue-500'>{props.pokemonName.toUpperCase()}</h1>
                            <span>Ginásio: </span>
                            <h1 className='font-bold'>{props.gym}</h1>
                        </div>
                        <div className='flex flex-col'>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lon}`} target='_blank' rel="noreferrer">
                                <img src={map} alt="" width={200} className='rounded-lg' />
                            </a>
                            <a href="#" className='flex items-center gap-1 mt-4 hover:text-blue-500'
                                onClick={() => {
                                    navigator.clipboard.writeText(`${props.lat},${props.lon}`)

                                    toast.success('Coordenadas copiadas!')
                                    //showBaloon()
                                }}
                            >
                                <span className='text-xs underline '>Copiar Coordenadas</span>
                                <CopySimple size={22} color="white" weight="fill" />
                            </a>


                        </div>
                    </div>



                    <div className='flex items-center w-full flex-col'>

                        <div className='w-full flex items-center justify-between'>
                            <div className='gap-2 flex flex-col'>
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
                                    className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500 w-48'
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
                                    className='bg-zinc-900 rounded py-3 px-4 text-sm placeholder:text-zinc-500'
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
                            className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Cancelar
                        </Dialog.Close>
                        <button
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
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
